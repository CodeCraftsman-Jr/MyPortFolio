-- Portfolio content schema, applied as portfolio_migration.
-- The schema, the two roles and their grants are created by the provisioning
-- step (server/README.md). Everything here is idempotent.
--
-- Tenancy: one portfolio, one fixed tenant id chosen by the API (TENANT_ID).
-- RLS compares tenant_id with app.current_organization_id, which the API sets
-- server-side per request. Roles: alpha (owner) and beta (editor) edit;
-- alpha alone deletes; 'public' is the anonymous visitor (published rows only).
-- Content shape is checked by the shared Zod schemas before any write.

SET search_path = portfolio;

-- ---------------------------------------------------------------- helpers
CREATE OR REPLACE FUNCTION portfolio.tenant() RETURNS text
  LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('app.current_organization_id', true), '') $$;

CREATE OR REPLACE FUNCTION portfolio.is_staff() RETURNS boolean
  LANGUAGE sql STABLE AS $$ SELECT coalesce(current_setting('app.current_role', true), '') IN ('alpha', 'beta') $$;

CREATE OR REPLACE FUNCTION portfolio.is_owner() RETURNS boolean
  LANGUAGE sql STABLE AS $$ SELECT coalesce(current_setting('app.current_role', true), '') = 'alpha' $$;

CREATE OR REPLACE FUNCTION portfolio.touch_updated_at() RETURNS trigger
  LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at := now(); RETURN NEW; END $$;

