import { lazy, Suspense, useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { TopBar } from "@/components/site/TopBar";
import { HudGauge } from "@/components/site/HudGauge";
import { Hero } from "@/components/site/Hero";
import { Ecosystem } from "@/components/site/Ecosystem";
import { Work } from "@/components/site/Work";
import { Journey } from "@/components/site/Journey";
import { Stack } from "@/components/site/Stack";
import { Beyond } from "@/components/site/Beyond";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { sections, setActive, type SectionId } from "@/lib/activeSection";
import { setStage } from "@/scene/sceneState";
import { useCalmMotion } from "@/hooks/useMediaQuery";

const Scene = lazy(() => import("@/scene/Scene"));

function webglWorks() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Watches which section crosses the middle of the screen and tells
// the scene which shape to morph into.
function useSectionWatch() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-section]");
    const watch = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("data-section") as SectionId;
          const found = sections.find((s) => s.id === id);
          if (!found) continue;
          setActive(found.id);
          setStage(found.stage);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    nodes.forEach((n) => watch.observe(n));

    // The last section is short and may never reach the middle line.
    const last = sections[sections.length - 1];
    const checkEnd = () => {
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (!atEnd) return;
      setActive(last.id);
      setStage(last.stage);
    };
    window.addEventListener("scroll", checkEnd, { passive: true });
    return () => {
      watch.disconnect();
      window.removeEventListener("scroll", checkEnd);
    };
  }, []);
}

const Index = () => {
  const calm = useCalmMotion();
  const [showScene, setShowScene] = useState(false);
  useSectionWatch();

  useEffect(() => {
    if (!webglWorks()) return;
    // Let the text paint first, then bring in three.js.
    const start = () => setShowScene(true);
    const idle = window.requestIdleCallback?.(start, { timeout: 900 });
    const timer = idle === undefined ? window.setTimeout(start, 300) : undefined;
    return () => {
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const page = (
    <>
      <a className="pf-skip" href="#main">
        Skip to content
      </a>
      <div className="pf-backdrop" aria-hidden="true" />
      {showScene && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
      <div className="pf-grain" aria-hidden="true" />
      <TopBar />
      <div className="pf-page">
        <main id="main">
          <Hero />
          <Ecosystem />
          <Work />
          <Journey />
          <Stack />
          <Beyond />
          <Contact />
        </main>
        <SiteFooter />
      </div>
      <HudGauge />
    </>
  );

  if (calm) return page;
  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1 }}>
      {page}
    </ReactLenis>
  );
};

export default Index;
