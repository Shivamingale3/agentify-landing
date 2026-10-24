/**
 * Groups of GLB nodes that fly in together, one group per story step.
 * First regex match wins, so narrower patterns come first.
 *
 * Ordered innermost-first by measured radius from the head centre, not by
 * node name: the "*Rot" nodes are the hinge layer *under* the shell, and
 * "TopInner" is one of the outermost plates.
 */
export type PartBucket = {
  key: string;
  step: number;
  pattern: RegExp;
  /** drift off the chassis when exploded, world units */
  spread: number;
  /** directional bias added to the radial direction, world units */
  bias?: [number, number, number];
  /** per-object random scatter, world units */
  jitter: number;
  /** per-object tumble while exploded, radians */
  spin?: [number, number, number];
};

export const PART_BUCKETS: PartBucket[] = [
  // cradle + wiring harness
  { key: "core", step: 1, pattern: /^Brain(Holder|Wire)/i, spread: 0.34, bias: [0, -0.22, 0], jitter: 0.06, spin: [0.3, 0.25, 0.15] },
  // brain orb seats before any plate encloses it
  { key: "brain", step: 2, pattern: /^Brain_/i, spread: 0.44, bias: [0, 0.34, 0], jitter: 0.05, spin: [0.25, 0.5, 0.4] },
  // hinge / actuator layer
  { key: "mech", step: 3, pattern: /^(TopRot|SideRot|BottomSideRot)/i, spread: 0.52, bias: [0, 0.06, -0.1], jitter: 0.1, spin: [0.5, 0.45, 0.5] },
  // eye housing + visor
  { key: "eyes", step: 4, pattern: /^Eyes/i, spread: 0.6, bias: [0, 0.04, 0.24], jitter: 0.07, spin: [0.4, 0.55, 0.25] },
  // inner face + jaw
  { key: "face", step: 5, pattern: /^(Inside_face|inside_|Mouth)/i, spread: 0.68, bias: [0, -0.1, 0.3], jitter: 0.08, spin: [0.35, 0.5, 0.3] },
  // side + lower plates, ear
  { key: "sides", step: 6, pattern: /^(side_|sideRight|BottomSide(Right)?_|Ear)/i, spread: 0.76, bias: [0.1, -0.04, -0.08], jitter: 0.09, spin: [0.4, 0.5, 0.35] },
  // outer cranium + rear plates
  { key: "shell", step: 7, pattern: /^(Top_|TopInner|Back_|BackBottom)/i, spread: 0.86, bias: [0, 0.18, -0.1], jitter: 0.11, spin: [0.5, 0.6, 0.45] },
];

/** Buckets whose materials glow as they seat. */
export const GLOWING_BUCKETS = new Set(["brain", "eyes"]);
