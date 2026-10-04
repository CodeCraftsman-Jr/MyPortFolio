import { createHash, randomBytes } from "node:crypto";

/** Agent keys look like pf_agent_<40 base62 chars>; only their SHA-256 is stored. */
export const AGENT_KEY_PREFIX = "pf_agent_";
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const hashAgentKey = (key: string) => createHash("sha256").update(key).digest("hex");

export const makeAgentKey = () => {
  // 248 of 256 byte values map evenly onto 62 symbols (4 x 62); the rest are skipped.
  let body = "";
  while (body.length < 40) for (const byte of randomBytes(48)) if (byte < 248 && body.length < 40) body += ALPHABET[byte % 62];
  const key = AGENT_KEY_PREFIX + body;
  return { key, prefix: key.slice(0, AGENT_KEY_PREFIX.length + 4), hash: hashAgentKey(key) };
};

export const isAgentKey = (authorization: string) => authorization.startsWith(`Bearer ${AGENT_KEY_PREFIX}`);
