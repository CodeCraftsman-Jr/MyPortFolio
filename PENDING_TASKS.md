# Pending tasks: portfolio admin + MCP go-live

Leantime ticket: **LT-2422** (project "VarSys Pvt Ltd").
Branch: all code is on `stagging` (commit `c258f08`). `main` is still `v3.0.0`
and deploys vasanthan.tech through GitHub Pages; nothing here is live yet.

## Where things stand (2026-10-02)

Done and verified:

- [x] Portfolio redesign (3D scene, expertise explorer, live products, planner).
- [x] `server/`: content API, admin API, MCP endpoint (`portfolio_read`,
      `portfolio_write`, `portfolio_preview`), agent keys, RLS migration.
- [x] `/admin` editor in the site, generated from `shared/portfolio.ts`.
- [x] Public site reads `/api/content`, falls back to `shared/defaults.json`.
- [x] GitHub Pages `404.html` restores deep links such as `/admin`.
- [x] 15 server tests pass (`cd server && npm test`, embedded Postgres).
- [x] Local end-to-end check with `npm --prefix server run dev:local`.

Not done: everything below needs production access.

## Blockers (owner action)

- [ ] **New Coolify API token.** The token in the workspace `.mcp.json`
      (`COOLIFY_ACCESS_TOKEN`) is rejected as "Unauthenticated". Create one at
      https://coolify.varsys.co.in (Keys & Tokens, write access), put it in
      `.mcp.json`, and restart the session.
- [ ] **Start Tailscale on this laptop.** The `tailscaled` service is not
      running, so the production Postgres at `100.64.0.2:5432` is unreachable.
      (Read-only fallback that works without it: `psql` inside the Postgres
      container over SSH, see `docs/reference/vps-infra.md`.)

## Go-live steps (in order)

### 1. Database (shared prod Postgres, database `varsys`)

- [ ] As superuser (OpenBao `secret/varsys/shared/platforms/database/postgres/varsys-prod`):
  ```sql
  CREATE ROLE portfolio_migration LOGIN PASSWORD '...' CONNECTION LIMIT 5;
  CREATE ROLE portfolio_app LOGIN PASSWORD '...' NOBYPASSRLS CONNECTION LIMIT 20;
  ALTER ROLE portfolio_app SET statement_timeout = '15s';
  CREATE SCHEMA portfolio AUTHORIZATION portfolio_migration;
  ```
- [ ] Store both passwords in OpenBao at `secret/varsys/integrations/portfolio`
      (fields `DB_APP_PASSWORD`, `DB_MIGRATION_PASSWORD`). Never in files or chat.
- [ ] `cd server` then `MIGRATION_DATABASE_URL=... npm run migrate`
- [ ] `DATABASE_URL=...(portfolio_app) TENANT_ID=vasanthan-portfolio npm run seed`
- [ ] Check: as `portfolio_app` with role `public`, `select count(*) from portfolio.items`
      returns rows only when `app.current_organization_id = 'vasanthan-portfolio'`.

### 2. App grant (who may use /admin)

- [ ] `INSERT INTO access.app (slug, name, db_schema, is_active) VALUES ('portfolio', 'Portfolio', 'portfolio', true);`
- [ ] Find the owner's user id (`auth."user"` by email) and add
      `access.user_app (user_id, app_id, role, is_active) = (<owner>, <portfolio app id>, 'alpha', true)`.
- [ ] Do NOT create a new team or org for the owner: the users dashboard allows
      one team per account and would move them out of the Kitchen team.

### 3. Image storage (optional, uploads only)

- [ ] Create SeaweedFS bucket `portfolio-media` (public read via
      `https://files.varsys.co.in/buckets/portfolio-media/...`).
- [ ] Use the shared S3 key from `secret/varsys/shared/platforms/storage/s3/varsys-prod`.

### 4. Coolify app

- [ ] GitHub: run the "Portfolio API" workflow once (push to `main` or manual
      dispatch) so `ghcr.io/codecraftsman-jr/portfolio-api:latest` exists. If the
      GHCR package is private, add registry credentials in Coolify.
