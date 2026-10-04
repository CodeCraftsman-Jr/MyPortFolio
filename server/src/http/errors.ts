import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

/** An error the API means to show: status, a stable code and a readable message. */
export class ApiError extends Error {
  constructor(public status: ContentfulStatusCode, public code: string, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const notFound = (what: string) => new ApiError(404, "NOT_FOUND", `${what} not found`);
export const badRequest = (message: string) => new ApiError(400, "BAD_REQUEST", message);

type ZodLike = { name: string; issues: Array<{ path: (string | number)[]; message: string }> };
type PgLike = { code?: string };

/** Turns any thrown error into a JSON body with the right status. Unknown errors never leak details. */
export const sendError = (err: unknown, c: Context) => {
  if (err instanceof ApiError) return c.json({ error: err.code, message: err.message }, err.status);

  if (err && typeof err === "object" && (err as ZodLike).name === "ZodError") {
    const issues = (err as ZodLike).issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }));
    const first = issues[0];
    return c.json({ error: "INVALID", message: first ? `${first.path || "value"}: ${first.message}` : "Invalid input", issues }, 400);
  }

  const code = (err as PgLike)?.code;
  if (code === "23505") return c.json({ error: "DUPLICATE", message: "Something with that id already exists" }, 409);
  if (code === "23514" || code === "22P02") return c.json({ error: "INVALID", message: "A value is outside what is allowed" }, 400);
  if (code === "42501") return c.json({ error: "FORBIDDEN", message: "You do not have access to do that" }, 403);

  console.error("[portfolio-api] unexpected error", err instanceof Error ? err.message : err);
  return c.json({ error: "SERVER_ERROR", message: "Something went wrong. Please try again." }, 500);
};
