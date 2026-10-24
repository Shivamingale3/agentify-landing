import type * as THREE from "three";
import {
  EXPLODE_BAND,
  clamp01,
  easeInOutCubic,
  easeOutCubic,
  localProgress,
} from "@/lib/story/timeline";

/**
 * How seated a step's parts are: 1 = locked on the chassis, 0 = fully away.
 * Shared by the GLB parts and the eye pods so they move in lockstep.
 */
export const bucketAssembly = (step: number, p: number, reduced = false) => {
  if (reduced) return 1;
  if (p < EXPLODE_BAND) return 1 - easeInOutCubic(clamp01(p / EXPLODE_BAND));
  // ease-out, not back-ease: overshoot reads as the part missing its slot
  return easeOutCubic(localProgress(step, p));
};

/** Deterministic [-1, 1] triple from an object's uuid (FNV-1a hash). */
export const seedTriple = (
  obj: THREE.Object3D,
  salt = 0
): [number, number, number] => {
  let h = (2166136261 ^ salt) >>> 0;
  for (let i = 0; i < obj.uuid.length; i++) {
    h ^= obj.uuid.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const f = (n: number) => {
    const x = Math.sin(h * 0.0001 + n * 12.9898) * 43758.5453;
    return (x - Math.floor(x)) * 2 - 1;
  };
  return [f(1), f(2), f(3)];
};
