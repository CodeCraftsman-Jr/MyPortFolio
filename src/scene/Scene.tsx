import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ShapeField } from "./ShapeField";
import { sceneState } from "./sceneState";
import { useTheme } from "@/hooks/useTheme";
import { useCalmMotion, useMediaQuery } from "@/hooks/useMediaQuery";

export default function Scene() {
  const theme = useTheme();
  const calm = useCalmMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  // Points are soft discs, so a 1.5 DPR cap looks the same as native and saves fill rate.
  const cap = wide ? 1.5 : 1.75;
  const count = wide ? 9000 : 4200;

  useEffect(() => {
    if (calm) return;
    const track = (e: PointerEvent) => {
      sceneState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const leave = () => {
      sceneState.pointerX = 0;
      sceneState.pointerY = 0;
    };
    window.addEventListener("pointermove", track, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", track);
      document.removeEventListener("pointerleave", leave);
    };
  }, [calm]);

  return (
    <div className="pf-scene" aria-hidden="true">
      <Canvas
        dpr={[1, cap]}
        frameloop={calm ? "demand" : "always"}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ShapeField count={count} theme={theme} calm={calm} wide={wide} />
      </Canvas>
    </div>
  );
}
