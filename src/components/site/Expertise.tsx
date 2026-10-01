import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { expertise } from "@/data/site";
import { products } from "@/data/ecosystem";
import { useSiteStatus } from "@/hooks/useSiteStatus";
import { ProductMark } from "./ProductMark";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { StatusDot } from "./StatusDot";

const byId = new Map(products.map((p) => [p.id, p]));

export function Expertise() {
  const [pick, setPick] = useState(expertise[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const area = expertise.find((e) => e.id === pick) ?? expertise[0];
  const proof = area.proof.map((id) => byId.get(id)).filter((p) => p !== undefined);
  const status = useSiteStatus(products.map((p) => p.url));

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
    setPick(expertise[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section id="expertise" data-section="expertise" className="pf-section" tabIndex={-1} aria-labelledby="expertise-title">
      <div className="pf-wrap">
        <SectionHead id="expertise-title" tag="Expertise" title="What I can build for you">
          Five areas I work in every day. Pick one to see how I approach it and the live products where it already
          runs.
        </SectionHead>

        <Reveal className="pf-panel pf-explore">
          <div className="pf-explore-list" role="tablist" aria-label="Areas of expertise" aria-orientation="vertical">
            {expertise.map((e, i) => (
              <button
                key={e.id}
                ref={(el) => (tabs.current[i] = el)}
                type="button"
                role="tab"
                id={`tab-${e.id}`}
                aria-selected={pick === e.id}
                aria-controls="expertise-panel"
                tabIndex={pick === e.id ? 0 : -1}
                className={`pf-explore-tab ${pick === e.id ? "pf-explore-tab-on" : ""}`}
                onClick={() => setPick(e.id)}
                onKeyDown={(ev) => onKey(ev, i)}
              >
                <span className="pf-explore-tab-title">{e.title}</span>
                <span className="pf-explore-tab-short">{e.short}</span>
              </button>
            ))}
          </div>

          <div
            id="expertise-panel"
            className="pf-explore-panel"
            role="tabpanel"
            aria-labelledby={`tab-${area.id}`}
            key={area.id}
          >
            <h3 className="pf-h3">{area.title}</h3>
            <p className="pf-copy">{area.detail}</p>

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

            <div>
              <p className="pf-label">Proven in</p>
              <ul className="pf-proof">
                {proof.map((p) => (
                  <li key={p.id}>
                    <a
                      className={`pf-proof-link pf-tone-${p.tone}`}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ProductMark kind={p.mark} />
                      <span className="pf-proof-text">
                        <span className="pf-proof-name">{p.name}</span>
                        <span className="pf-proof-host">{p.host}</span>
                      </span>
                      <StatusDot status={status[p.url]} quiet />
                      <ArrowUpRight className="pf-proof-arrow" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
