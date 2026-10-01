/**
 * The only place the admin talks to the shared VarSys auth service (Better
 * Auth at auth.varsys.co.in). Sign-in returns a bearer token in the
 * `set-auth-token` header; it is kept in localStorage under the same key the
 * other VarSys apps use and sent to the portfolio API as `Authorization: Bearer`.
 */
const AUTH_URL = (import.meta.env.VITE_AUTH_URL || "https://auth.varsys.co.in").replace(/\/$/, "");
const TOKEN_KEY = "varsys_session_token";

export const getSessionToken = (): string => {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
};

const saveSessionToken = (token: string) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Private mode: the session lasts for this tab only.
  }
};

const readMessage = async (res: Response, fallback: string) => {
  try {
    const body = await res.json();
    return (body?.message as string) || (body?.error as string) || fallback;
  } catch {
    return fallback;
  }
};

export const signInStaff = async (email: string, password: string) => {
  const res = await fetch(`${AUTH_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, rememberMe: true }),
  });
  if (!res.ok) throw new Error(await readMessage(res, res.status === 401 ? "Wrong email or password" : "Could not sign in. Please try again."));
  const token = res.headers.get("set-auth-token");
  if (!token) throw new Error("Signed in, but the session could not be kept. Allow site storage and try again.");
  saveSessionToken(token);
};

export const signOutStaff = async () => {
  const token = getSessionToken();
  saveSessionToken("");
  try {
    await fetch(`${AUTH_URL}/api/auth/sign-out`, {
      method: "POST",
      credentials: "include",
      headers: token ? { authorization: `Bearer ${token}` } : {},
    });
  } catch {
    // The local token is already gone; the server session expires on its own.
  }
};