- [ ] Coolify: new app from that image, port `3020`, health check `/health`.
- [ ] Env (values from OpenBao, set by script, not by hand in chat):
      `NODE_ENV=production`, `PORT=3020`, `DATABASE_URL` (portfolio_app),
      `AUTH_SERVICE_URL=http://auth-service:3000`, `APP_SLUG=portfolio`,
      `TENANT_ID=vasanthan-portfolio`,
      `CORS_ORIGINS=https://vasanthan.tech,https://www.vasanthan.tech`,
      `S3_ENDPOINT=http://seaweedfs:8333`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`,
      `S3_BUCKET=portfolio-media`.
- [ ] GitHub repo settings: variable `COOLIFY_API_UUID` (the new app's uuid)
      and secret `COOLIFY_TOKEN`, so CI redeploys on every API change.

### 5. Edge

- [ ] Hostinger DNS (`hostinger-api` MCP, DNS only): `portfolio-api.varsys.co.in`
      A record to `160.250.204.210`.
- [ ] NPM proxy host for `portfolio-api.varsys.co.in` to the container's network
      alias, port 3020, with a Let's Encrypt certificate (NPM is the edge proxy,
      a Coolify fqdn alone fails TLS). NPM creds: OpenBao `varsys/integrations/npm`.

### 6. Auth service

- [ ] Add `https://vasanthan.tech` and `https://www.vasanthan.tech` to the
      auth-service `CORS_ORIGINS` in Coolify, then redeploy it. Without this the
      admin sign-in is blocked by the browser.

### 7. Verify live

- [ ] `curl https://portfolio-api.varsys.co.in/health` returns `database: true`.
- [ ] `curl https://portfolio-api.varsys.co.in/api/content` returns 8 products.
- [ ] `/api/admin/site` without a token returns 401.
- [ ] Sign in at `https://vasanthan.tech/admin` (after step 8), edit the hero
      text, and see it on the home page within a minute.
- [ ] Admin, "MCP + agent keys": create a key, set `PORTFOLIO_AGENT_KEY` in the
      environment, add the `portfolio` entry to `.mcp.json` (shown on that page),
      then call `portfolio_read type=site` from Claude Code.
- [ ] Check the site and admin at 320, 360, 768, 1024x600, 1920 and 2560 in both
      themes. The animations were never watched at full speed (the preview pane
      was hidden during testing).

### 8. Release

- [ ] Ask Claude to move `stagging` into `main` (needs an explicit request in
      that conversation). That publishes vasanthan.tech with the new site and admin.
- [ ] Close LT-2422 and write the KB session note.

## Other things found along the way

- [ ] `varsys.co.in` and `www.varsys.co.in` return **502 Bad Gateway**.
- [ ] Old portfolio listed two phone numbers (9442434269 and 9342634167);
      9442434269 is used. Change it in the admin if wrong.
- [ ] About text ("I started VarSys to solve problems I had at home and in my
      own restaurant...") was written by Claude; reword it in the admin if needed.
- [ ] Project images are Unsplash stock photos; replace them with real
      screenshots through Media once uploads work.
- [ ] Workspace `.mcp.json` and `opencode.json` contain a literal Vasanth's
      Kitchen agent key in headers; switch to `${VK_AGENT_KEY}` and rotate the
      key if those files were ever committed.
- [ ] `VasanthKitchen` site domain is `vasanthskitchen.varsys.co.in` (from Coolify).

## Useful commands

```bash
# server checks
cd MyPortFolio/server && npm test && npx tsc --noEmit

# local preview: API on :3020 (token "local-owner") + site on :5195
npm --prefix MyPortFolio/server run dev:local
# set VITE_PORTFOLIO_API_URL=http://127.0.0.1:3020 in MyPortFolio/.env.development.local
# then in the browser console on /admin: localStorage.varsys_session_token = "local-owner"
```

Full reference for the API: `server/README.md`.
