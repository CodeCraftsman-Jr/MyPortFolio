import type { ItemDto, Kind, Site } from "@shared/portfolio";
import { API_URL } from "@/content/ContentProvider";
import { getSessionToken } from "./staffSession";

/** An API failure with the server's own message, shown as-is in the admin. */
export class AdminError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const send = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const token = getSessionToken();
  const headers = new Headers(init.headers);
  if (token) headers.set("authorization", `Bearer ${token}`);
  if (typeof init.body === "string") headers.set("content-type", "application/json");
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/admin${path}`, { ...init, headers, credentials: "include" });
  } catch {
    throw new AdminError(0, `Cannot reach the portfolio API at ${API_URL}. Check your connection.`);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new AdminError(res.status, body.message || `Request failed (HTTP ${res.status})`);
  return body as T;
};

const json = (body: unknown) => JSON.stringify(body);

export interface Me { userId: string; email: string; name: string; role: string; agent: boolean; uploads: boolean }
export interface Media { id: number; url: string; fileName: string; byteSize: number; altText: string; createdAt: string }
export interface AgentKey { id: number; name: string; prefix: string; createdAt: string; lastUsedAt: string | null; revokedAt: string | null; key?: string }

export const adminApi = {
  me: () => send<Me>("/me"),
  getSite: () => send<{ site: Site | null }>("/site"),
  saveSite: (site: unknown) => send<{ site: Site }>("/site", { method: "PUT", body: json(site) }),
  listItems: (kind: Kind) => send<ItemDto[]>(`/items/${kind}`),
  addItem: (kind: Kind, data: unknown, published = true) => send<ItemDto>(`/items/${kind}`, { method: "POST", body: json({ data, published }) }),
  changeItem: (kind: Kind, id: number, change: { data?: unknown; published?: boolean }) =>
    send<ItemDto>(`/items/${kind}/${id}`, { method: "PATCH", body: json(change) }),
  deleteItem: (kind: Kind, id: number) => send<{ deleted: number }>(`/items/${kind}/${id}`, { method: "DELETE" }),
  reorder: (kind: Kind, ids: number[]) => send<ItemDto[]>(`/items/${kind}/order`, { method: "PUT", body: json({ ids }) }),
  listMedia: () => send<Media[]>("/media"),
  upload: (files: File[], altText: string) => {
    const form = new FormData();
    files.forEach((file) => form.append("file", file));
    form.append("altText", altText);
    return send<Media[]>("/media", { method: "POST", body: form });
  },
  deleteMedia: (id: number) => send<{ deleted: number }>(`/media/${id}`, { method: "DELETE" }),
  listKeys: () => send<AgentKey[]>("/agent-keys"),
  addKey: (name: string) => send<AgentKey>("/agent-keys", { method: "POST", body: json({ name }) }),
  revokeKey: (id: number) => send<AgentKey>(`/agent-keys/${id}`, { method: "DELETE" }),
};
