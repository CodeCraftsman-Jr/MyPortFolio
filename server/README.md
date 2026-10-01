# Portfolio API

Content API, admin backend and MCP endpoint for vasanthan.tech. One Node
service (Hono) on the shared VarSys Postgres, schema `portfolio`, with
row-level security. It follows the Vasanth's Kitchen API pattern.

| Path | Who | What |
|---|---|---|
| `GET /api/content` | anyone | Published content for the site (cached 30 s) |
| `/api/admin/*` | Better Auth session with the `portfolio` app grant, or an agent key | Site record, content lists, media, agent keys |
| `POST /mcp` | agent key (`Authorization: Bearer pf_agent_...`) | MCP tools `portfolio_read`, `portfolio_write`, `portfolio_preview` |
| `GET /health` | anyone | Database check |

The content contract (Zod schemas and admin form fields) is `../shared/portfolio.ts`.
`../shared/defaults.json` is both the seed and the public site's offline fallback.

## Roles

- `alpha` (owner): edit and delete, manage agent keys.
- `beta` (editor): edit, publish and hide; no deletes.
- Agent key: acts as `alpha` but cannot manage agent keys.
- Access is the `portfolio` grant in `access.user_app` alone. No team change is
  needed (the users dashboard allows one team per account, so adding a team
  would move the owner out of their current one).

## Run and test locally

```bash
npm install
npm test          # embedded Postgres (PGlite): real migration, driver and RLS
npm run dev:local # API on :3020 with a stand-in sign-in; token "local-owner"
```

For the admin against `dev:local`, set `VITE_PORTFOLIO_API_URL=http://127.0.0.1:3020`
in `../.env.development.local` and `localStorage.varsys_session_token = "local-owner"`.

## Production setup (one time)

1. **Database** (as the Postgres superuser): create roles `portfolio_app`
   (LOGIN, NOBYPASSRLS) and `portfolio_migration` (LOGIN, owns schema
   `portfolio`), then `npm run migrate` and `npm run seed`. Passwords go to
   OpenBao `secret/varsys/integrations/portfolio`.
2. **App grant**: insert `access.app` (`slug = 'portfolio'`, `db_schema = 'portfolio'`)
   and an `access.user_app` row (owner's user id, role `alpha`).
3. **Storage** (optional): bucket `portfolio-media` on SeaweedFS; the shared S3
   key from `secret/varsys/shared/platforms/storage/s3/varsys-prod`.
4. **Coolify**: app from image `ghcr.io/codecraftsman-jr/portfolio-api:latest`,
   port 3020, health check `/health`. Env: `DATABASE_URL`, `AUTH_SERVICE_URL=http://auth-service:3000`,
   `TENANT_ID=vasanthan-portfolio`, `APP_SLUG=portfolio`,
   `CORS_ORIGINS=https://vasanthan.tech,https://www.vasanthan.tech`, `S3_*`.
   Then set repo variable `COOLIFY_API_UUID` and secret `COOLIFY_TOKEN` for CI deploys.
5. **Edge**: DNS `portfolio-api.varsys.co.in` (Hostinger) and an NPM proxy host
   with a Let's Encrypt certificate (NPM is the edge proxy, not Traefik).
6. **Auth service**: add `https://vasanthan.tech` to its `CORS_ORIGINS` so the
   admin sign-in works from the site.

## MCP client config

```json
{
  "mcpServers": {
    "portfolio": {
      "type": "http",
      "url": "https://portfolio-api.varsys.co.in/mcp",
      "headers": { "Authorization": "Bearer ${PORTFOLIO_AGENT_KEY}" }
    }
  }
}
```

Create the key in the admin under "MCP + agent keys". Keep it in the environment, never in a tracked file.
