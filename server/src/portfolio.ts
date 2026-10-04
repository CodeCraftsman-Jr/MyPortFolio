import type { Settings } from "./config.js";
import { makeDb, type Database, type Tenant } from "./db/client.js";
import { makeStaffGate, type StaffGate } from "./auth/staffGate.js";
import { makeObjectStore, type ObjectStore } from "./storage/objectStore.js";

/** Everything a request handler needs, built once at start (tests pass their own parts). */
export interface Portfolio {
  settings: Settings;
  database: Database;
  gate: StaffGate;
  files: ObjectStore;
  /** How an anonymous visitor reads: published rows of this portfolio only. */
  visitor: Tenant;
}

export const makePortfolio = (parts: { settings: Settings; database?: Database; gate?: StaffGate; files?: ObjectStore }): Portfolio => {
  const { settings } = parts;
  const database = parts.database ?? makeDb(settings.DATABASE_URL);
  return {
    settings,
    database,
    gate: parts.gate ?? makeStaffGate({
      authUrl: settings.AUTH_SERVICE_URL,
      tenantId: settings.TENANT_ID,
      appSlug: settings.APP_SLUG,
      findAgentKey: database.findAgentKey,
    }),
    files: parts.files ?? makeObjectStore({
      endpoint: settings.S3_ENDPOINT,
      accessKey: settings.S3_ACCESS_KEY,
      secretKey: settings.S3_SECRET_KEY,
      bucket: settings.S3_BUCKET,
      publicBase: settings.S3_PUBLIC_BASE,
    }),
    visitor: { tenantId: settings.TENANT_ID, role: "public", userId: null },
  };
};
