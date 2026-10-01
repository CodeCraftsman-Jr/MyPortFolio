import type { ProductMark as MarkKind } from "@/data/ecosystem";

// One small glyph per product, each drawn from that product's own landing page.
export function ProductMark({ kind }: { kind: MarkKind }) {
  return (
    <svg className="pf-mark" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {kind === "orbit" && (
        <>
          <ellipse cx="28" cy="28" rx="24" ry="9" transform="rotate(-18 28 28)" />
          <ellipse className="pf-mark-soft" cx="28" cy="28" rx="16" ry="6" transform="rotate(-18 28 28)" />
          <circle cx="28" cy="28" r="5" fill="currentColor" />
          <circle cx="49" cy="21" r="3" fill="currentColor" />
          <circle cx="13" cy="33" r="2.2" fill="currentColor" />
        </>
      )}
      {kind === "slices" && (
        <>
          <path d="M8 36 L28 46 L48 36 L28 26 Z" />
          <path className="pf-mark-soft" d="M8 28 L28 38 L48 28 L28 18 Z" />
          <path d="M8 20 L28 30 L48 20 L28 10 Z" fill="currentColor" fillOpacity="0.25" />
        </>
      )}
      {kind === "dial" && (
        <>
          {Array.from({ length: 36 }, (_, i) => {
            const a = (i / 36) * Math.PI * 2 - Math.PI / 2;
            const long = i % 3 === 0;
            const r1 = long ? 15 : 18;
            return (
              <line
                key={i}
                x1={28 + Math.cos(a) * r1}
                y1={28 + Math.sin(a) * r1}
                x2={28 + Math.cos(a) * 23}
                y2={28 + Math.sin(a) * 23}
                className={i > 26 ? "pf-mark-soft" : undefined}
              />
            );
          })}
          <circle cx="28" cy="28" r="3" fill="currentColor" />
        </>
      )}
      {kind === "lcd" && (
        <>
          <rect x="6" y="14" width="44" height="28" rx="5" />
          <path d="M14 22 h6 M14 22 v5 M14 27 h6 M20 27 v6 M14 33 h6" />
          <path d="M25 22 h6 v11 M25 27 h6" />
          <path d="M36 22 h6 v5 h-6 v6 h6" />
          <circle cx="45" cy="36" r="1.4" fill="currentColor" />
        </>
      )}
      {kind === "iso" && (
        <>
          <path d="M28 8 L46 18 L28 28 L10 18 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M10 18 V36 L28 46 V28" />
          <path className="pf-mark-soft" d="M46 18 V36 L28 46" />
        </>
      )}
      {kind === "gauge" && (
        <>
          <path className="pf-mark-soft" d="M11 40 A20 20 0 1 1 45 40" strokeWidth="3" strokeLinecap="round" />
          <path d="M11 40 A20 20 0 0 1 40 13" strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="30" x2="39" y2="18" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="30" r="2.6" fill="currentColor" />
        </>
      )}
      {kind === "pages" && (
        <>
          <rect className="pf-mark-soft" x="18" y="8" width="26" height="32" rx="3" />
          <rect x="12" y="14" width="26" height="32" rx="3" />
          <path d="M18 24 h14 M18 30 h14 M18 36 h9" />
        </>
      )}
    </svg>
  );
}
