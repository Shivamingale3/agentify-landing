import * as THREE from "three";
import { ringOffset, type Frame } from "@/lib/bot/ring";
import type { RestPose } from "@/lib/bot/layout/rest-pose";

export type PlaceContext = Frame & {
  /** responsive squeeze on the explode vector */
  spreadX: number;
  spreadY: number;
  /** 0 = on the burst vector, 1 = on the ring */
  disperse: number;
  time: number;
};

const OFFSET = new THREE.Vector3();
const RING = new THREE.Vector3();

/** Poses one part between its away position (`away` = 1) and its socket (0). */
export function placePart(obj: THREE.Object3D, away: number, ctx: PlaceContext) {
  const d = obj.userData;
  const rest = d.rest as RestPose | undefined;
  const explode = d.explode as THREE.Vector3 | undefined;
  if (!rest || !explode) return;

  OFFSET.set(explode.x * ctx.spreadX, explode.y * ctx.spreadY, explode.z);
  if (ctx.disperse > 0.001) OFFSET.lerp(ringOffset(obj, ctx, RING), ctx.disperse);
  OFFSET.multiplyScalar(away);

  if (away > 0.002) {
    // slow drift so the cloud feels suspended, not frozen
    const drift = d.drift * away;
    const ph = d.phase;
    OFFSET.x += Math.sin(ctx.time * 0.55 + ph) * drift;
    OFFSET.y += Math.cos(ctx.time * 0.47 + ph * 1.3) * drift;
    OFFSET.z += Math.sin(ctx.time * 0.41 + ph * 0.7) * drift;
  }

  obj.position.copy(rest.pos).add(OFFSET);
  const tumble = d.tumble as THREE.Euler;
  obj.rotation.set(
    rest.rot.x + tumble.x * away,
    rest.rot.y + tumble.y * away,
    rest.rot.z + tumble.z * away
  );
}

/**
 * The explode cloud is authored for a wide frame. On portrait screens squeeze
 * X and let it grow into the vertical room instead.
 */
export const responsiveSpread = (aspect: number) => ({
  spreadX: Math.min(1, Math.max(0.42, aspect / 1.6)),
  spreadY: Math.min(1.12, Math.max(0.85, 0.62 / Math.max(aspect, 0.3))),
});
