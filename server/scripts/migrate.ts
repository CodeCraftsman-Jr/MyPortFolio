/**
 * Applies migrations/*.sql in name order as portfolio_migration.
 * Each file runs in its own transaction and is recorded once.
 * Usage: MIGRATION_DATABASE_URL=... npm run migrate
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const url = process.env.MIGRATION_DATABASE_URL;
if (!url) throw new Error("MIGRATION_DATABASE_URL is required (the portfolio_migration role)");

const folder = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../migrations");
const sql = postgres(url, { max: 1, onnotice: () => {} });

try {
  const [{ current_user: who }] = await sql`select current_user`;
  if (who !== "portfolio_migration") throw new Error(`Refusing to migrate as ${who}; use portfolio_migration`);

  await sql`CREATE TABLE IF NOT EXISTS portfolio.schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`;
  await sql`REVOKE ALL ON portfolio.schema_migrations FROM portfolio_app`;

  const done = new Set((await sql`select name from portfolio.schema_migrations`).map((row) => row.name as string));
  const files = (await readdir(folder)).filter((file) => file.endsWith(".sql")).sort();

  for (const file of files) {
    if (done.has(file)) {
      console.log(`skip   ${file}`);
      continue;
    }
    const body = await readFile(path.join(folder, file), "utf8");
    await sql.begin(async (tx) => {
      await tx.unsafe(body);
      await tx`insert into portfolio.schema_migrations (name) values (${file})`;
    });
    console.log(`apply  ${file}`);
  }
  console.log("migrations up to date");
} finally {
  await sql.end();
}
