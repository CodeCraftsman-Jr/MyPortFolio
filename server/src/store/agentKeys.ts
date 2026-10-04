import type { Sql } from "../db/client.js";

export interface AgentKeyRow {
  id: string | number;
  name: string;
  key_prefix: string;
  created_at: Date;
  last_used_at: Date | null;
  revoked_at: Date | null;
}

export const listAgentKeys = (sql: Sql) =>
  sql<AgentKeyRow[]>`select id, name, key_prefix, created_at, last_used_at, revoked_at from agent_keys order by created_at desc limit 200`;

export const addAgentKey = async (sql: Sql, values: { name: string; prefix: string; hash: string; userId: string | null }) => {
  const [row] = await sql<AgentKeyRow[]>`
    insert into agent_keys (name, key_prefix, key_hash, created_by)
    values (${values.name}, ${values.prefix}, ${values.hash}, ${values.userId})
    returning id, name, key_prefix, created_at, last_used_at, revoked_at`;
  return row;
};

export const revokeAgentKey = async (sql: Sql, id: number) => {
  const [row] = await sql<AgentKeyRow[]>`
    update agent_keys set revoked_at = now() where id = ${id} and revoked_at is null
    returning id, name, key_prefix, created_at, last_used_at, revoked_at`;
  return row ?? null;
};

export const toKeyDto = (row: AgentKeyRow) => ({
  id: Number(row.id),
  name: row.name,
  prefix: row.key_prefix,
  createdAt: row.created_at.toISOString(),
  lastUsedAt: row.last_used_at?.toISOString() ?? null,
  revokedAt: row.revoked_at?.toISOString() ?? null,
});
