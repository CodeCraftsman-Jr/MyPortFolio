import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { makeShapes } from "./makeShapes";
import { onStageChange, sceneState } from "./sceneState";
import type { Theme } from "@/hooks/useTheme";

const vertex = /* glsl */ `
  attribute vec3 aShape0;
  attribute vec3 aShape1;
  attribute vec3 aShape2;
  attribute vec3 aShape3;
  attribute vec3 aShape4;
  attribute float aSeed;

  uniform float uTime;
  uniform float uStage;
  uniform float uSize;
  uniform float uMotion;
  uniform vec2 uPointer;

  varying float vSeed;
  varying float vGlow;

  vec3 pickShape(float k) {
    if (k < 0.5) return aShape0;
    if (k < 1.5) return aShape1;
    if (k < 2.5) return aShape2;
    if (k < 3.5) return aShape3;
    return aShape4;
  }

  void main() {
    float stage = clamp(uStage, 0.0, 4.0);
    float base = floor(stage);
    float part = stage - base;
    float delay = aSeed * 0.45;
    float local = smoothstep(delay, delay + 0.55, part);

    vec3 from = pickShape(base);
    vec3 to = pickShape(min(base + 1.0, 4.0));
    vec3 pos = mix(from, to, local);

    // particles burst outward mid-morph, then settle
    float burst = sin(local * 3.14159) * (0.1 + aSeed * 0.25);
    pos += normalize(pos + vec3(0.001)) * burst;

    float t = uTime * uMotion;
    pos += 0.045 * vec3(
      sin(t * 0.7 + aSeed * 40.0 + pos.y * 2.0),
      cos(t * 0.6 + aSeed * 23.0 + pos.x * 2.0),
      sin(t * 0.5 + aSeed * 11.0 + pos.z * 2.0)
    );

    vec4 view = modelViewMatrix * vec4(pos, 1.0);

    // push particles away from the cursor in view space
    vec2 gap = view.xy - uPointer;
    float near = exp(-dot(gap, gap) * 1.6);
    view.xy += normalize(gap + vec2(0.0001)) * near * 0.55 * uMotion;

    gl_Position = projectionMatrix * view;
    gl_PointSize = uSize * (0.55 + aSeed * 0.9) * (1.0 + near * 1.4) / -view.z;

    vSeed = aSeed;
    vGlow = near;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uAlpha;
  uniform float uFade;

  varying float vSeed;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.05, d);
    if (disc < 0.01) discard;
    vec3 color = mix(uColorA, uColorB, smoothstep(0.35, 0.9, vSeed));
    color = mix(color, uColorC, clamp(step(0.94, vSeed) + vGlow * 0.6, 0.0, 1.0));
    gl_FragColor = vec4(color, disc * uAlpha * uFade);
  }
`;

function readColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(value || fallback);
}

interface ShapeFieldProps {
  count: number;
  theme: Theme;
  calm: boolean;
  wide: boolean;
}

// Where the field sits for each stage on wide screens (x offset, scale).
const WIDE_PLACE: [number, number][] = [
  [3.05, 0.88],
  [3.1, 0.95],
  [3.0, 0.86],
  [0, 1],
  [2.9, 0.86],
];

export function ShapeField({ count, theme, calm, wide }: ShapeFieldProps) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const invalidate = useThree((s) => s.invalidate);
  const viewport = useThree((s) => s.viewport);
  const dpr = useThree((s) => s.viewport.dpr);

  const geometry = useMemo(() => {
    const { shapes, seeds } = makeShapes(count);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(shapes[0], 3));
    shapes.forEach((s, k) => g.setAttribute(`aShape${k}`, new THREE.BufferAttribute(s, 3)));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  // Start where the current stage wants the field, so it never slides across the text on load.
  const start = useMemo(() => (wide ? WIDE_PLACE[sceneState.stage] : [0, 0.72]), [wide]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStage: { value: sceneState.stage },
      uSize: { value: 30 },
      uMotion: { value: 1 },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uColorA: { value: new THREE.Color("#60a5fa") },
      uColorB: { value: new THREE.Color("#818cf8") },
      uColorC: { value: new THREE.Color("#e2e8f0") },
      uAlpha: { value: 0.8 },
      uFade: { value: 1 },
    }),
    [],
  );

  // Colours come from CSS tokens so the scene follows the page theme.
  useEffect(() => {
    const m = material.current;
    if (!m) return;
    m.uniforms.uColorA.value = readColor("--pf-scene-a", "#60a5fa");
    m.uniforms.uColorB.value = readColor("--pf-scene-b", "#818cf8");
    m.uniforms.uColorC.value = readColor("--pf-scene-c", "#e2e8f0");
    // On narrow screens the field sits behind the text, so it stays faint there.
    const light = theme === "light";
    m.uniforms.uAlpha.value = wide ? (light ? 0.8 : 0.75) : light ? 0.14 : 0.3;
    m.blending = theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
    m.needsUpdate = true;
    invalidate();
  }, [theme, wide, invalidate]);

  useEffect(() => {
    const m = material.current;
    if (m) m.uniforms.uMotion.value = calm ? 0 : 1;
    if (!calm) return;
    // Reduced motion: jump straight to each shape and draw one frame.
    return onStageChange(() => {
      if (material.current) material.current.uniforms.uStage.value = sceneState.stage;
      invalidate();
    });
  }, [calm, invalidate]);

  useFrame((state, delta) => {
    const m = material.current;
    const g = group.current;
    if (!m || !g) return;
    const step = Math.min(delta, 0.05);

    m.uniforms.uSize.value = (wide ? 34 : 22) * dpr;

    if (calm) {
      m.uniforms.uStage.value = sceneState.stage;
    } else {
      m.uniforms.uTime.value += step;
      m.uniforms.uStage.value = THREE.MathUtils.damp(m.uniforms.uStage.value, sceneState.stage, 1.8, step);
      m.uniforms.uPointer.value.set(
        (sceneState.pointerX * viewport.width) / 2,
        (sceneState.pointerY * viewport.height) / 2,
      );
    }

    // Full strength behind the hero, a quiet backdrop behind content.
    const fade = sceneState.stage === 0 ? 1 : 0.5;
    m.uniforms.uFade.value = calm ? fade : THREE.MathUtils.damp(m.uniforms.uFade.value, fade, 2, step);

    const stageNow = Math.round(m.uniforms.uStage.value);
    const [x, scale] = wide ? WIDE_PLACE[stageNow] : [0, 0.72];
    g.position.x = calm ? x : THREE.MathUtils.damp(g.position.x, x, 2, step);
    const s = calm ? scale : THREE.MathUtils.damp(g.scale.x, scale, 2, step);
    g.scale.setScalar(s);

    if (!calm) {
      const time = state.clock.elapsedTime;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, Math.sin(time * 0.15) * 0.3 + sceneState.pointerX * 0.25, 3, step);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -sceneState.pointerY * 0.12, 3, step);
    }
  });

  return (
    <group ref={group} position-x={start[0]} scale={start[1]}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
