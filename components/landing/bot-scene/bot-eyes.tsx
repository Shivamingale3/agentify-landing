"use client";
"use no memo"; // mutates Three.js objects in useFrame; opt out of React Compiler

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { bucketAssembly } from "@/lib/bot/assembly";
import { ACCENT } from "@/lib/bot/colors";
import { scrollState } from "@/lib/bot/scroll-state";
import { prefersReducedMotion } from "@/lib/motion";

// The GLB's eye sockets are hollow; these pods fill them. Socket centres were
// measured off the render. Sunk deeper than EYE_Z you see into the skull.
const EYE_X = 0.142;
const EYE_Y = 0.468;
const EYE_Z = 0.3;
const EYE_RADIUS = 0.066;
const EYE_SCALE: [number, number, number] = [1, 0.94, 0.8];
/** sockets splay outward */
const EYE_YAW = 0.2;
/** rides the same curve as the eye housing bucket */
const EYE_STEP = 4;

export default function BotEyes() {
  const podRefs = useRef<(THREE.Mesh | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#120a2e",
        emissive: ACCENT,
        emissiveIntensity: 0,
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0,
        toneMapped: false,
      }),
    []
  );
  const geometry = useMemo(() => new THREE.SphereGeometry(EYE_RADIUS, 24, 24), []);

  useEffect(() => () => {
    material.dispose();
    geometry.dispose();
  }, [material, geometry]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const lit = bucketAssembly(EYE_STEP, scrollState.progress, prefersReducedMotion());
    groupRef.current.visible = lit > 0.001;

    // scale the pods, not the group, or they'd slide toward the head centre
    const s = 0.55 + lit * 0.45;
    for (const pod of podRefs.current) {
      pod?.scale.set(EYE_SCALE[0] * s, EYE_SCALE[1] * s, EYE_SCALE[2] * s);
    }

    // modest emissive keeps the sphere shading readable; bloom does the rest
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.12 * lit;
    material.emissiveIntensity = lit * 1.15 * pulse;
    material.opacity = lit;
  });

  return (
    <group ref={groupRef}>
      {[-1, 1].map((side, i) => (
        <mesh
          key={side}
          ref={(el) => {
            podRefs.current[i] = el;
          }}
          geometry={geometry}
          material={material}
          position={[EYE_X * side, EYE_Y, EYE_Z]}
          rotation={[0, EYE_YAW * side, 0]}
          scale={EYE_SCALE}
        />
      ))}
    </group>
  );
}
