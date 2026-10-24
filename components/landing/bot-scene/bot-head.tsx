"use client";
"use no memo"; // mutates Three.js objects in useFrame; opt out of React Compiler

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { GLOWING_BUCKETS, PART_BUCKETS } from "@/lib/bot/buckets";
import { bucketAssembly } from "@/lib/bot/assembly";
import { placePart, responsiveSpread } from "@/lib/bot/place-part";
import { scrollState } from "@/lib/bot/scroll-state";
import { useBotLayout } from "@/lib/bot/use-bot-layout";
import { disperseProgress, localProgress } from "@/lib/story/timeline";
import { prefersReducedMotion } from "@/lib/motion";
import { useAssemblyCues } from "./use-assembly-cues";
import BotEyes from "./bot-eyes";
import { MODEL_URL } from "./model";

/** Scroll-driven assembly: every frame, poses each part between its ring slot and socket. */
export default function BotHead() {
  const { scene } = useGLTF(MODEL_URL, false, true) as unknown as { scene: THREE.Group };
  const groupRef = useRef<THREE.Group>(null);
  const { buckets, unit, centre } = useBotLayout(scene);
  const cues = useAssemblyCues();

  useFrame((state) => {
    const p = scrollState.progress;
    const reduced = prefersReducedMotion();
    const cam = state.camera as THREE.PerspectiveCamera;
    const aspect = state.size.width / Math.max(state.size.height, 1);
    // ring is sized off the visible frame at the head's depth
    const halfH = Math.abs(cam.position.z) * Math.tan((cam.fov * Math.PI) / 360);
    const ctx = {
      ...responsiveSpread(aspect),
      halfH,
      halfW: halfH * aspect,
      unit,
      centre,
      disperse: disperseProgress(p),
      time: state.clock.elapsedTime,
    };

    for (const bucket of PART_BUCKETS) {
      const objs = buckets[bucket.key];
      if (!objs) continue;

      const assembly = bucketAssembly(bucket.step, p, reduced);
      cues.seat(bucket.key, localProgress(bucket.step, p));
      for (const obj of objs) placePart(obj, 1 - assembly, ctx);

      if (GLOWING_BUCKETS.has(bucket.key)) {
        const glow = Math.max(0, assembly - 0.15) * 0.7;
        for (const obj of objs) {
          for (const m of obj.userData.emissiveMats ?? []) m.emissiveIntensity = glow;
        }
      }
    }

    // The GLB's own clip is not played: it writes the same transforms as above.
    cues.finale(p);

    // idle orbit only while the reader is still
    if (groupRef.current && Math.abs(scrollState.velocity) < 0.04) {
      groupRef.current.rotation.y = Math.sin(ctx.time * 0.12) * 0.08;
      groupRef.current.rotation.x = Math.sin(ctx.time * 0.09 + 1.5) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* asset faces -Z; separate group so the idle orbit can't stomp the flip */}
      <group rotation={[0, Math.PI, 0]}>
        <primitive object={scene} />
      </group>
      <BotEyes />
    </group>
  );
}

useGLTF.preload(MODEL_URL, false, true);
