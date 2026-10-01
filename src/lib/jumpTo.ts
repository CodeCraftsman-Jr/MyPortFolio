import { useLenis } from "lenis/react";
import { useCallback } from "react";

// Smooth jump to a section; falls back to the browser when Lenis is off.
export function useJump() {
  const lenis = useLenis();
  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, { offset: id === "home" ? 0 : -56 });
      } else {
        target.scrollIntoView({ block: "start" });
      }
      target.focus({ preventScroll: true });
    },
    [lenis],
  );
}