-- ---------------------------------------------------------------- site (one row per tenant)
CREATE TABLE IF NOT EXISTS site (
  tenant_id   TEXT PRIMARY KEY DEFAULT portfolio.tenant() CHECK (tenant_id <> ''),
  data        JSONB NOT NULL CHECK (jsonb_typeof(data) = 'object'),
  updated_by  TEXT,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- list content
CREATE TABLE IF NOT EXISTS items (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tenant_id     TEXT NOT NULL DEFAULT portfolio.tenant() CHECK (tenant_id <> ''),
  kind          TEXT NOT NULL CHECK (kind IN ('products', 'expertise', 'projects', 'journey', 'stack', 'process', 'needs', 'socials')),
  sort_order    INTEGER NOT NULL DEFAULT 0,
  is_published  BOOLEAN NOT NULL DEFAULT true,
  data          JSONB NOT NULL CHECK (jsonb_typeof(data) = 'object' AND pg_column_size(data) < 64000),
  updated_by    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS items_tenant_kind_idx ON items (tenant_id, kind, sort_order, id);
DROP TRIGGER IF EXISTS items_touch ON items;
CREATE TRIGGER items_touch BEFORE UPDATE ON items FOR EACH ROW EXECUTE FUNCTION portfolio.touch_updated_at();
DROP TRIGGER IF EXISTS site_touch ON site;
CREATE TRIGGER site_touch BEFORE UPDATE ON site FOR EACH ROW EXECUTE FUNCTION portfolio.touch_updated_at();

-- ---------------------------------------------------------------- media
CREATE TABLE IF NOT EXISTS media (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tenant_id    TEXT NOT NULL DEFAULT portfolio.tenant() CHECK (tenant_id <> ''),
  storage_key  TEXT NOT NULL UNIQUE,
  file_name    TEXT NOT NULL CHECK (length(file_name) BETWEEN 1 AND 255),
  mime_type    TEXT NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif')),
  byte_size    INTEGER NOT NULL CHECK (byte_size > 0),
  alt_text     TEXT NOT NULL DEFAULT '' CHECK (length(alt_text) <= 300),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS media_tenant_created_idx ON media (tenant_id, created_at DESC);

-- ---------------------------------------------------------------- agent keys (MCP logins)
-- Only a SHA-256 hash is stored; the key itself is shown once on creation.
CREATE TABLE IF NOT EXISTS agent_keys (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tenant_id     TEXT NOT NULL DEFAULT portfolio.tenant() CHECK (tenant_id <> ''),
  name          TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 80),
  key_prefix    TEXT NOT NULL CHECK (length(key_prefix) BETWEEN 8 AND 24),
  key_hash      TEXT NOT NULL UNIQUE CHECK (key_hash ~ '^[0-9a-f]{64}$'),
  created_by    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at  TIMESTAMPTZ,
  revoked_at    TIMESTAMPTZ
);

-- ---------------------------------------------------------------- row-level security
ALTER TABLE site ENABLE ROW LEVEL SECURITY;
ALTER TABLE site FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS site_read ON site;
CREATE POLICY site_read ON site FOR SELECT USING (tenant_id = portfolio.tenant());
DROP POLICY IF EXISTS site_write ON site;
CREATE POLICY site_write ON site FOR INSERT WITH CHECK (tenant_id = portfolio.tenant() AND portfolio.is_staff());
DROP POLICY IF EXISTS site_change ON site;
CREATE POLICY site_change ON site FOR UPDATE USING (tenant_id = portfolio.tenant() AND portfolio.is_staff())
  WITH CHECK (tenant_id = portfolio.tenant() AND portfolio.is_staff());

ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE items FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS items_read ON items;
CREATE POLICY items_read ON items FOR SELECT
  USING (tenant_id = portfolio.tenant() AND (is_published OR portfolio.is_staff()));
DROP POLICY IF EXISTS items_add ON items;
CREATE POLICY items_add ON items FOR INSERT WITH CHECK (tenant_id = portfolio.tenant() AND portfolio.is_staff());
DROP POLICY IF EXISTS items_change ON items;
CREATE POLICY items_change ON items FOR UPDATE USING (tenant_id = portfolio.tenant() AND portfolio.is_staff())
  WITH CHECK (tenant_id = portfolio.tenant() AND portfolio.is_staff());
DROP POLICY IF EXISTS items_remove ON items;
CREATE POLICY items_remove ON items FOR DELETE USING (tenant_id = portfolio.tenant() AND portfolio.is_owner());

ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE media FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS media_staff ON media;
CREATE POLICY media_staff ON media FOR SELECT USING (tenant_id = portfolio.tenant() AND portfolio.is_staff());
DROP POLICY IF EXISTS media_add ON media;
CREATE POLICY media_add ON media FOR INSERT WITH CHECK (tenant_id = portfolio.tenant() AND portfolio.is_staff());
DROP POLICY IF EXISTS media_change ON media;
CREATE POLICY media_change ON media FOR UPDATE USING (tenant_id = portfolio.tenant() AND portfolio.is_staff())
  WITH CHECK (tenant_id = portfolio.tenant() AND portfolio.is_staff());
DROP POLICY IF EXISTS media_remove ON media;
CREATE POLICY media_remove ON media FOR DELETE USING (tenant_id = portfolio.tenant() AND portfolio.is_owner());

-- ENABLE without FORCE: the app role is filtered, the schema owner (used only
-- by agent_key_for below) is not.
ALTER TABLE agent_keys ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS agent_keys_owner ON agent_keys;
CREATE POLICY agent_keys_owner ON agent_keys FOR ALL
  USING (tenant_id = portfolio.tenant() AND portfolio.is_owner())
  WITH CHECK (tenant_id = portfolio.tenant() AND portfolio.is_owner());

-- Resolves a presented key before any tenant is known. Returns only the one
-- active key matching the hash, and records when it was last used.
CREATE OR REPLACE FUNCTION portfolio.agent_key_for(p_hash text)
  RETURNS TABLE (key_id bigint, key_tenant_id text, key_name text)
  LANGUAGE plpgsql SECURITY DEFINER SET search_path = portfolio, pg_temp AS $$
BEGIN
  UPDATE agent_keys SET last_used_at = now()
   WHERE key_hash = p_hash AND revoked_at IS NULL
     AND (last_used_at IS NULL OR last_used_at < now() - interval '1 minute');
  RETURN QUERY SELECT k.id, k.tenant_id, k.name FROM agent_keys k WHERE k.key_hash = p_hash AND k.revoked_at IS NULL;
END $$;
REVOKE ALL ON FUNCTION portfolio.agent_key_for(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION portfolio.agent_key_for(text) TO portfolio_app;

-- ---------------------------------------------------------------- app role grants
GRANT USAGE ON SCHEMA portfolio TO portfolio_app;
GRANT SELECT, INSERT, UPDATE ON site TO portfolio_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON items, media TO portfolio_app;
GRANT SELECT, INSERT, UPDATE ON agent_keys TO portfolio_app;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA portfolio TO portfolio_app;
