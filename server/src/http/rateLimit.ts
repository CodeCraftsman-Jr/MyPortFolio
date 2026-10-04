import type { MiddlewareHandler } from "hono";
import { ApiError } from "./errors.js";

/** The visitor's address as the edge proxy reports it. */
export const clientAddress = (headers: Headers) =>
  headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "local";

/** Fixed-window limit per address, kept in memory (one API instance). */
export const limitRequests = (name: string, max: number, windowMs: number): MiddlewareHandler => {
  const hits = new Map<string, { start: number; count: number }>();
  return async (c, next) => {
    const key = `${name}:${clientAddress(c.req.raw.headers)}`;
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || now - entry.start > windowMs) hits.set(key, { start: now, count: 1 });
    else if (++entry.count > max) throw new ApiError(429, "TOO_MANY", "Too many requests. Wait a minute and try again.");
    if (hits.size > 5000) hits.delete(hits.keys().next().value as string);
    await next();
  };
};
