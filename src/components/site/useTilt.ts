import { useCallback, type PointerEvent } from "react";

// Pointer tilt for cards. Writes CSS custom properties only;
// the stylesheet owns the transform, glare and transitions.
export function useTilt(strength = 7) {
  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      const box = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width;
      const y = (e.clientY - box.top) / box.height;
      const el = e.currentTarget;
      el.style.setProperty("--pf-ry", `${(x - 0.5) * strength}deg`);
      el.style.setProperty("--pf-rx", `${(0.5 - y) * strength}deg`);
      el.style.setProperty("--pf-mx", `${x * 100}%`);
      el.style.setProperty("--pf-my", `${y * 100}%`);
    },
    [strength],
  );

  const onPointerLeave = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--pf-rx", "0deg");
    el.style.setProperty("--pf-ry", "0deg");
  }, []);

  return { onPointerMove, onPointerLeave };
}
