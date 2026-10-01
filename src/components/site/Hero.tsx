import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { person } from "@/data/site";
import { products } from "@/data/ecosystem";
import { projects } from "@/data/projects";
import { channels } from "@/data/site";
import { useCalmMotion } from "@/hooks/useMediaQuery";
import { useJump } from "@/lib/jumpTo";

function NameLine({ text, start, dim }: { text: string; start: number; dim?: boolean }) {
  const calm = useCalmMotion();
  return (
    <span className="pf-name-line" aria-hidden="true">
      {text.split("").map((ch, i) =>
        calm ? (
          <span key={i} className={`pf-name-char ${dim ? "pf-name-dim" : ""}`}>
            {ch}
          </span>
        ) : (
          <motion.span
            key={i}
            className={`pf-name-char ${dim ? "pf-name-dim" : ""}`}
            initial={{ y: "105%", rotateX: -70 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: start + i * 0.045 }}
          >
            {ch}
          </motion.span>
        ),
      )}
    </span>
  );
}

const two = (n: number) => String(n).padStart(2, "0");

export function Hero() {
  const jump = useJump();
  const calm = useCalmMotion();

  const readouts = [
    { value: two(products.length), label: "VarSys products" },
    { value: two(projects.length), label: "Client builds" },
    { value: two(channels.length), label: "YouTube channels" },
    { value: "01", label: "Restaurant" },
  ];

  const fadeIn = (delay: number) =>
    calm
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] as const },
        };

  return (
    <section id="home" data-section="home" className="pf-hero" tabIndex={-1} aria-labelledby="pf-hero-name">
      <div className="pf-wrap">
        <div className="pf-hero-inner">
          <motion.p className="pf-label pf-eyebrow" {...fadeIn(0.1)}>
            <span className="pf-led" />
            <span>Available for work</span>
            <span className="pf-eyebrow-tag">VarSys</span>
            <span>{person.coords}</span>
          </motion.p>

          <h1 id="pf-hero-name" className="pf-name">
            <span className="sr-only">Vasanthan E</span>
            <NameLine text="Vasanthan" start={0.15} />
            <NameLine text="E." start={0.6} dim />
          </h1>

          <motion.p className="pf-lead" {...fadeIn(0.9)}>
            Full stack developer and founder of VarSys. I design, build and run a suite of seven products for
            money, households, energy, kitchens and electric rides, on web, Android and Windows. Off-screen I run a
            restaurant and three YouTube channels.
          </motion.p>

          <motion.div className="pf-hero-role" {...fadeIn(1)}>
            <span className="pf-chip">
              <MapPin size={14} aria-hidden="true" />
              {person.place}
            </span>
            <span className="pf-chip">TypeScript, React, Node, PostgreSQL</span>
          </motion.div>

          <motion.div className="pf-hero-cta" {...fadeIn(1.1)}>
            <a
              href="#apps"
              className="pf-btn pf-btn-main"
              onClick={(e) => {
                e.preventDefault();
                jump("apps");
              }}
            >
              See the apps
              <ArrowUpRight className="pf-btn-icon" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="pf-btn"
              onClick={(e) => {
                e.preventDefault();
                jump("contact");
              }}
            >
              Start a project
            </a>
          </motion.div>

          <motion.dl className="pf-readouts" {...fadeIn(1.25)}>
            {readouts.map((r) => (
              <div key={r.label} className="pf-readout">
                <dd className="pf-readout-num m-0">{r.value}</dd>
                <dt className="pf-label">{r.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <div className="pf-scroll-cue pf-label" aria-hidden="true">
        <span className="pf-scroll-line" />
        Scroll to morph
      </div>
    </section>
  );
}
