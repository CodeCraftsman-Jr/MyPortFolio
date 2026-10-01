import portrait from "@/assets/profile-photo-1.JPG";
import { journey, person, stackGroups } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" data-section="about" className="pf-section" tabIndex={-1} aria-labelledby="about-title">
      <div className="pf-wrap">
        <SectionHead id="about-title" tag="About" title="Engineer first, founder by necessity" />

        <div className="pf-about">
          <Reveal className="pf-about-side">
            <figure className="pf-panel pf-portrait m-0">
              <img src={portrait} alt="Portrait of Vasanthan E" width={480} height={600} loading="lazy" decoding="async" />
              <figcaption className="pf-portrait-cap">
                <span className="pf-portrait-name">{person.name}</span>
                <span className="pf-label">{person.role}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="pf-about-main">
            <Reveal>
              <p className="pf-lead m-0">
                I started VarSys to solve problems I had at home and in my own restaurant, and kept building until the
                tools were good enough for other people. Today I work with clients the same way: understand the real
                workflow, ship a usable first version early, and stay on to run it.
              </p>
            </Reveal>

            <ol className="pf-line-list">
              {journey.map((stop, i) => (
                <Reveal as="li" key={stop.id} delay={i * 0.04} className={`pf-stop ${i === 0 ? "pf-stop-now" : ""}`}>
                  <div className="pf-stop-head">
                    <h3 className="pf-stop-title">{stop.title}</h3>
                    <span className="pf-label">{stop.when}</span>
                  </div>
                  <p className="pf-stop-place">{stop.place}</p>
                  <p className="pf-stop-note">{stop.note}</p>
                </Reveal>
              ))}
            </ol>

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
          </div>
        </div>
      </div>
    </section>
  );
}
