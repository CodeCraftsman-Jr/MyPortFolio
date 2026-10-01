/**
 * Fills an empty portfolio with shared/defaults.json, as the owner, through the
 * same store functions (and Zod checks) the admin uses. Safe to re-run: it
 * stops if the site record already exists.
 * Usage: DATABASE_URL=... npm run seed
 */
import { KIND_NAMES } from "@shared/portfolio";
import defaults from "../../shared/defaults.json" with { type: "json" };
import { loadSettings } from "../src/config.js";
import { makeDb } from "../src/db/client.js";
import { addItem, getSite, saveSite } from "../src/store/content.js";

const settings = loadSettings();
const db = makeDb(settings.DATABASE_URL);
const owner = { tenantId: settings.TENANT_ID, role: "alpha" as const, userId: null };

try {
  const result = await db.withTenant(owner, async (sql) => {
    if (await getSite(sql)) return "Site record already exists; nothing seeded.";
    await saveSite(sql, defaults.site, null);
    const counts: string[] = [];
    for (const kind of KIND_NAMES) {
      const list = (defaults as Record<string, unknown>)[kind] as unknown[];
      for (const data of list) await addItem(sql, kind, { data }, null);
      counts.push(`${kind}=${list.length}`);
    }
    return `Seeded site + ${counts.join(" ")}`;
  });
  console.log(result);
} finally {
  await db.close();
}
