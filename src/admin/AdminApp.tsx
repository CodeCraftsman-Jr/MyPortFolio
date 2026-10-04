import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Bot, ExternalLink, FileText, Image, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { KIND_INFO, KIND_NAMES, type Kind } from "@shared/portfolio";
import { setTheme, useTheme } from "@/hooks/useTheme";
import { usePhoneSize } from "@/hooks/useMediaQuery";
import { adminApi, AdminError, type Me } from "./adminApi";
import { getSessionToken, signInStaff, signOutStaff } from "./staffSession";
import { ItemsPage } from "./ItemsPage";
import { SitePage } from "./SitePage";
import { MediaPage } from "./MediaPage";
import { AgentKeysPage } from "./AgentKeysPage";
import "./admin.css";

type Page = "site" | Kind | "media" | "keys";

function SignIn({ onDone, notice }: { onDone: () => void; notice: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(notice);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signInStaff(email.trim(), password);
      onDone();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="pf-ad-login">
      <form className="pf-ad-login-card" onSubmit={submit}>
        <span className="pf-brand-mark">VE</span>
        <h1 className="pf-ad-login-title">Portfolio admin</h1>
        <p className="pf-ad-hint">Sign in with your VarSys account.</p>
        {error && <p className="pf-ad-error" role="alert">{error}</p>}
        <div className="pf-ad-field">
          <label className="pf-ad-label" htmlFor="pf-ad-email">Email</label>
          <input id="pf-ad-email" type="email" className="pf-ad-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
        </div>
        <div className="pf-ad-field">
          <label className="pf-ad-label" htmlFor="pf-ad-password">Password</label>
          <input id="pf-ad-password" type="password" className="pf-ad-input" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </div>
        <button type="submit" className="pf-ad-btn pf-ad-btn-main pf-ad-btn-block" disabled={busy}>
          {busy ? "Signing in" : "Sign in"}
        </button>
        <a className="pf-ad-hint pf-ad-back" href="/">Back to the portfolio</a>
      </form>
    </main>
  );
}

export default function AdminApp() {
  const [me, setMe] = useState<Me | null>(null);
  const [state, setState] = useState<"loading" | "signin" | "ready">("loading");
  const [notice, setNotice] = useState("");
  const [page, setPage] = useState<Page>("site");
  const [drawer, setDrawer] = useState(false);
  const theme = useTheme();
  const phone = usePhoneSize();

  const check = useCallback(async () => {
    if (!getSessionToken()) {
      setState("signin");
      return;
    }
    try {
      setMe(await adminApi.me());
      setState("ready");
    } catch (err) {
      const status = err instanceof AdminError ? err.status : 0;
      setNotice(status === 401 ? "" : (err as Error).message);
      setState("signin");
    }
  }, []);

  useEffect(() => {
    document.title = "Portfolio admin";
    void check();
  }, [check]);

  if (state === "loading") return <main className="pf-ad-login"><p className="pf-ad-hint">Loading</p></main>;
  if (state === "signin" || !me) return <SignIn onDone={check} notice={notice} />;

  const owner = me.role === "alpha";
  const nav: { id: Page; label: string; icon?: typeof FileText }[] = [
    { id: "site", label: "Profile and text", icon: FileText },
    ...KIND_NAMES.map((kind) => ({ id: kind as Page, label: KIND_INFO[kind].label })),
    { id: "media", label: "Media", icon: Image },
    ...(owner && !me.agent ? [{ id: "keys" as Page, label: "MCP + agent keys", icon: Bot }] : []),
  ];
  const go = (next: Page) => {
    setPage(next);
    if (phone) setDrawer(false);
  };
  const title = nav.find((n) => n.id === page)?.label ?? "";

  return (
    <div className="pf-ad-shell">
      <header className="pf-ad-header">
        <button type="button" className="pf-ad-icon pf-ad-menu" onClick={() => setDrawer((v) => !v)} aria-label={phone ? (drawer ? "Close menu" : "Open menu") : drawer ? "Show sidebar" : "Hide sidebar"} aria-expanded={phone ? drawer : !drawer}>
          {phone && drawer ? <X size={16} /> : <Menu size={16} />}
        </button>
        <span className="pf-ad-brand">
          <span className="pf-brand-mark">VE</span>
          <span className="pf-ad-brand-text">Portfolio admin</span>
        </span>
        <span className="pf-ad-crumb">{title}</span>
        <span className="pf-ad-header-tools">
          <a className="pf-ad-btn" href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} aria-hidden="true" />
            <span className="pf-ad-hide-phone">View site</span>
          </a>
          <button type="button" className="pf-ad-icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            type="button"
            className="pf-ad-icon"
            onClick={async () => {
              await signOutStaff();
              setMe(null);
              setState("signin");
            }}
            aria-label="Sign out"
          >
            <LogOut size={15} />
          </button>
        </span>
      </header>

      <div className="pf-ad-body">
        {phone && drawer && <button type="button" className="pf-ad-scrim" aria-label="Close menu" onClick={() => setDrawer(false)} />}
        <nav className={`pf-ad-side ${drawer ? "pf-ad-side-toggled" : ""}`} aria-label="Admin sections">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <button type="button" className={`pf-ad-nav ${page === item.id ? "pf-ad-nav-on" : ""}`} onClick={() => go(item.id)} aria-current={page === item.id ? "page" : undefined}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="pf-ad-side-foot">
            {me.name || me.email}
            <span>{owner ? "Owner" : "Editor"}</span>
          </p>
        </nav>

        <main className="pf-ad-main">
          {page === "site" && <SitePage />}
          {page === "media" && <MediaPage canDelete={owner} uploads={me.uploads} />}
          {page === "keys" && <AgentKeysPage agent={me.agent} />}
          {(KIND_NAMES as string[]).includes(page) && <ItemsPage key={page} kind={page as Kind} canDelete={owner} />}
        </main>
      </div>
    </div>
  );
}
