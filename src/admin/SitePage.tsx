import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { SITE_GROUPS } from "@shared/portfolio";
import defaults from "@shared/defaults.json";
import { adminApi } from "./adminApi";
import { FieldInput, readPath, writePath } from "./FieldInput";

type Data = Record<string, unknown>;

/** The one site record (profile, hero, about, contact, section headings), edited in groups. */
export function SitePage() {
  const [site, setSite] = useState<Data | null>(null);
  const [group, setGroup] = useState(SITE_GROUPS[0].id);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    adminApi
      .getSite()
      .then(({ site: stored }) => {
        setEmpty(!stored);
        setSite(structuredClone((stored ?? defaults.site) as Data));
      })
      .catch((err) => setError((err as Error).message));
  }, []);

  const save = async () => {
    if (!site) return;
    setBusy(true);
    setError("");
    setNote("");
    try {
      const { site: saved } = await adminApi.saveSite(site);
      setSite(structuredClone(saved as unknown as Data));
      setDirty(false);
      setEmpty(false);
      setNote("Saved. The live site shows it within a minute.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const active = SITE_GROUPS.find((g) => g.id === group) ?? SITE_GROUPS[0];

  return (
    <div className="pf-ad-page">
      <section className="pf-ad-pane pf-ad-pane-on pf-ad-single" aria-label="Site settings">
        <div className="pf-ad-pane-head">
          <div className="pf-ad-group-tabs" role="tablist" aria-label="Site groups">
            {SITE_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={g.id === group}
                className={`pf-ad-group-tab ${g.id === group ? "pf-ad-group-tab-on" : ""}`}
                onClick={() => setGroup(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <button type="button" className="pf-ad-btn pf-ad-btn-main" onClick={save} disabled={busy || !site || (!dirty && !empty)}>
            <Save size={14} aria-hidden="true" />
            {busy ? "Saving" : empty ? "Publish site" : "Save"}
          </button>
        </div>
        {empty && <p className="pf-ad-note">No site record yet: these are the built-in defaults. Save to publish them.</p>}
        {error && <p className="pf-ad-error" role="alert">{error}</p>}
        {note && <p className="pf-ad-note" role="status">{note}</p>}
        {site && (
          <div className="pf-ad-form">
            {active.fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                value={readPath(site, field.key)}
                onChange={(value) => {
                  setSite((s) => writePath(s ?? {}, field.key, value));
                  setDirty(true);
                  setNote("");
                }}
                idPrefix="site"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
