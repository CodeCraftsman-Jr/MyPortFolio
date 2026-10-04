import { Hono } from "hono";
import type { Portfolio } from "../portfolio.js";
import { getPublicContent } from "../store/content.js";
import { limitRequests } from "../http/rateLimit.js";

/** What every visitor of the site reads: published content, cached briefly at the edge. */
export const publicRoutes = (portfolio: Portfolio) => {
  const route = new Hono();
  route.use("*", limitRequests("public", 240, 60_000));

  route.get("/content", async (c) => {
    const content = await portfolio.database.withTenant(portfolio.visitor, getPublicContent);
    if (!content) return c.json({ error: "NOT_READY", message: "Content has not been published yet" }, 404);
    c.header("Cache-Control", "public, max-age=30, stale-while-revalidate=300");
    return c.json(content);
  });

  return route;
};
