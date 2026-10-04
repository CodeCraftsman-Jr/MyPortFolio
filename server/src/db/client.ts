import postgres from "postgres";

/** Who a request acts as, decided on the server only. */
export interface Tenant {
  tenantId: string;
  role: "alpha" | "beta" | "gamma" | "public";
  userId: string | null;
}

export type Sql = postgres.TransactionSql;

/**
 * `actAs` is for tests on an embedded database that only logs in as a
 * superuser: each transaction drops to that role so RLS applies as in production.
 */
export const makeDb = (url: string, options: { max?: number; actAs?: string } = {}) => {
  // prepare:false keeps the pool safe behind PgBouncer transaction pooling.
  const client = postgres(url, { prepare: false, max: options.max ?? 8, idle_timeout: 30, connect_timeout: 10, onnotice: () => {} });
  if (options.actAs && !/^[a-z_][a-z0-9_]*$/.test(options.actAs)) throw new Error("actAs must be a plain role name");
  const dropRole = async (sql: Sql) => {
    if (options.actAs) await sql.unsafe(`set local role ${options.actAs}`);
  };

  /** Runs `work` in one transaction with this tenant's RLS settings (transaction-local). */
  const withTenant = <T>(tenant: Tenant, work: (sql: Sql) => Promise<T>): Promise<T> =>
    client.begin(async (sql) => {
      await dropRole(sql);
      await sql`SELECT
        set_config('app.current_organization_id', ${tenant.tenantId}, true),
        set_config('app.current_role', ${tenant.role}, true),
        set_config('app.current_user_id', ${tenant.userId ?? ""}, true),
        set_config('search_path', 'portfolio', true)`;
      return work(sql);
    }) as Promise<T>;

  /** The active agent key with this hash, if any (runs before a tenant is known). */
  const findAgentKey = async (keyHash: string) => {
    const [row] = (await client.begin(async (sql) => {
      await dropRole(sql);
      return sql`select key_id, key_tenant_id, key_name from portfolio.agent_key_for(${keyHash})`;
    })) as unknown as Array<Record<string, unknown>>;
    return row ? { id: Number(row.key_id), tenantId: String(row.key_tenant_id), name: String(row.key_name) } : null;
  };

  const close = () => client.end({ timeout: 5 });
  const ping = async () => (await client`select 1 as ok`)[0]?.ok === 1;

  return { withTenant, findAgentKey, close, ping };
};

export type Database = ReturnType<typeof makeDb>;
