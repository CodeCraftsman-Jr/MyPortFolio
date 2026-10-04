import { useContent } from "@/content/ContentProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function About() {
  const { site, journey, stack } = useContent();
  const head = site.sections.about;
  return (
    <section id="about" data-section="about" className="pf-section" tabIndex={-1} aria-labelledby="about-title">
      <div className="pf-wrap">
        <SectionHead id="about-title" tag={head.tag} title={site.aboutTitle || head.title} />

        <div className="pf-about">
          <Reveal className="pf-about-side">
            <figure className="pf-panel pf-portrait m-0">
              <img src={site.portraitUrl || "/vasanthan-e.jpg"} alt={`Portrait of ${site.name}`} width={480} height={600} loading="lazy" decoding="async" />
              <figcaption className="pf-portrait-cap">
                <span className="pf-portrait-name">{site.name}</span>
                <span className="pf-label">{site.role}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="pf-about-main">
            <Reveal>
              <p className="pf-lead m-0">{site.aboutText}</p>
            </Reveal>

            <ol className="pf-line-list">
              {journey.map((stop, i) => (
                <Reveal as="li" key={`${stop.when}-${stop.title}`} delay={i * 0.04} className={`pf-stop ${i === 0 ? "pf-stop-now" : ""}`}>
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
              {stack.map((g) => (
                <div key={g.label} className="pf-stack-col">
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
