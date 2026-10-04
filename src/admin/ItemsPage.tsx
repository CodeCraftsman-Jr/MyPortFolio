import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Save, Trash2 } from "lucide-react";
import { KIND_INFO, type ItemDto, type Kind } from "@shared/portfolio";
import { adminApi } from "./adminApi";
import { FieldInput, readPath, writePath, type Choice } from "./FieldInput";

type Data = Record<string, unknown>;

interface ItemsPageProps {
  kind: Kind;
  canDelete: boolean;
}

export function ItemsPage({ kind, canDelete }: ItemsPageProps) {
  const info = KIND_INFO[kind];
  const [rows, setRows] = useState<ItemDto[]>([]);
  const [pick, setPick] = useState<number | "new" | null>(null);
  const [draft, setDraft] = useState<Data>({});
  const [published, setPublished] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [pane, setPane] = useState<"list" | "edit">("list");
  const [products, setProducts] = useState<Choice[]>([]);
  const needsProducts = info.fields.some((f) => f.type === "products");

  const load = useCallback(async () => {
    setError("");
    try {
      setRows(await adminApi.listItems(kind));
    } catch (err) {
      setError((err as Error).message);
    }
  }, [kind]);

  useEffect(() => {
    setPick(null);
    setDraft({});
    setDirty(false);
    setNote("");
    setPane("list");
    void load();
  }, [kind, load]);

  useEffect(() => {
    if (!needsProducts) return;
    adminApi
      .listItems("products")
      .then((list) => setProducts(list.map((p) => ({ value: String(p.data.slug ?? ""), label: String(p.data.name ?? p.data.slug) }))))
      .catch(() => setProducts([]));
  }, [needsProducts]);

  const current = useMemo(() => (typeof pick === "number" ? rows.find((r) => r.id === pick) : undefined), [pick, rows]);

  const open = (next: number | "new") => {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setPick(next);
    const row = typeof next === "number" ? rows.find((r) => r.id === next) : undefined;
    setDraft(row ? structuredClone(row.data) : {});
    setPublished(row ? row.published : true);
    setDirty(false);
    setError("");
    setNote("");
    setPane("edit");
  };

  const save = async () => {
    setBusy(true);
    setError("");
    setNote("");
    try {
      const saved = pick === "new" ? await adminApi.addItem(kind, draft, published) : await adminApi.changeItem(kind, pick as number, { data: draft, published });
      await load();
      setPick(saved.id);
      setDraft(structuredClone(saved.data));
      setDirty(false);
      setNote("Saved. The live site shows it within a minute.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!current || !window.confirm(`Delete "${info.title(current.data)}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await adminApi.deleteItem(kind, current.id);
      setPick(null);
      setDraft({});
      setDirty(false);
      setPane("list");
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const move = async (index: number, by: number) => {
    const target = index + by;
    if (target < 0 || target >= rows.length) return;
    const ids = rows.map((r) => r.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    try {
      setRows(await adminApi.reorder(kind, ids));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="pf-ad-page">
      <div className="pf-ad-subtabs" role="tablist" aria-label="Pane">
        <button type="button" role="tab" aria-selected={pane === "list"} className={pane === "list" ? "pf-ad-subtab-on" : ""} onClick={() => setPane("list")}>
          {info.label} ({rows.length})
        </button>
        <button type="button" role="tab" aria-selected={pane === "edit"} className={pane === "edit" ? "pf-ad-subtab-on" : ""} onClick={() => setPane("edit")} disabled={pick === null}>
          Editor
        </button>
      </div>

      <div className="pf-ad-split">
        <section className={`pf-ad-pane pf-ad-list-pane ${pane === "list" ? "pf-ad-pane-on" : ""}`} aria-label={`${info.label} list`}>
          <div className="pf-ad-pane-head">
            <h2 className="pf-ad-pane-title">{info.label}</h2>
            <button type="button" className="pf-ad-btn pf-ad-btn-main" onClick={() => open("new")}>
              <Plus size={14} aria-hidden="true" />
              Add
            </button>
          </div>
          <ul className="pf-ad-list">
            {rows.map((row, i) => (
              <li key={row.id} className={`pf-ad-list-row ${pick === row.id ? "pf-ad-list-row-on" : ""}`}>
                <button type="button" className="pf-ad-list-open" onClick={() => open(row.id)}>
                  <span className="pf-ad-list-title">{info.title(row.data)}</span>
                  {!row.published && <span className="pf-ad-badge">Hidden</span>}
                </button>
                <span className="pf-ad-list-tools">
                  <button type="button" className="pf-ad-icon" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${info.title(row.data)} up`}>
                    <ArrowUp size={14} />
                  </button>
                  <button type="button" className="pf-ad-icon" onClick={() => move(i, 1)} disabled={i === rows.length - 1} aria-label={`Move ${info.title(row.data)} down`}>
                    <ArrowDown size={14} />
                  </button>
                </span>
              </li>
            ))}
            {!rows.length && !error && <li className="pf-ad-empty">Nothing here yet. Use Add to create the first one.</li>}
          </ul>
        </section>

        <section className={`pf-ad-pane pf-ad-edit-pane ${pane === "edit" ? "pf-ad-pane-on" : ""}`} aria-label="Editor">
          {pick === null ? (
            <div className="pf-ad-empty pf-ad-empty-big">Pick an item on the left, or Add a new one.</div>
          ) : (
            <>
              <div className="pf-ad-pane-head">
                <h2 className="pf-ad-pane-title">{pick === "new" ? `New ${info.label.toLowerCase()} item` : info.title(draft)}</h2>
                <div className="pf-ad-head-tools">
                  <button type="button" className="pf-ad-btn" onClick={() => { setPublished(!published); setDirty(true); }} aria-pressed={!published}>
                    {published ? <Eye size={14} aria-hidden="true" /> : <EyeOff size={14} aria-hidden="true" />}
                    {published ? "Shown on site" : "Hidden"}
                  </button>
                  {canDelete && current && (
                    <button type="button" className="pf-ad-btn pf-ad-btn-danger" onClick={remove} disabled={busy}>
                      <Trash2 size={14} aria-hidden="true" />
                      Delete
                    </button>
                  )}
                  <button type="button" className="pf-ad-btn pf-ad-btn-main" onClick={save} disabled={busy || (!dirty && pick !== "new")}>
                    <Save size={14} aria-hidden="true" />
                    {busy ? "Saving" : "Save"}
                  </button>
                </div>
              </div>
              {error && <p className="pf-ad-error" role="alert">{error}</p>}
              {note && <p className="pf-ad-note" role="status">{note}</p>}
              <div className="pf-ad-form">
                {info.fields.map((field) => (
                  <FieldInput
                    key={field.key}
                    field={field}
                    value={readPath(draft, field.key)}
                    onChange={(value) => {
                      setDraft((d) => writePath(d, field.key, value));
                      setDirty(true);
                      setNote("");
                    }}
                    products={products}
                    idPrefix={`${kind}-${pick}`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
