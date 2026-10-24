import type * as THREE from "three";

/**
 * The holding ring parts wait on between the explode beat and their step.
 * Bands are fractions of the visible frame half-extents; floors are world
 * units so a narrow phone frame can't pull the ring inside the head.
 */
const RING_X_BAND: [number, number] = [0.54, 0.76];
const RING_Y_BAND: [number, number] = [0.54, 0.8];
const RING_X_FLOOR = 0.92;
const RING_Y_FLOOR = 0.86;
/** small on purpose: depth doesn't clear the centre, it just looms */
export const RING_Z_SPREAD = 0.28;

/** spreads N parts evenly around the ring with no clumping */
export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

export type Frame = { halfW: number; halfH: number; unit: number; centre: THREE.Vector3 };

const lerpBand = ([a, b]: [number, number], t: number) => a + (b - a) * t;

/**
 * Writes into `out` the offset (root-local units) that parks this part's
 * measured centre on its ring slot. Absolute placement, not an added offset,
 * or parts near the centre would stay near the centre.
 */
export function ringOffset(obj: THREE.Object3D, frame: Frame, out: THREE.Vector3) {
  const d = obj.userData;
  const rx = Math.max(frame.halfW * lerpBand(RING_X_BAND, d.ringBand), RING_X_FLOOR) + d.ringPadX;
  const ry = Math.max(frame.halfH * lerpBand(RING_Y_BAND, d.ringBand), RING_Y_FLOOR) + d.ringPadY;
  return out
    .set(
      frame.centre.x + (d.ringCos * rx) / frame.unit,
      frame.centre.y + (d.ringSin * ry) / frame.unit,
      frame.centre.z + d.ringZ / frame.unit
    )
    .sub(d.partCentre as THREE.Vector3);
}
