import { KINDS, KIND_NAMES, siteInput, type ItemDto, type Kind, type PublicContent, type Site } from "@shared/portfolio";
import type { Sql } from "../db/client.js";
import { badRequest, notFound } from "../http/errors.js";

interface ItemRow {
  id: string | number;
  kind: Kind;
  sort_order: number;
  is_published: boolean;
  data: Record<string, unknown>;
  updated_at: Date;
}

const toDto = (row: ItemRow): ItemDto => ({
  id: Number(row.id),
  kind: row.kind,
  sortOrder: row.sort_order,
  published: row.is_published,
  data: row.data,
  updatedAt: row.updated_at.toISOString(),
});

// ---------------------------------------------------------------- site
export const getSite = async (sql: Sql): Promise<Site | null> => {
  const [row] = await sql<{ data: Site }[]>`select data from site limit 1`;
  return row?.data ?? null;
};

/** Saves the whole site record after checking it against the shared schema. */
export const saveSite = async (sql: Sql, input: unknown, userId: string | null): Promise<Site> => {
  const site = siteInput.parse(input);
  await sql`
    insert into site (data, updated_by) values (${sql.json(site as never)}, ${userId})
    on conflict (tenant_id) do update set data = excluded.data, updated_by = excluded.updated_by`;
  return site;
};

// ---------------------------------------------------------------- items
export const listItems = async (sql: Sql, kind: Kind) =>
  (await sql<ItemRow[]>`select id, kind, sort_order, is_published, data, updated_at from items where kind = ${kind} order by sort_order, id`).map(toDto);

export const getItem = async (sql: Sql, kind: Kind, id: number) => {
  const [row] = await sql<ItemRow[]>`select id, kind, sort_order, is_published, data, updated_at from items where kind = ${kind} and id = ${id}`;
  if (!row) throw notFound(`${kind} item ${id}`);
  return toDto(row);
};

/** Slugs link items together (expertise -> products), so they must be unique per kind. */
const checkSlugFree = async (sql: Sql, kind: Kind, data: Record<string, unknown>, ownId?: number) => {
  if (typeof data.slug !== "string") return;
  const [clash] = await sql<{ id: string }[]>`
    select id from items where kind = ${kind} and data->>'slug' = ${data.slug} and id <> ${ownId ?? 0} limit 1`;
  if (clash) throw badRequest(`slug: another ${kind} item already uses "${data.slug}"`);
};

export const addItem = async (sql: Sql, kind: Kind, input: { data: unknown; published?: boolean }, userId: string | null) => {
  const data = KINDS[kind].parse(input.data) as Record<string, unknown>;
  await checkSlugFree(sql, kind, data);
  const [row] = await sql<ItemRow[]>`
    insert into items (kind, data, is_published, sort_order, updated_by)
    values (${kind}, ${sql.json(data as never)}, ${input.published ?? true},
            (select coalesce(max(sort_order), 0) + 10 from items where kind = ${kind}), ${userId})
    returning id, kind, sort_order, is_published, data, updated_at`;
  return toDto(row);
};

/** Merges the changed fields into the stored item, then checks the whole result. */
export const changeItem = async (sql: Sql, kind: Kind, id: number, input: { data?: Record<string, unknown>; published?: boolean }, userId: string | null) => {
  const current = await getItem(sql, kind, id);
  const data = KINDS[kind].parse({ ...current.data, ...(input.data ?? {}) }) as Record<string, unknown>;
  await checkSlugFree(sql, kind, data, id);
  const [row] = await sql<ItemRow[]>`
    update items set data = ${sql.json(data as never)}, is_published = ${input.published ?? current.published}, updated_by = ${userId}
    where kind = ${kind} and id = ${id}
    returning id, kind, sort_order, is_published, data, updated_at`;
  return toDto(row);
};

export const deleteItem = async (sql: Sql, kind: Kind, id: number) => {
  const rows = await sql`delete from items where kind = ${kind} and id = ${id} returning id`;
  if (!rows.length) throw notFound(`${kind} item ${id}`);
};

/** Puts the given ids first, in this order; others keep their order after them. */
export const reorderItems = async (sql: Sql, kind: Kind, ids: number[]) => {
  const known = new Set((await sql<{ id: string }[]>`select id from items where kind = ${kind}`).map((r) => Number(r.id)));
  const missing = ids.filter((id) => !known.has(id));
  if (missing.length) throw badRequest(`Not ${kind} items: ${missing.join(", ")}`);
  for (const [index, id] of ids.entries()) await sql`update items set sort_order = ${(index + 1) * 10} where id = ${id}`;
  return listItems(sql, kind);
};

// ---------------------------------------------------------------- public bundle
/** Published content for the site in one read. Returns null until the site record exists. */
export const getPublicContent = async (sql: Sql): Promise<PublicContent | null> => {
  const site = await getSite(sql);
  if (!site) return null;
  const rows = await sql<ItemRow[]>`select id, kind, sort_order, is_published, data, updated_at from items where is_published order by sort_order, id`;
  const grouped = Object.fromEntries(KIND_NAMES.map((kind) => [kind, [] as unknown[]]));
  for (const row of rows) grouped[row.kind]?.push(row.data);
  return { site, ...grouped } as unknown as PublicContent;
};
