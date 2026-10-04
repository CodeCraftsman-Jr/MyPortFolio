import { useEffect, useState, type FormEvent } from "react";
import { Check, Copy, KeyRound } from "lucide-react";
import { API_URL } from "@/content/ContentProvider";
import { adminApi, type AgentKey } from "./adminApi";

const when = (iso: string | null) => (iso ? new Date(iso).toLocaleString() : "Never");

/** MCP access: create and revoke agent keys, and show how to connect an agent. */
export function AgentKeysPage({ agent }: { agent: boolean }) {
  const [keys, setKeys] = useState<AgentKey[]>([]);
  const [name, setName] = useState("Claude Code");
  const [fresh, setFresh] = useState<AgentKey | null>(null);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");

  const load = () => adminApi.listKeys().then(setKeys).catch((err) => setError((err as Error).message));
  useEffect(() => {
    if (!agent) void load();
  }, [agent]);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setFresh(await adminApi.addKey(name.trim()));
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const revoke = async (key: AgentKey) => {
    if (!window.confirm(`Revoke "${key.name}"? Agents using it stop working at once.`)) return;
    try {
      await adminApi.revokeKey(key.id);
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
    } catch {
      setError("Copy failed. Select the text and copy it by hand.");
    }
  };

  const config = JSON.stringify(
    { mcpServers: { portfolio: { type: "http", url: `${API_URL}/mcp`, headers: { Authorization: "Bearer ${PORTFOLIO_AGENT_KEY}" } } } },
    null,
    2,
  );

  if (agent) return <div className="pf-ad-page"><p className="pf-ad-error">Agent keys cannot manage agent keys. Sign in as a person.</p></div>;

  return (
    <div className="pf-ad-page">
      <section className="pf-ad-pane pf-ad-pane-on pf-ad-single" aria-label="Agent keys">
        <div className="pf-ad-pane-head">
          <h2 className="pf-ad-pane-title">MCP and agent keys</h2>
        </div>
        <p className="pf-ad-hint pf-ad-intro">
          AI agents (Claude Code, OpenCode) edit this portfolio through the MCP tools portfolio_read, portfolio_write and
          portfolio_preview, with the same checks as this admin. Each agent signs in with its own key.
        </p>
        {error && <p className="pf-ad-error" role="alert">{error}</p>}

        <form className="pf-ad-key-form" onSubmit={create}>
          <div className="pf-ad-field">
            <label className="pf-ad-label" htmlFor="pf-ad-key-name">Key name</label>
            <input id="pf-ad-key-name" className="pf-ad-input" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} />
          </div>
          <button type="submit" className="pf-ad-btn pf-ad-btn-main">
            <KeyRound size={14} aria-hidden="true" />
            Create key
          </button>
        </form>

        {fresh?.key && (
          <div className="pf-ad-fresh" role="status">
            <p className="pf-ad-label">New key for {fresh.name}. It is shown only once; store it now.</p>
            <code className="pf-ad-code">{fresh.key}</code>
            <button type="button" className="pf-ad-btn" onClick={() => copy("key", fresh.key!)}>
              {copied === "key" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copied === "key" ? "Copied" : "Copy key"}
            </button>
          </div>
        )}

        <div className="pf-ad-field pf-ad-field-wide">
          <p className="pf-ad-label">Add to .mcp.json (set PORTFOLIO_AGENT_KEY in your environment, never in the file)</p>
          <pre className="pf-ad-code">{config}</pre>
          <button type="button" className="pf-ad-btn" onClick={() => copy("config", config)}>
            {copied === "config" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copied === "config" ? "Copied" : "Copy config"}
          </button>
        </div>

        <table className="pf-ad-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Key</th>
              <th scope="col">Last used</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key.id} className={key.revokedAt ? "pf-ad-row-off" : undefined}>
                <td>{key.name}</td>
                <td><code>{key.prefix}...</code></td>
                <td>{key.revokedAt ? `Revoked ${when(key.revokedAt)}` : when(key.lastUsedAt)}</td>
                <td>
                  {!key.revokedAt && (
                    <button type="button" className="pf-ad-btn pf-ad-btn-danger" onClick={() => revoke(key)}>
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {!keys.length && (
              <tr>
                <td colSpan={4} className="pf-ad-empty">No keys yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
