"use client";
"use no memo"; // mutates Three.js objects in useMemo; opt out of React Compiler

import { useMemo } from "react";
import * as THREE from "three";
import { ACCENT } from "@/lib/bot/colors";
import { collectBuckets, restoreRestPose, type BucketRefs } from "./layout/rest-pose";
import { measureParts } from "./layout/measure";
import { layoutParts } from "./layout/explode-layout";

export type { RestPose } from "./layout/rest-pose";

export type BotLayout = {
  buckets: BucketRefs;
  /** world units per root-local unit */
  unit: number;
  /** head centre, root-local */
  centre: THREE.Vector3;
};

/** Buckets the GLB's parts and precomputes their exploded/ring layout once per scene. */
export function useBotLayout(scene: THREE.Group): BotLayout {
  return useMemo(() => {
    const { buckets, parts } = collectBuckets(scene);
    if (parts.length === 0) return { buckets, unit: 1, centre: new THREE.Vector3() };

    restoreRestPose(scene, parts);
    const metrics = measureParts(parts);
    layoutParts(parts, metrics, ACCENT);
    return { buckets, unit: metrics.unit, centre: metrics.headCentre };
  }, [scene]);
}
