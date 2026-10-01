import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import type { Product } from "@shared/portfolio";
import { useContent } from "@/content/ContentProvider";
import { audiences, getScope } from "@/lib/planScope";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

const unique = <T,>(list: T[]) => [...new Set(list)];

// Interactive brief builder: the visitor picks what they need and gets a
// plain summary of the approach, which can be sent or copied as a brief.
export function Planner() {
  const { site, needs, process, products } = useContent();
  const [picked, setPicked] = useState<string[]>(["webapp", "admin"]);
  const head = site.sections.plan;
  const [audience, setAudience] = useState("customers");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const plan = useMemo(() => {
    const chosen = needs.filter((n) => picked.includes(n.slug));
    const bySlug = new Map(products.map((p) => [p.slug, p]));
    return {
      chosen,
      scope: getScope(chosen.reduce((sum, n) => sum + n.weight, 0)),
      stack: unique(chosen.flatMap((n) => n.stack)),
      deliver: unique(chosen.flatMap((n) => n.deliver)),
      proof: unique(chosen.flatMap((n) => n.proof))
        .map((slug) => bySlug.get(slug))
        .filter((p): p is Product => p !== undefined)
        .slice(0, 4),
    };
  }, [picked, needs, products]);

  const toggle = (id: string) => {
    setCopied(false);
    setPicked((now) => (now.includes(id) ? now.filter((x) => x !== id) : [...now, id]));
  };

  const brief = [
    "Project brief",
    "",
    `For: ${audiences.find((a) => a.id === audience)?.label}`,
    `Needs: ${plan.chosen.map((n) => n.label).join(", ") || "-"}`,
    `Scope: ${plan.scope.label}`,
    "",
    "First version:",
    ...plan.deliver.map((d) => `- ${d}`),
    "",
    note.trim() ? `Notes: ${note.trim()}` : "",
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Project brief from the portfolio")}&body=${encodeURIComponent(brief)}`;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const nothing = plan.chosen.length === 0;

  return (
    <section id="plan" data-section="plan" className="pf-section" tabIndex={-1} aria-labelledby="plan-title">
      <div className="pf-wrap">
        <SectionHead id="plan-title" tag={head.tag} title={head.title}>
          {head.lead}
        </SectionHead>

        <Reveal>
          <ol className="pf-steps">
            {process.map((step, i) => (
              <li key={step.title} className="pf-step">
                <span className="pf-step-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="pf-step-title">{step.title}</span>
                <span className="pf-step-text">{step.text}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="pf-plan">
          <div className="pf-panel pf-plan-form">
            <fieldset className="pf-fieldset">
              <legend className="pf-label">What do you need?</legend>
              <div className="pf-needs">
                {needs.map((n) => {
                  const on = picked.includes(n.slug);
                  return (
                    <button
                      key={n.slug}
                      type="button"
                      className={`pf-need ${on ? "pf-need-on" : ""}`}
                      aria-pressed={on}
                      onClick={() => toggle(n.slug)}
                    >
                      <span className="pf-need-box" aria-hidden="true">
                        {on && <Check size={13} />}
                      </span>
                      <span>
                        <span className="pf-need-label">{n.label}</span>
                        <span className="pf-need-hint">{n.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="pf-fieldset">
              <legend className="pf-label">Who will use it?</legend>
              <div className="pf-segment" role="radiogroup" aria-label="Who will use it">
                {audiences.map((a) => (
                  <label key={a.id} className={`pf-segment-item ${audience === a.id ? "pf-segment-on" : ""}`}>
                    <input
                      type="radio"
                      name="audience"
                      value={a.id}
                      checked={audience === a.id}
                      onChange={() => {
                        setAudience(a.id);
                        setCopied(false);
                      }}
                      className="sr-only"
                    />
                    {a.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="pf-field">
              <label className="pf-label" htmlFor="pf-plan-note">
                Anything else (optional)
              </label>
              <textarea
                id="pf-plan-note"
                className="pf-input pf-input-area"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  setCopied(false);
                }}
                placeholder="Deadline, current tools, number of users..."
              />
            </div>
          </div>

          <aside className="pf-panel pf-plan-out" aria-live="polite" aria-label="Your project summary">
            {nothing ? (
              <div className="pf-plan-empty">
                <p className="pf-h3">Pick at least one need</p>
                <p className="pf-copy">Your summary and suggested approach will appear here.</p>
              </div>
            ) : (
              <>
                <div className="pf-plan-scope">
                  <p className="pf-label">Scope</p>
                  <p className="pf-plan-scope-name">{plan.scope.label}</p>
                  <p className="pf-copy m-0">{plan.scope.text}</p>
                </div>

                <div>
                  <p className="pf-label">First version includes</p>
                  <ul className="pf-ticks">
                    {plan.deliver.map((d) => (
                      <li key={d} className="pf-tick">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="pf-label">Suggested stack</p>
                  <ul className="pf-chips">
                    {plan.stack.map((s) => (
                      <li key={s} className="pf-chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="pf-label">Similar live work</p>
                  <ul className="pf-plan-proof">
                    {plan.proof.map((p) => (
                      <li key={p.slug}>
                        <a className="pf-link" href={p.url} target="_blank" rel="noopener noreferrer">
                          {p.name}
                          <ArrowUpRight size={13} aria-hidden="true" className="inline align-baseline" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pf-hero-cta">
                  <a className="pf-btn pf-btn-main" href={mailto}>
                    <Mail size={16} aria-hidden="true" />
                    Send this brief
                  </a>
                  <button type="button" className="pf-btn" onClick={copyBrief}>
                    {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    {copied ? "Brief copied" : "Copy brief"}
                  </button>
                </div>
                <p className="pf-form-note">Opens your mail app with the brief filled in. Nothing is sent until you press send.</p>
              </>
            )}
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
