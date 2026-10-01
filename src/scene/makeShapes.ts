// Five target shapes for the particle field. Each one borrows the signature
// form of a VarSys landing page:
//   0 core sphere        - the founder / the starting point
//   1 orbit rings        - VarSys Store hero orbit
//   2 year dial          - TraQify, one tick per day
//   3 perspective floor  - VarSys Store grid floor, VoltTrack current lines
//   4 speedometer arc    - EV Hub dashboard

type Vec = [number, number, number];

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function ballPoint(rand: () => number, radius: number): Vec {
  const u = rand() * 2 - 1;
  const t = rand() * Math.PI * 2;
  const r = radius * Math.cbrt(rand());
  const s = Math.sqrt(1 - u * u);
  return [r * s * Math.cos(t), r * u, r * s * Math.sin(t)];
}

function turnX([x, y, z]: Vec, a: number): Vec {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}

function turnZ([x, y, z]: Vec, a: number): Vec {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x * c - y * s, x * s + y * c, z];
}

function corePoint(i: number, count: number, rand: () => number): Vec {
  const y = 1 - (2 * (i + 0.5)) / count;
  const ring = Math.sqrt(1 - y * y);
  const t = i * 2.399963;
  const inner = rand() < 0.18;
  const r = inner ? 1.7 * Math.cbrt(rand()) : 1.7 * (0.94 + rand() * 0.06);
  return [r * ring * Math.cos(t), r * y, r * ring * Math.sin(t)];
}

const RINGS = [1.5, 2.3, 3.1];

function orbitPoint(i: number, rand: () => number): Vec {
  const pick = rand();
  let p: Vec;
  let ring = i % 3;
  if (pick < 0.08) {
    return turnX(ballPoint(rand, 0.55), 0);
  } else if (pick < 0.22) {
    const planet = i % 7;
    ring = planet % 3;
    const a = planet * 0.9 + ring * 1.3;
    const b = ballPoint(rand, 0.13);
    p = [RINGS[ring] * Math.cos(a) + b[0], b[1], RINGS[ring] * Math.sin(a) + b[2]];
  } else {
    const a = rand() * Math.PI * 2;
    const r = RINGS[ring] + (rand() - 0.5) * 0.06;
    p = [r * Math.cos(a), (rand() - 0.5) * 0.04, r * Math.sin(a)];
  }
  return turnZ(turnX(p, 1.12), (ring - 1) * 0.22);
}

function dialPoint(i: number, rand: () => number): Vec {
  const day = i % 365;
  const angle = Math.PI / 2 - (day / 365) * Math.PI * 2;
  const monthStart = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334].includes(day);
  const length = monthStart ? 0.62 : 0.18 + 0.22 * Math.abs(Math.sin(day * 0.31));
  const r = 1.95 + rand() * length;
  const p: Vec = [r * Math.cos(angle), r * Math.sin(angle), (rand() - 0.5) * 0.05];
  if (rand() < 0.1) {
    const hub = 0.35 + rand() * 0.05;
    const a = rand() * Math.PI * 2;
    return turnX([hub * Math.cos(a), hub * Math.sin(a), 0], -0.42);
  }
  return turnX(p, -0.42);
}

function floorPoint(i: number, rand: () => number): Vec {
  const across = i % 2 === 0;
  const line = Math.floor(rand() * 17);
  const run = rand();
  const x = across ? -6 + run * 12 : -6 + line * 0.75;
  const z = across ? -7 + line * 0.55 : -7 + run * 9.4;
  const y = -1.7 + 0.22 * Math.sin(x * 0.7) * Math.cos(z * 0.6);
  return [x, y, z];
}

function gaugePoint(i: number, rand: () => number): Vec {
  const from = (210 * Math.PI) / 180;
  const sweep = (240 * Math.PI) / 180;
  const pick = rand();
  if (pick < 0.62) {
    const a = from - rand() * sweep;
    const r = 2.05 + rand() * 0.22;
    return [r * Math.cos(a), r * Math.sin(a) - 0.2, (rand() - 0.5) * 0.06];
  }
  if (pick < 0.84) {
    const tick = i % 25;
    const a = from - (tick / 24) * sweep;
    const long = tick % 4 === 0;
    const r = 1.85 - rand() * (long ? 0.32 : 0.14);
    return [r * Math.cos(a), r * Math.sin(a) - 0.2, 0];
  }
  if (pick < 0.95) {
    const a = from - sweep * 0.68;
    const r = rand() * 1.7;
    const spread = (rand() - 0.5) * 0.04;
    return [r * Math.cos(a) + spread, r * Math.sin(a) - 0.2 + spread, 0.02];
  }
  const hub = ballPoint(rand, 0.16);
  return [hub[0], hub[1] - 0.2, hub[2]];
}

export function makeShapes(count: number) {
  const rand = seeded(20261001);
  const shapes = Array.from({ length: 5 }, () => new Float32Array(count * 3));
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const points = [
      corePoint(i, count, rand),
      orbitPoint(i, rand),
      dialPoint(i, rand),
      floorPoint(i, rand),
      gaugePoint(i, rand),
    ];
    points.forEach((p, k) => shapes[k].set(p, i * 3));
    seeds[i] = rand();
  }

  return { shapes, seeds };
}
