import * as THREE from "three";
import { type PartBucket, GLOWING_BUCKETS } from "@/lib/bot/buckets";
import { seedTriple } from "@/lib/bot/assembly";
import { GOLDEN_ANGLE, RING_Z_SPREAD } from "@/lib/bot/ring";
import { cloneEmissive } from "./emissive";
import type { PartMetrics } from "./measure";

/** Frame is far wider than tall, so squash Y or parts sail off top and bottom. */
const EXPLODE_SHAPE: [number, number, number] = [1.3, 0.46, 0.85];

/**
 * Precomputes each part's explode vector, ring slot, tumble and drift on
 * userData. Slots go biggest-first so consecutive golden-angle slots throw
 * the large plates to opposite sides; name breaks ties for stable reloads.
 */
export function layoutParts(parts: THREE.Object3D[], m: PartMetrics, accent: THREE.Color) {
  const size = (o: THREE.Object3D) => m.sizes.get(o.uuid) ?? 0;
  const slotted = [...parts].sort(
    (a, b) => size(b) - size(a) || a.name.localeCompare(b.name)
  );

  const dir = new THREE.Vector3();
  slotted.forEach((obj, i) => {
    const bucket = obj.userData.bucket as PartBucket;
    const d = obj.userData;
    const [rx, ry, rz] = seedTriple(obj, 1);
    const c = m.centres.get(obj.uuid);

    dir.copy(c ?? m.headCentre).sub(m.headCentre);
    if (dir.lengthSq() < 1e-8) dir.set(rx, ry, rz);
    dir.normalize();

    const [bx, by, bz] = bucket.bias ?? [0, 0, 0];
    d.explode = new THREE.Vector3(
      dir.x * EXPLODE_SHAPE[0] * bucket.spread + bx + rx * bucket.jitter,
      dir.y * EXPLODE_SHAPE[1] * bucket.spread + by + ry * bucket.jitter,
      dir.z * EXPLODE_SHAPE[2] * bucket.spread + bz + rz * bucket.jitter
    ).divideScalar(m.unit);

    const angle = i * GOLDEN_ANGLE;
    d.ringCos = Math.cos(angle);
    d.ringSin = Math.sin(angle);
    d.ringBand = (i * 0.6180339887) % 1;
    d.ringZ = rz * RING_Z_SPREAD;
    d.partCentre = (c ?? m.headCentre).clone();
    // big plates park further out so their inner edge clears the centre
    d.ringPadX = size(obj) * 0.4;
    d.ringPadY = size(obj) * 0.25;

    const [tx, ty, tz] = seedTriple(obj, 7);
    const [sx, sy, sz] = bucket.spin ?? [0, 0, 0];
    d.tumble = new THREE.Euler(tx * sx, ty * sy, tz * sz);
    d.drift = 0.035 / m.unit;
    d.phase = (rx + 1) * Math.PI;

    if (GLOWING_BUCKETS.has(bucket.key) && !d.emissiveMats) {
      d.emissiveMats = cloneEmissive(obj, accent);
    }
  });
}
