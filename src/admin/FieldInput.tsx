import { useState, type KeyboardEvent } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2, X } from "lucide-react";
import type { Field } from "@shared/portfolio";

type Data = Record<string, unknown>;

/** Reads "sections.products.title" style keys. */
export const readPath = (data: Data, key: string): unknown =>
  key.split(".").reduce<unknown>((value, part) => (value && typeof value === "object" ? (value as Data)[part] : undefined), data);

/** Writes a dotted key, copying each level so React sees a new object. */
export const writePath = (data: Data, key: string, value: unknown): Data => {
  const [head, ...rest] = key.split(".");
  if (!rest.length) return { ...data, [head]: value };
  const inner = (data[head] && typeof data[head] === "object" ? data[head] : {}) as Data;
  return { ...data, [head]: writePath(inner, rest.join("."), value) };
};

export interface Choice { value: string; label: string }

interface FieldInputProps {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
  /** Options for "products" fields: product slugs with their names. */
  products?: Choice[];
  idPrefix: string;
}

function WordList({ value, onChange, id, options }: { value: string[]; onChange: (v: string[]) => void; id: string; options?: Choice[] }) {
  const [draft, setDraft] = useState("");
  const labelOf = (v: string) => options?.find((o) => o.value === v)?.label ?? v;
  const add = (word: string) => {
    const clean = word.trim();
    if (clean && !value.includes(clean)) onChange([...value, clean]);
    setDraft("");
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };
  const left = options?.filter((o) => !value.includes(o.value)) ?? [];

  return (
    <div className="pf-ad-words">
      <ul className="pf-ad-tags">
        {value.map((word) => (
          <li key={word} className="pf-ad-tag">
            {labelOf(word)}
            <button type="button" className="pf-ad-tag-x" onClick={() => onChange(value.filter((w) => w !== word))} aria-label={`Remove ${labelOf(word)}`}>
              <X size={12} />
            </button>
          </li>
        ))}
      </ul>
      {options ? (
        left.length > 0 && (
          <select
            id={id}
            className="pf-ad-input"
            value=""
            onChange={(e) => {
              if (e.target.value) add(e.target.value);
            }}
          >
            <option value="">Add a product...</option>
            {left.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )
      ) : (
        <input
          id={id}
          className="pf-ad-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          onBlur={() => add(draft)}
          placeholder="Type and press Enter"
        />
      )}
    </div>
  );
}

function RowList({ field, value, onChange, idPrefix }: { field: Field; value: Data[]; onChange: (v: Data[]) => void; idPrefix: string }) {
  const columns = field.columns ?? [];
  const blank = () => Object.fromEntries(columns.map((col) => [col.key, col.type === "choice" ? col.options?.[0] ?? "" : ""]));
  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    const [row] = next.splice(from, 1);
    next.splice(to, 0, row);
    onChange(next);
  };
  return (
    <div className="pf-ad-rows">
      {value.map((row, i) => (
        <div key={i} className="pf-ad-row">
          <div className="pf-ad-row-fields">
            {columns.map((col) => (
              <label key={col.key} className="pf-ad-field">
                <span className="pf-ad-label">{col.label}</span>
                <FieldControl
                  field={col}
                  value={row[col.key]}
                  onChange={(v) => onChange(value.map((r, j) => (j === i ? { ...r, [col.key]: v } : r)))}
                  idPrefix={`${idPrefix}-${i}`}
                />
              </label>
            ))}
          </div>
          <div className="pf-ad-row-tools">
            <button type="button" className="pf-ad-icon" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label="Move up">
              <ArrowUp size={14} />
            </button>
            <button type="button" className="pf-ad-icon" onClick={() => move(i, i + 1)} disabled={i === value.length - 1} aria-label="Move down">
              <ArrowDown size={14} />
            </button>
            <button type="button" className="pf-ad-icon pf-ad-icon-danger" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove row">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="pf-ad-btn" onClick={() => onChange([...value, blank()])}>
        <Plus size={14} aria-hidden="true" />
        Add {field.label.toLowerCase()}
      </button>
    </div>
  );
}

/** The bare control for one field (no label). */
function FieldControl({ field, value, onChange, products, idPrefix }: FieldInputProps) {
  const id = `${idPrefix}-${field.key}`;
  switch (field.type) {
    case "area":
      return <textarea id={id} className="pf-ad-input pf-ad-area" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
    case "toggle":
      return (
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          className={`pf-ad-switch ${value ? "pf-ad-switch-on" : ""}`}
          onClick={() => onChange(!value)}
        >
          <span className="pf-ad-switch-knob" />
          <span className="sr-only">{field.label}</span>
        </button>
      );
    case "number":
      return <input id={id} type="number" className="pf-ad-input" value={value === undefined ? "" : Number(value)} onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))} />;
    case "choice":
      return (
        <select id={id} className="pf-ad-input" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "words":
      return <WordList id={id} value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} />;
    case "products":
      return <WordList id={id} value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} options={products ?? []} />;
    case "rows":
      return <RowList field={field} value={Array.isArray(value) ? (value as Data[]) : []} onChange={onChange} idPrefix={id} />;
    case "url":
      return <input id={id} type="url" inputMode="url" className="pf-ad-input" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder="https://" />;
    default:
      return <input id={id} className="pf-ad-input" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
  }
}

/** A labelled field, laid out for the editor pane. */
export function FieldInput(props: FieldInputProps) {
  const { field, idPrefix } = props;
  const id = `${idPrefix}-${field.key}`;
  const wide = field.type === "area" || field.type === "rows" || field.type === "words" || field.type === "products";
  return (
    <div className={`pf-ad-field ${wide ? "pf-ad-field-wide" : ""}`}>
      <label className="pf-ad-label" htmlFor={id}>
        {field.label}
      </label>
      <FieldControl {...props} />
      {field.hint && <p className="pf-ad-hint">{field.hint}</p>}
    </div>
  );
}
