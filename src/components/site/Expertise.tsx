import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@shared/portfolio";
import { useContent } from "@/content/ContentProvider";
import { useSiteStatus } from "@/hooks/useSiteStatus";
import { ProductMark } from "./ProductMark";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { StatusDot } from "./StatusDot";

export function Expertise() {
  const { site, expertise, products } = useContent();
  const [pick, setPick] = useState<string | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const status = useSiteStatus(products.map((p) => p.url).filter(Boolean));
  const head = site.sections.expertise;

  if (!expertise.length) return null;
  const area = expertise.find((e) => e.slug === pick) ?? expertise[0];
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const proof = area.proof.map((slug) => bySlug.get(slug)).filter((p): p is Product => p !== undefined);

  // Arrow keys move between areas, as in any tab list.
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = expertise.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? index === last ? 0 : index + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? index === 0 ? last : index - 1
          : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setPick(expertise[next].slug);
    tabs.current[next]?.focus();
  };

  return (
    <section id="expertise" data-section="expertise" className="pf-section" tabIndex={-1} aria-labelledby="expertise-title">
      <div className="pf-wrap">
        <SectionHead id="expertise-title" tag={head.tag} title={head.title}>
          {head.lead}
        </SectionHead>

        <Reveal className="pf-panel pf-explore">
          <div className="pf-explore-list" role="tablist" aria-label="Areas of expertise" aria-orientation="vertical">
            {expertise.map((e, i) => (
              <button
                key={e.slug}
                ref={(el) => (tabs.current[i] = el)}
                type="button"
                role="tab"
                id={`tab-${e.slug}`}
                aria-selected={area.slug === e.slug}
                aria-controls="expertise-panel"
                tabIndex={area.slug === e.slug ? 0 : -1}
                className={`pf-explore-tab ${area.slug === e.slug ? "pf-explore-tab-on" : ""}`}
                onClick={() => setPick(e.slug)}
                onKeyDown={(ev) => onKey(ev, i)}
              >
                <span className="pf-explore-tab-title">{e.title}</span>
                <span className="pf-explore-tab-short">{e.short}</span>
              </button>
            ))}
          </div>

          <div id="expertise-panel" className="pf-explore-panel" role="tabpanel" aria-labelledby={`tab-${area.slug}`} key={area.slug}>
            <h3 className="pf-h3">{area.title}</h3>
            <p className="pf-copy">{area.detail}</p>

            {area.skills.length > 0 && (
              <div>
                <p className="pf-label">Skills used</p>
                <ul className="pf-chips">
                  {area.skills.map((s) => (
                    <li key={s} className="pf-chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {proof.length > 0 && (
              <div>
                <p className="pf-label">Proven in</p>
                <ul className="pf-proof">
                  {proof.map((p) => (
                    <li key={p.slug}>
                      <a className={`pf-proof-link pf-tone-${p.tone}`} href={p.url} target="_blank" rel="noopener noreferrer">
                        <ProductMark kind={p.mark} />
                        <span className="pf-proof-text">
                          <span className="pf-proof-name">{p.name}</span>
                          <span className="pf-proof-host">{p.host}</span>
                        </span>
                        <StatusDot status={status[p.url] ?? "checking"} quiet />
                        <ArrowUpRight className="pf-proof-arrow" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
