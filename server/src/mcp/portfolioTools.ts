import { Hono } from "hono";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { KIND_INFO, KIND_NAMES, SITE_GROUPS, type Field, type Kind } from "@shared/portfolio";
import type { Portfolio } from "../portfolio.js";
import { clientAddress, limitRequests } from "../http/rateLimit.js";

/**
 * Remote MCP endpoint for AI agents (Streamable HTTP, stateless). Three tools
 * keep an agent's context small. Every tool calls the admin API in-process with
 * the caller's own key, so validation, RLS and role checks are the admin's own.
 */
type CallApi = (path: string, init?: RequestInit) => Promise<Response>;

const TYPES = ["site", "media", "products", "expertise", "projects", "journey", "stack", "process", "needs", "socials"] as const;
type ToolType = (typeof TYPES)[number];
const isKind = (t: ToolType): t is Kind => (KIND_NAMES as string[]).includes(t);
// Keep the tool's list in step with the shared contract.
if (KIND_NAMES.some((kind) => !(TYPES as readonly string[]).includes(kind))) throw new Error("MCP TYPES is missing a content kind");

/** One line per field so an agent can write valid data without guessing. */
const describe = (fields: Field[]): string =>
  fields
    .map((field) => {
      const kind = field.type === "words" || field.type === "products" ? "string[]"
        : field.type === "toggle" ? "boolean"
        : field.type === "number" ? "number"
        : field.type === "choice" ? (field.options ?? []).join("|")
        : field.type === "rows" ? `[{ ${(field.columns ?? []).map((col) => col.key).join(", ")} }]`
        : "string";
      return `${field.key}: ${kind} - ${field.label}${field.hint ? ` (${field.hint})` : ""}`;
    })
    .join("\n");

const text = (value: unknown) => ({ content: [{ type: "text" as const, text: typeof value === "string" ? value : JSON.stringify(value) }] });
const fail = (message: string) => ({ ...text(message), isError: true });

export const makePortfolioMcp = (portfolio: Portfolio, callApi: CallApi) => {
  const buildServer = (authorization: string, clientIp: string) => {
    const api = async (path: string, init: RequestInit = {}) => {
      const headers: Record<string, string> = { authorization, "x-forwarded-for": clientIp };
      if (typeof init.body === "string") headers["content-type"] = "application/json";
      const res = await callApi(path, { ...init, headers });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message ?? `HTTP ${res.status}`);
      return body;
    };
    const run = async (work: () => Promise<unknown>) => {
      try {
        return text(await work());
      } catch (err) {
        return fail(err instanceof Error ? err.message : "Request failed");
      }
    };

    const server = new McpServer({ name: "portfolio", version: "1.0.0" });
    const type = z.enum(TYPES).describe("What to work on: a content list, the site record (profile, hero, section headings) or media");

    server.registerTool("portfolio_read", {
      description:
        "Read vasanthan.tech portfolio content. A list returns {total, rows:[{id, title, published}]}; give id for one full item. fields=true lists what portfolio_write accepts. type=site returns the whole site record.",
      inputSchema: {
        type,
        id: z.number().int().positive().optional(),
        fields: z.boolean().optional(),
        q: z.string().max(100).optional().describe("Case-insensitive text search in lists"),
      },
      annotations: { readOnlyHint: true },
    }, ({ type: t, id, fields, q }) => run(async () => {
      if (fields) {
        if (t === "site") return `${SITE_GROUPS.map((g) => `# ${g.label}\n${describe(g.fields)}`).join("\n\n")}\n\nportfolio_write type=site merges data into the current record; nested keys like sections.products.title are written as nested objects.`;
        if (t === "media") return "Upload images in the admin Media page; each gives a public link to paste into image or portraitUrl fields.";
        return `${describe(KIND_INFO[t].fields)}\n\nCreate: no id + data. Update: id + changed fields. Hide without deleting: published=false. Reorder: order=[ids].`;
      }
      if (t === "site") return (await api("/api/admin/site")).site;
      if (t === "media") return api("/api/admin/media");
      if (id) return api(`/api/admin/items/${t}/${id}`);
      let rows = (await api(`/api/admin/items/${t}`)) as Array<{ id: number; published: boolean; data: Record<string, unknown> }>;
      if (q) {
        const needle = q.toLowerCase();
        rows = rows.filter((row) => JSON.stringify(row.data).toLowerCase().includes(needle));
      }
      return { total: rows.length, rows: rows.map((row) => ({ id: row.id, title: KIND_INFO[t].title(row.data), published: row.published })) };
    }));

    server.registerTool("portfolio_write", {
      description:
        "Change portfolio content; it goes live on vasanthan.tech within a minute. Create: no id + data. Update: id + only the changed fields. Delete: id + delete=true. Hide: id + published=false. Reorder: order=[ids in display order]. type=site: data is merged into the current site record. Run portfolio_read fields=true first.",
      inputSchema: {
        type,
        id: z.number().int().positive().optional(),
        data: z.record(z.unknown()).optional(),
        published: z.boolean().optional(),
        delete: z.boolean().optional(),
        order: z.array(z.number().int().positive()).max(500).optional(),
      },
      annotations: { destructiveHint: true },
    }, ({ type: t, id, data, published, delete: remove, order }) => run(async () => {
      if (t === "media") throw new Error("Upload and delete media in the admin Media page");
      if (t === "site") {
        if (remove || order) throw new Error("The site record can only be updated");
        const current = (await api("/api/admin/site")).site ?? {};
        const incoming = data ?? {};
        const merged = { ...current, ...incoming, sections: { ...(current.sections ?? {}), ...((incoming.sections as object) ?? {}) } };
        return (await api("/api/admin/site", { method: "PUT", body: JSON.stringify(merged) })).site;
      }
      if (!isKind(t)) throw new Error(`Unknown type ${t}`);
      if (order) return api(`/api/admin/items/${t}/order`, { method: "PUT", body: JSON.stringify({ ids: order }) });
      if (remove) {
        if (!id) throw new Error("delete needs an id");
        await api(`/api/admin/items/${t}/${id}`, { method: "DELETE" });
        return `Deleted ${t} ${id}`;
      }
      if (!id) return api(`/api/admin/items/${t}`, { method: "POST", body: JSON.stringify({ data: data ?? {}, published }) });
      return api(`/api/admin/items/${t}/${id}`, { method: "PATCH", body: JSON.stringify({ data, published }) });
    }));

    server.registerTool("portfolio_preview", {
      description: "Show exactly what the public site currently serves (published content only).",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    }, () => run(async () => {
      const res = await callApi("/api/content");
      return res.ok ? res.json() : `Nothing published yet (HTTP ${res.status})`;
    }));

    return server;
  };

  const route = new Hono();
  route.use("*", limitRequests("agent", 300, 60_000));
  route.all("/", async (c) => {
    const authorization = c.req.header("authorization") ?? "";
    const staff = await portfolio.gate.whoIsCalling(authorization, "");
    if (!staff || (staff.tenant.role !== "alpha" && staff.tenant.role !== "beta")) {
      return c.json({ error: "UNAUTHORIZED", message: "Send Authorization: Bearer <agent key>" }, 401, { "WWW-Authenticate": "Bearer" });
    }
    const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    await buildServer(authorization, clientAddress(c.req.raw.headers)).connect(transport);
    return transport.handleRequest(c.req.raw);
  });
  return route;
};
