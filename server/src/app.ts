import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { bodyLimit } from "hono/body-limit";
import type { Portfolio } from "./portfolio.js";
import { ApiError, sendError } from "./http/errors.js";
import { publicRoutes } from "./routes/publicRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { makePortfolioMcp } from "./mcp/portfolioTools.js";

/** Matches an Origin against the allow list; `*` may stand for a port or subdomain part. */
export const originAllowed = (origin: string, patterns: string[]) =>
  patterns.some((pattern) => {
    if (pattern === origin) return true;
    if (!pattern.includes("*")) return false;
    const re = new RegExp(`^${pattern.split("*").map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join("[^/]*")}$`);
    return re.test(origin);
  });

const tooLarge = (message: string) => () => {
  throw new ApiError(413, "TOO_LARGE", message);
};

export const makeApp = (portfolio: Portfolio) => {
  const app = new Hono();
  const allowed = portfolio.settings.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean);

  app.use("*", secureHeaders({ crossOriginResourcePolicy: "cross-origin" }));
  app.use("/api/*", cors({
    origin: (origin) => (origin && originAllowed(origin, allowed) ? origin : null),
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    maxAge: 600,
  }));
  app.use("/api/admin/media", bodyLimit({ maxSize: 170 * 1024 * 1024, onError: tooLarge("Upload is too large") }));
  app.use("/api/*", async (c, next) => {
    if (c.req.path.startsWith("/api/admin/media")) return next();
    return bodyLimit({ maxSize: 512 * 1024, onError: tooLarge("Request is too large") })(c, next);
  });

  app.get("/health", async (c) => {
    const dbOk = await portfolio.database.ping().catch(() => false);
    return c.json({ status: dbOk ? "healthy" : "degraded", service: "portfolio-api", database: dbOk }, dbOk ? 200 : 503);
  });

  app.route("/api/admin", adminRoutes(portfolio));
  app.route("/api", publicRoutes(portfolio));
  app.use("/mcp", bodyLimit({ maxSize: 1024 * 1024, onError: tooLarge("Request is too large") }));
  app.route("/mcp", makePortfolioMcp(portfolio, (path, init) => Promise.resolve(app.request(path, init))));
  app.notFound((c) => c.json({ error: "NOT_FOUND", message: "No such endpoint" }, 404));
  app.onError(sendError);
  return app;
};
