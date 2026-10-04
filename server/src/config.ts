import { z } from "zod";

const settings = z.object({
  PORT: z.coerce.number().int().default(3020),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().url(),
  AUTH_SERVICE_URL: z.string().url().default("https://auth.varsys.co.in"),
  APP_SLUG: z.string().default("portfolio"),
  // The one portfolio this API serves; decided here, never by the caller.
  TENANT_ID: z.string().min(1).default("vasanthan-portfolio"),
  CORS_ORIGINS: z.string().default("https://vasanthan.tech,http://localhost:*,http://127.0.0.1:*"),
  S3_ENDPOINT: z.string().default(""),
  S3_ACCESS_KEY: z.string().default(""),
  S3_SECRET_KEY: z.string().default(""),
  S3_BUCKET: z.string().default("portfolio-media"),
  S3_PUBLIC_BASE: z.string().url().default("https://files.varsys.co.in/buckets"),
});

export type Settings = z.infer<typeof settings>;

/** Reads and checks the environment once, so a missing value stops the API at start. */
export const loadSettings = (env: NodeJS.ProcessEnv = process.env): Settings => {
  const parsed = settings.safeParse(env);
  if (!parsed.success) {
    const missing = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
    throw new Error(`Portfolio API settings are incomplete: ${missing}`);
  }
  return parsed.data;
};
