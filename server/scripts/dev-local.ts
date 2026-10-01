/**
 * Local preview of the API with no production access: an embedded Postgres
 * (PGlite) with the real migration and seed, and a stand-in for the Better
 * Auth service that accepts one token, "local-owner". Never deployed; the
 * production entry point is src/index.ts.
 * Usage: npm run dev:local   (then set localStorage varsys_session_token=local-owner)
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";
import { KIND_NAMES } from "@shared/portfolio";
import defaults from "../../shared/defaults.json" with { type: "json" };
import { loadSettings } from "../src/config.js";
import { makeDb } from "../src/db/client.js";
import { makeStaffGate } from "../src/auth/staffGate.js";
import { makePortfolio } from "../src/portfolio.js";
import { makeApp } from "../src/app.js";
import { addItem, saveSite } from "../src/store/content.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const DB_PORT = 55440;
const TENANT = "local-portfolio";

const pg = await PGlite.create();
await pg.exec("create role portfolio_app nologin; create role portfolio_migration nologin; create schema portfolio authorization portfolio_migration;");
await pg.exec(`set role portfolio_migration;\n${await readFile(path.join(here, "../migrations/0001_portfolio.sql"), "utf8")}\nreset role;`);
const socket = new PGLiteSocketServer({ db: pg, port: DB_PORT, host: "127.0.0.1" });
await socket.start();

const settings = loadSettings({ ...process.env, DATABASE_URL: `postgres://postgres@127.0.0.1:${DB_PORT}/postgres`, TENANT_ID: TENANT, NODE_ENV: "development" });
const database = makeDb(settings.DATABASE_URL, { max: 1, actAs: "portfolio_app" });

const fakeAuth: typeof fetch = async (_url, init) => {
  const auth = new Headers(init?.headers).get("authorization") ?? "";
  if (auth !== "Bearer local-owner") return new Response("{}", { status: 401 });
  const body = { userId: "local-owner", email: "owner@localhost", name: "Local owner", applicationGrants: [{ slug: "portfolio", role: "alpha" }] };
  return new Response(JSON.stringify(body), { headers: { "content-type": "application/json" } });
};
const gate = makeStaffGate({ authUrl: "http://fake-auth", tenantId: TENANT, appSlug: "portfolio", fetchImpl: fakeAuth, findAgentKey: database.findAgentKey });

await database.withTenant({ tenantId: TENANT, role: "alpha", userId: null }, async (sql) => {
  await saveSite(sql, defaults.site, null);
  for (const kind of KIND_NAMES) for (const data of (defaults as unknown as Record<string, unknown[]>)[kind]) await addItem(sql, kind, { data }, null);
});

const app = makeApp(makePortfolio({ settings, database, gate }));
serve({ fetch: app.fetch, port: settings.PORT, hostname: "127.0.0.1" }, (info) => {
  console.log(`[portfolio-api local] http://127.0.0.1:${info.port}  (token: local-owner)`);
});
