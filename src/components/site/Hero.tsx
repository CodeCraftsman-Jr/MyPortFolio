import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useContent } from "@/content/ContentProvider";
import { useCalmMotion } from "@/hooks/useMediaQuery";
import { useJump } from "@/lib/jumpTo";

const two = (n: number) => String(n).padStart(2, "0");

export function Hero() {
  const { site, products, projects } = useContent();
  const jump = useJump();
  const calm = useCalmMotion();

  const facts = [
    { value: two(products.length), label: "Live products" },
    { value: "03", label: "Platforms: web, Android, Windows" },
    { value: two(projects.length), label: "Client builds" },
    { value: "01", label: "Self-run infrastructure" },
  ];

  const rise = (delay: number) =>
    calm
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] as const },
        };

  return (
    <section id="home" data-section="home" className="pf-hero" tabIndex={-1} aria-labelledby="pf-hero-title">
      <div className="pf-wrap">
        <div className="pf-hero-inner">
          <motion.p className="pf-label pf-eyebrow" {...rise(0.05)}>
            {site.available && (
              <>
                <span className="pf-led" />
                <span>{site.availableText || "Taking new projects"}</span>
                <span className="pf-eyebrow-sep" aria-hidden="true" />
              </>
            )}
            <span className="pf-eyebrow-place">
              <MapPin size={12} aria-hidden="true" />
              {site.place}
            </span>
          </motion.p>

          <motion.div {...rise(0.12)}>
            <p className="pf-hero-name">{site.name}</p>
            <h1 id="pf-hero-title" className="pf-hero-title">
              {site.heroTitle} {site.heroAccent && <span className="pf-hero-accent">{site.heroAccent}</span>}
            </h1>
          </motion.div>

          {site.heroLead && (
            <motion.p className="pf-lead" {...rise(0.22)}>
              {site.heroLead}
            </motion.p>
          )}

          <motion.div className="pf-hero-cta" {...rise(0.3)}>
            <a
              href="#plan"
              className="pf-btn pf-btn-main"
              onClick={(e) => {
                e.preventDefault();
                jump("plan");
              }}
            >
              Plan a project
              <ArrowRight className="pf-btn-icon" aria-hidden="true" />
            </a>
            <a
              href="#products"
              className="pf-btn"
              onClick={(e) => {
                e.preventDefault();
                jump("products");
              }}
            >
              See live products
            </a>
          </motion.div>

          <motion.dl className="pf-facts" {...rise(0.4)}>
            {facts.map((f) => (
              <div key={f.label} className="pf-fact">
                <dd className="pf-fact-num">{f.value}</dd>
                <dt className="pf-fact-label">{f.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
