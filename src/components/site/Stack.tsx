import { stackGroups } from "@/data/site";
import { skillsData } from "@/data/skills";
import { Reveal } from "./Reveal";

function Meter({ value }: { value: number }) {
  const lit = Math.round(value / 10);
  return (
    <div className="pf-meter" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className={`pf-meter-step ${i < lit ? "pf-meter-step-on" : ""}`} />
      ))}
    </div>
  );
}

export function Stack() {
  return (
    <section id="stack" data-section="stack" className="pf-section" tabIndex={-1} aria-labelledby="stack-title">
      <div className="pf-wrap">
        <Reveal className="pf-head">
          <p className="pf-label pf-eyebrow">
            <span className="pf-eyebrow-tag">Tools</span> Stack
          </p>
          <h2 id="stack-title" className="pf-h2">
            Front to back,
            <br />
            <span className="pf-h2-soft">and the server too.</span>
          </h2>
          <p className="pf-lead">
            I write the interface, the API and the database rules, then deploy and run them on my own VPS.
          </p>
        </Reveal>

        <Reveal className="pf-stack">
          {stackGroups.map((g) => (
            <div key={g.id} className="pf-stack-col">
              <h3 className="pf-label pf-label-accent m-0">{g.label}</h3>
              <ul className="pf-stack-items">
                {g.items.map((item) => (
                  <li key={item} className="pf-stack-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <Reveal className="pf-meters">
          {skillsData.map((s) => (
            <div key={s.id}>
              <div className="pf-meter-head">
                <span>{s.name}</span>
                <span>
                  {s.yearsOfExperience} yr / {s.proficiency}
                </span>
              </div>
              <Meter value={s.proficiency} />
              <span className="sr-only">
                {s.name}: {s.proficiency} out of 100, {s.yearsOfExperience} years
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
