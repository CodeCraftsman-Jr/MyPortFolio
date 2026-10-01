import portrait from "@/assets/profile-photo-1.JPG";
import { journey, person } from "@/data/site";
import { Reveal } from "./Reveal";
import { useTilt } from "./useTilt";

export function Journey() {
  const tilt = useTilt(6);
  return (
    <section id="journey" data-section="journey" className="pf-section" tabIndex={-1} aria-labelledby="journey-title">
      <div className="pf-wrap pf-journey">
        <Reveal className="pf-head">
          <p className="pf-label pf-eyebrow">
            <span className="pf-eyebrow-tag">2019 - now</span> Journey
          </p>
          <h2 id="journey-title" className="pf-h2">
            School,
            <br />
            clients,
            <br />
            <span className="pf-h2-soft">company.</span>
          </h2>
          <p className="pf-copy">
            Kendriya Vidyalaya to an engineering degree, a Python internship, freelance work, and then VarSys. In
            that order, and mostly at the same time.
          </p>
          <figure className="pf-panel pf-tilt pf-portrait m-0" {...tilt}>
            <img src={portrait} alt="Portrait of Vasanthan E" width={480} height={600} loading="lazy" decoding="async" />
            <figcaption className="pf-portrait-cap">
              <span className="pf-label pf-label-accent">ID / Founder</span>
              <span className="pf-portrait-name">{person.name}</span>
            </figcaption>
          </figure>
        </Reveal>

        <ol className="pf-line-list">
          {journey.map((stop, i) => (
            <Reveal
              as="li"
              key={stop.id}
              delay={i * 0.05}
              className={`pf-panel pf-stop ${i === journey.length - 1 ? "pf-stop-now" : ""}`}
            >
              <div className="pf-stop-head">
                <h3 className="pf-h3">{stop.title}</h3>
                <span className="pf-label pf-label-accent">{stop.when}</span>
              </div>
              <p className="pf-stop-place">{stop.place}</p>
              <p className="pf-stop-note">{stop.note}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
