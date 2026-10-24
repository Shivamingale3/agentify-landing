import type * as THREE from "three";
import { PART_BUCKETS } from "@/lib/bot/buckets";

export type RestPose = { pos: THREE.Vector3; rot: THREE.Euler };
export type BucketRefs = Record<string, THREE.Object3D[]>;

/** Tags each animatable node with its bucket. Only the outermost match per chain counts. */
export function collectBuckets(scene: THREE.Group) {
  const buckets: BucketRefs = {};
  const parts: THREE.Object3D[] = [];
  scene.traverse((obj) => {
    if (obj === scene || obj.parent?.userData.bucketKey) return;
    const bucket = PART_BUCKETS.find((b) => b.pattern.test(obj.name));
    if (!bucket) return;
    (buckets[bucket.key] ||= []).push(obj);
    obj.userData.bucketKey = bucket.key;
    obj.userData.bucket = bucket;
    parts.push(obj);
  });
  return { buckets, parts };
}

/**
 * useGLTF caches the scene globally and the frame loop mutates it, so a
 * remount would see last frame's pose. Snapshot the authored pose once on
 * the scene and restore it before measuring.
 */
export function restoreRestPose(scene: THREE.Group, parts: THREE.Object3D[]) {
  let poses = scene.userData.__restPose as Map<string, RestPose> | undefined;
  if (!poses) {
    poses = new Map(
      parts.map((o) => [o.uuid, { pos: o.position.clone(), rot: o.rotation.clone() }])
    );
    scene.userData.__restPose = poses;
  }
  for (const obj of parts) {
    const rest = poses.get(obj.uuid);
    if (rest) {
      obj.position.copy(rest.pos);
      obj.rotation.copy(rest.rot);
    }
    obj.userData.rest = rest;
  }
}
