import { Hono } from "hono";
import { agentKeyInput, isKind, itemWrite, orderInput, type Kind } from "@shared/portfolio";
import type { Portfolio } from "../portfolio.js";
import type { StaffSession } from "../auth/staffGate.js";
import { makeAgentKey } from "../auth/agentKey.js";
import { badRequest, notFound } from "../http/errors.js";
import { limitRequests } from "../http/rateLimit.js";
import { addItem, changeItem, deleteItem, getItem, getSite, listItems, reorderItems, saveSite } from "../store/content.js";
import { addMedia, deleteMedia, listMedia, type MediaRow } from "../store/media.js";
import { addAgentKey, listAgentKeys, revokeAgentKey, toKeyDto } from "../store/agentKeys.js";
import { MAX_IMAGE_BYTES, sniffImageType } from "../storage/objectStore.js";

type Env = { Variables: { staff: StaffSession } };

const kindOf = (value: string): Kind => {
  if (!isKind(value)) throw notFound(`Content type "${value}"`);
  return value;
};
const idOf = (value: string) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) throw badRequest("id must be a positive whole number");
  return id;
};

export const adminRoutes = (portfolio: Portfolio) => {
  const { database, gate, files } = portfolio;
  const route = new Hono<Env>();
  route.use("*", limitRequests("admin", 600, 60_000));
  route.use("*", gate.requireStaff);

  const asStaff = <T>(c: { get: (k: "staff") => StaffSession }, work: Parameters<typeof database.withTenant<T>>[1]) =>
    database.withTenant(c.get("staff").tenant, work);

  const mediaDto = (row: MediaRow) => ({
    id: Number(row.id),
    url: files.publicUrl(row.storage_key),
    fileName: row.file_name,
    mimeType: row.mime_type,
    byteSize: row.byte_size,
    altText: row.alt_text,
    createdAt: row.created_at.toISOString(),
  });

  route.get("/me", (c) => {
    const staff = c.get("staff");
    return c.json({ ...staff.user, agent: Boolean(staff.agentKeyId), uploads: files.ready });
  });

  // ---------------------------------------------------------------- site
  route.get("/site", async (c) => c.json({ site: await asStaff(c, getSite) }));
  route.put("/site", async (c) => {
    const body = await c.req.json();
    return c.json({ site: await asStaff(c, (sql) => saveSite(sql, body, c.get("staff").tenant.userId)) });
  });

  // ---------------------------------------------------------------- content items
  route.get("/items/:kind", async (c) => {
    const kind = kindOf(c.req.param("kind"));
    return c.json(await asStaff(c, (sql) => listItems(sql, kind)));
  });
  route.get("/items/:kind/:id", async (c) => {
    const kind = kindOf(c.req.param("kind"));
    const id = idOf(c.req.param("id"));
    return c.json(await asStaff(c, (sql) => getItem(sql, kind, id)));
  });
  route.post("/items/:kind", async (c) => {
    const kind = kindOf(c.req.param("kind"));
    const body = itemWrite.parse(await c.req.json());
    return c.json(await asStaff(c, (sql) => addItem(sql, kind, body, c.get("staff").tenant.userId)), 201);
  });
  route.patch("/items/:kind/:id", async (c) => {
    const kind = kindOf(c.req.param("kind"));
    const id = idOf(c.req.param("id"));
    const body = itemWrite.partial().parse(await c.req.json());
    return c.json(await asStaff(c, (sql) => changeItem(sql, kind, id, body, c.get("staff").tenant.userId)));
  });
  route.delete("/items/:kind/:id", gate.requireOwner, async (c) => {
    const kind = kindOf(c.req.param("kind"));
    const id = idOf(c.req.param("id"));
    await asStaff(c, (sql) => deleteItem(sql, kind, id));
    return c.json({ deleted: id });
  });
  route.put("/items/:kind/order", async (c) => {
    const kind = kindOf(c.req.param("kind"));
    const { ids } = orderInput.parse(await c.req.json());
    return c.json(await asStaff(c, (sql) => reorderItems(sql, kind, ids)));
  });

  // ---------------------------------------------------------------- media
  route.get("/media", async (c) => c.json((await asStaff(c, listMedia)).map(mediaDto)));
  route.post("/media", async (c) => {
    const form = await c.req.formData();
    const altText = String(form.get("altText") ?? "").slice(0, 300);
    const uploads = form.getAll("file").filter((f): f is File => f instanceof File);
    if (!uploads.length) throw badRequest("Attach at least one image as 'file'");
    if (uploads.length > 20) throw badRequest("Upload at most 20 images at a time");
    const saved = [];
    for (const file of uploads) {
      const bytes = new Uint8Array(await file.arrayBuffer());
      if (bytes.byteLength > MAX_IMAGE_BYTES) throw badRequest(`${file.name} is larger than 8 MB`);
      const mimeType = sniffImageType(bytes);
      if (!mimeType) throw badRequest(`${file.name} is not a JPEG, PNG, WebP, AVIF or GIF image`);
      const storageKey = await files.putImage(bytes, mimeType);
      const row = await asStaff(c, (sql) => addMedia(sql, { storageKey, fileName: file.name.slice(0, 255) || "image", mimeType, byteSize: bytes.byteLength, altText }));
      saved.push(mediaDto(row));
    }
    return c.json(saved, 201);
  });
  route.delete("/media/:id", gate.requireOwner, async (c) => {
    const id = idOf(c.req.param("id"));
    const key = await asStaff(c, (sql) => deleteMedia(sql, id));
    await files.remove(key).catch(() => undefined);
    return c.json({ deleted: id });
  });

  // ---------------------------------------------------------------- agent keys (people only, owner only)
  route.get("/agent-keys", gate.requireHuman, gate.requireOwner, async (c) => c.json((await asStaff(c, listAgentKeys)).map(toKeyDto)));
  route.post("/agent-keys", gate.requireHuman, gate.requireOwner, async (c) => {
    const { name } = agentKeyInput.parse(await c.req.json());
    const made = makeAgentKey();
    const row = await asStaff(c, (sql) => addAgentKey(sql, { name, prefix: made.prefix, hash: made.hash, userId: c.get("staff").tenant.userId }));
    // The full key is returned exactly once; only its hash is stored.
    return c.json({ ...toKeyDto(row), key: made.key }, 201);
  });
  route.delete("/agent-keys/:id", gate.requireHuman, gate.requireOwner, async (c) => {
    const id = idOf(c.req.param("id"));
    const row = await asStaff(c, (sql) => revokeAgentKey(sql, id));
    if (!row) throw notFound(`Agent key ${id}`);
    gate.forgetAgentKeys();
    return c.json(toKeyDto(row));
  });

  return route;
};
