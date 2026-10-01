import { useEffect, useRef } from "react";
import { sections, useActiveSection } from "@/lib/activeSection";

// Scroll readout styled after the EV Hub speedometer.
// Scroll progress is the one runtime scalar here: it is written as --pf-gauge.
export function HudGauge() {
  const dial = useRef<SVGSVGElement>(null);
  const active = useActiveSection();
  const index = sections.findIndex((s) => s.id === active);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const room = document.documentElement.scrollHeight - window.innerHeight;
      const value = room > 0 ? Math.min(1, Math.max(0, window.scrollY / room)) : 0;
      dial.current?.style.setProperty("--pf-gauge", value.toFixed(4));
    };
    const ask = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", ask, { passive: true });
    window.addEventListener("resize", ask);
    return () => {
      window.removeEventListener("scroll", ask);
      window.removeEventListener("resize", ask);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`pf-hud ${active === "home" ? "pf-hud-home" : ""}`} aria-hidden="true">
      <svg ref={dial} className="pf-hud-dial" viewBox="0 0 44 44">
        <path className="pf-hud-track" d="M8.1 32 A16 16 0 1 1 35.9 32" pathLength={100} />
        <path className="pf-hud-fill" d="M8.1 32 A16 16 0 1 1 35.9 32" pathLength={100} />
        <line className="pf-hud-needle" x1="22" y1="24" x2="22" y2="12" />
      </svg>
      <div className="pf-hud-text">
        <div className="pf-hud-num">
          SEC {String(index + 1).padStart(2, "0")}/{String(sections.length).padStart(2, "0")}
        </div>
        <div className="pf-hud-name">{sections[index]?.label}</div>
      </div>
    </div>
  );
}
