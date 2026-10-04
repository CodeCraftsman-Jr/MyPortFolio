import type { MiddlewareHandler } from "hono";
import { ApiError } from "../http/errors.js";
import type { Tenant } from "../db/client.js";
import { hashAgentKey, isAgentKey } from "./agentKey.js";

interface TenantContextBody {
  userId: string;
  applicationGrants?: Array<{ slug: string; role: string | null }>;
  email: string | null;
  name: string | null;
}

export interface StaffUser { userId: string; email: string; name: string; role: Tenant["role"] }
/** agentKeyId is set when the caller is an AI agent using an agent key rather than a person. */
export interface StaffSession { tenant: Tenant; user: StaffUser; agentKeyId?: number }

export interface GateOptions {
  authUrl: string;
  tenantId: string;
  appSlug: string;
  fetchImpl?: typeof fetch;
  cacheMs?: number;
  findAgentKey?: (keyHash: string) => Promise<{ id: number; tenantId: string; name: string } | null>;
}

const EDITORS = new Set(["alpha", "beta"]);

/**
 * Asks the shared Better Auth service who is calling, then lets them in only
 * with the portfolio app grant. The portfolio is one tenant, so access is the
 * grant alone (no team membership needed). Nothing trusts client-sent roles.
 */
export const makeStaffGate = ({ authUrl, tenantId, appSlug, fetchImpl = fetch, cacheMs = 30_000, findAgentKey }: GateOptions) => {
  const cache = new Map<string, { at: number; value: StaffSession | null }>();
  const inFlight = new Map<string, Promise<StaffSession | null>>();

  const askAuthService = async (authorization: string, cookie: string): Promise<StaffSession | null> => {
    const res = await fetchImpl(`${authUrl.replace(/\/$/, "")}/api/auth/tenant-context`, {
      headers: { ...(authorization ? { authorization } : {}), ...(cookie ? { cookie } : {}) },
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 401) return null;
    if (!res.ok) throw new ApiError(503, "AUTH_UNAVAILABLE", "Sign-in service is not responding. Try again shortly.");
    const body = (await res.json()) as TenantContextBody;
    const grant = body.applicationGrants?.find((entry) => entry.slug === appSlug);
    const role = (grant?.role && EDITORS.has(grant.role) ? grant.role : "gamma") as Tenant["role"];
    return {
      tenant: { tenantId, role, userId: body.userId },
      user: { userId: body.userId, email: body.email ?? "", name: body.name ?? "", role },
    };
  };

  /** An agent key acts as the owner (it may delete) inside its own tenant only. */
  const askAgentKeys = async (authorization: string): Promise<StaffSession | null> => {
    const key = findAgentKey ? await findAgentKey(hashAgentKey(authorization.slice("Bearer ".length).trim())) : null;
    if (!key) return null;
    const role: Tenant["role"] = key.tenantId === tenantId ? "alpha" : "gamma";
    return {
      tenant: { tenantId, role, userId: null },
      user: { userId: "", email: "", name: `Agent: ${key.name}`, role },
      agentKeyId: key.id,
    };
  };

  const whoIsCalling = async (authorization: string, cookie: string) => {
    const key = `${authorization}|${cookie}`;
    if (key === "|") return null;
    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < cacheMs) return hit.value;
    const ask = () => (isAgentKey(authorization) ? askAgentKeys(authorization) : askAuthService(authorization, cookie));
    const pending = inFlight.get(key) ?? ask().finally(() => inFlight.delete(key));
    inFlight.set(key, pending);
    const value = await pending;
    cache.set(key, { at: Date.now(), value });
    if (cache.size > 1000) cache.delete(cache.keys().next().value as string);
    return value;
  };

  const requireStaff: MiddlewareHandler<{ Variables: { staff: StaffSession } }> = async (c, next) => {
    const session = await whoIsCalling(c.req.header("authorization") ?? "", c.req.header("cookie") ?? "");
    if (!session) throw new ApiError(401, "UNAUTHORIZED", "Please sign in again.");
    if (!EDITORS.has(session.tenant.role)) {
      throw new ApiError(403, "FORBIDDEN", "This account does not have the portfolio app grant. Add it in the VarSys users admin.");
    }
    c.set("staff", session);
    await next();
  };

  const requireOwner: MiddlewareHandler<{ Variables: { staff: StaffSession } }> = async (c, next) => {
    if (c.get("staff")?.tenant.role !== "alpha") throw new ApiError(403, "FORBIDDEN", "Only the owner can delete.");
    await next();
  };

  /** Agent keys may run the admin but not manage agent keys. */
  const requireHuman: MiddlewareHandler<{ Variables: { staff: StaffSession } }> = async (c, next) => {
    if (c.get("staff")?.agentKeyId) throw new ApiError(403, "FORBIDDEN", "Agent keys cannot manage agent keys.");
    await next();
  };

  /** Drops cached agent-key sessions so a revoked key stops working at once. */
  const forgetAgentKeys = () => { for (const key of cache.keys()) if (isAgentKey(key)) cache.delete(key); };

  return { requireStaff, requireOwner, requireHuman, whoIsCalling, forgetAgentKeys };
};

export type StaffGate = ReturnType<typeof makeStaffGate>;
