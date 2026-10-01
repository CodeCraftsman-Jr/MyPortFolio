/**
 * End-to-end tests on an embedded Postgres (PGlite) running the real
 * migration, the real driver and the real RLS policies. Each transaction
 * drops to the non-superuser portfolio_app role, as in production.
 * The Better Auth service is faked: the bearer token names who is calling.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";
import { KINDS, KIND_NAMES, siteInput } from "@shared/portfolio";
import defaults from "../../shared/defaults.json";
import { loadSettings } from "../src/config.js";
import { makeDb } from "../src/db/client.js";
import { makeStaffGate } from "../src/auth/staffGate.js";
import { makeObjectStore } from "../src/storage/objectStore.js";
import { makePortfolio } from "../src/portfolio.js";
import { makeApp } from "../src/app.js";
import { addItem, saveSite } from "../src/store/content.js";

const PORT = 55433;
const TENANT = "test-portfolio";

// Who the fake auth service says each token belongs to.
const PEOPLE: Record<string, { userId: string; grant?: string }> = {
  owner: { userId: "u-owner", grant: "alpha" },
  editor: { userId: "u-editor", grant: "beta" },
  outsider: { userId: "u-outsider" },
};
const fakeAuth: typeof fetch = async (_url, init) => {
  const auth = new Headers(init?.headers).get("authorization") ?? "";
  const who = PEOPLE[auth.replace("Bearer ", "")];
  if (!who) return new Response("{}", { status: 401 });
  const body = { userId: who.userId, email: `${who.userId}@test`, name: who.userId, applicationGrants: who.grant ? [{ slug: "portfolio", role: who.grant }] : [] };
  return new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
};

let pg: PGlite;
let socket: PGLiteSocketServer;
let app: ReturnType<typeof makeApp>;
let database: ReturnType<typeof makeDb>;

const call = (route: string, who?: string, init: RequestInit & { json?: unknown } = {}) => {
  const headers = new Headers(init.headers);
  if (who) headers.set("authorization", `Bearer ${who}`);
  if (init.json !== undefined) headers.set("content-type", "application/json");
  return app.request(route, { ...init, headers, body: init.json !== undefined ? JSON.stringify(init.json) : init.body });
};

const mcp = async (key: string, name: string, args: Record<string, unknown>) => {
  const res = await app.request("/mcp", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } }),
  });
  return { status: res.status, body: (await res.json()) as { result?: { content: Array<{ text: string }>; isError?: boolean } } };
};

beforeAll(async () => {
  pg = await PGlite.create();
  await pg.exec(`
    create role portfolio_app nologin;
    create role portfolio_migration nologin;
    create schema portfolio authorization portfolio_migration;
  `);
  const migration = await readFile(path.resolve(__dirname, "../migrations/0001_portfolio.sql"), "utf8");
  await pg.exec(`set role portfolio_migration;\n${migration}\nreset role;`);

  socket = new PGLiteSocketServer({ db: pg, port: PORT, host: "127.0.0.1" });
  await socket.start();

  const settings = loadSettings({ DATABASE_URL: `postgres://postgres@127.0.0.1:${PORT}/postgres`, TENANT_ID: TENANT, NODE_ENV: "test" } as NodeJS.ProcessEnv);
  database = makeDb(settings.DATABASE_URL, { max: 1, actAs: "portfolio_app" });
  const gate = makeStaffGate({ authUrl: "http://auth.test", tenantId: TENANT, appSlug: "portfolio", fetchImpl: fakeAuth, cacheMs: 0, findAgentKey: database.findAgentKey });
  const files = makeObjectStore({ endpoint: "", accessKey: "", secretKey: "", bucket: "b", publicBase: "https://files.test" });
  app = makeApp(makePortfolio({ settings, database, gate, files }));

  await database.withTenant({ tenantId: TENANT, role: "alpha", userId: null }, async (sql) => {
    await saveSite(sql, defaults.site, null);
    for (const kind of KIND_NAMES) for (const data of (defaults as unknown as Record<string, unknown[]>)[kind]) await addItem(sql, kind, { data }, null);
  });
});

afterAll(async () => {
  await database?.close();
  await socket?.stop();
  await pg?.close();
});

describe("shared defaults", () => {
  it("match the content contract", () => {
    expect(() => siteInput.parse(defaults.site)).not.toThrow();
    for (const kind of KIND_NAMES) for (const item of (defaults as unknown as Record<string, unknown[]>)[kind]) expect(() => KINDS[kind].parse(item)).not.toThrow();
  });
});

describe("public content", () => {
  it("serves the seeded site to anonymous visitors", async () => {
    const res = await call("/api/content");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.site.name).toBe("Vasanthan E");
    expect(body.products).toHaveLength(8);
    expect(body.projects).toHaveLength(6);
  });

  it("refuses visitor writes at the database level (RLS)", async () => {
    const attempt = database.withTenant({ tenantId: TENANT, role: "public", userId: null }, (sql) =>
      sql`insert into items (kind, data) values ('socials', ${sql.json({ label: "x", url: "https://x.test" })})`);
    await expect(attempt).rejects.toMatchObject({ code: "42501" });
  });
});

describe("admin access", () => {
  it("asks anonymous callers to sign in", async () => {
    expect((await call("/api/admin/site")).status).toBe(401);
  });

  it("blocks signed-in people without the portfolio grant", async () => {
    const res = await call("/api/admin/site", "outsider");
    expect(res.status).toBe(403);
    expect((await res.json()).message).toMatch(/portfolio app grant/);
  });

  it("lets editors change content but not delete", async () => {
    const list = await (await call("/api/admin/items/socials", "editor")).json();
    const first = list[0];
    const patched = await call(`/api/admin/items/socials/${first.id}`, "editor", { method: "PATCH", json: { data: { label: "GitHub profile" } } });
    expect(patched.status).toBe(200);
    expect((await patched.json()).data).toMatchObject({ label: "GitHub profile", url: first.data.url });
    expect((await call(`/api/admin/items/socials/${first.id}`, "editor", { method: "DELETE" })).status).toBe(403);
  });

  it("explains invalid data with the field name", async () => {
    const res = await call("/api/admin/items/socials", "owner", { method: "POST", json: { data: { label: "Bad", url: "not a link" } } });
    expect(res.status).toBe(400);
    expect((await res.json()).message).toMatch(/^url: /);
  });

  it("rejects a duplicate product slug", async () => {
    const res = await call("/api/admin/items/products", "owner", { method: "POST", json: { data: { ...defaults.products[0] } } });
    expect(res.status).toBe(400);
    expect((await res.json()).message).toMatch(/already uses/);
  });

  it("hides unpublished items from the public site only", async () => {
    const madeRes = await call("/api/admin/items/journey", "owner", { method: "POST", json: { published: false, data: { when: "2027", title: "Draft stop" } } });
    const made = await madeRes.json();
    expect(made, JSON.stringify(made)).toHaveProperty("id");
    const admin = await (await call("/api/admin/items/journey", "owner")).json();
    expect(admin.some((row: { id: number }) => row.id === made.id)).toBe(true);
    const site = await (await call("/api/content")).json();
    expect(site.journey.some((stop: { title: string }) => stop.title === "Draft stop")).toBe(false);
    expect((await call(`/api/admin/items/journey/${made.id}`, "owner", { method: "DELETE" })).status).toBe(200);
  });

  it("reorders a list", async () => {
    const list = await (await call("/api/admin/items/process", "owner")).json();
    const ids = list.map((row: { id: number }) => row.id).reverse();
    const res = await call("/api/admin/items/process/order", "owner", { method: "PUT", json: { ids } });
    expect((await res.json()).map((row: { id: number }) => row.id)).toEqual(ids);
  });
});

describe("agent keys and MCP", () => {
  let key = "";
  let keyId = 0;

  it("owner creates a key, shown once", async () => {
    const res = await call("/api/admin/agent-keys", "owner", { method: "POST", json: { name: "Claude Code" } });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.key).toMatch(/^pf_agent_[A-Za-z0-9]{40}$/);
    key = body.key;
    keyId = body.id;
    const listed = await (await call("/api/admin/agent-keys", "owner")).json();
    expect(JSON.stringify(listed)).not.toContain(key);
  });

  it("rejects MCP calls without a key", async () => {
    expect((await mcp("pf_agent_wrong", "portfolio_read", { type: "site" })).status).toBe(401);
  });

  it("reads and writes through MCP with the admin's validation", async () => {
    const products = await mcp(key, "portfolio_read", { type: "products" });
    expect(JSON.parse(products.body.result!.content[0].text).total).toBe(8);

    const guide = await mcp(key, "portfolio_read", { type: "projects", fields: true });
    expect(guide.body.result!.content[0].text).toMatch(/technologies: \[\{ name, description, category \}\]/);

    const bad = await mcp(key, "portfolio_write", { type: "site", data: { email: "nope" } });
    expect(bad.body.result!.isError).toBe(true);

    const ok = await mcp(key, "portfolio_write", { type: "site", data: { heroAccent: "teams rely on.", sections: { products: { tag: "Live", title: "Live products", lead: "" } } } });
    expect(ok.body.result!.isError).toBeFalsy();
    const site = await (await call("/api/content")).json();
    expect(site.site.heroAccent).toBe("teams rely on.");
    expect(site.site.sections.products.title).toBe("Live products");
    expect(site.site.sections.expertise.title).toBe(defaults.site.sections.expertise.title);
  });

  it("does not let an agent key manage agent keys", async () => {
    expect((await call("/api/admin/agent-keys", key.replace("Bearer ", ""))).status).toBe(403);
  });

  it("stops working once revoked", async () => {
    expect((await call(`/api/admin/agent-keys/${keyId}`, "owner", { method: "DELETE" })).status).toBe(200);
    expect((await mcp(key, "portfolio_read", { type: "site" })).status).toBe(401);
  });
});
