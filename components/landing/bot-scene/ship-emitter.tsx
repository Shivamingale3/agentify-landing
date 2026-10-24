"use client";
"use no memo"; // mutates Three.js objects in useFrame; opt out of React Compiler

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ACCENT } from "@/lib/bot/colors";
import { scrollState } from "@/lib/bot/scroll-state";
import { clamp01, stepRange } from "@/lib/story/timeline";

const PARTICLE_COUNT = 220;
const [FINALE_START] = stepRange(8);

/** Step 8 finale: particles stream up out of the head and a ring pulses at its base. */
export default function ShipEmitter() {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const seeds = useMemo(
    () => Float32Array.from({ length: PARTICLE_COUNT }, () => Math.random()),
    []
  );
  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  useFrame(() => {
    const pts = pointsRef.current;
    const mat = matRef.current;
    const ring = ringRef.current;
    if (!pts || !mat || !ring) return;

    const p = scrollState.progress;
    const local = clamp01((p - FINALE_START) / (1 - FINALE_START));
    mat.opacity = local;
    mat.size = 0.04 + local * 0.05;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const s = seeds[i];
      positions[i * 3] = Math.sin(s * 12.5 + p * 6) * local * 0.4;
      positions[i * 3 + 1] = 0.4 + local * (1.6 + s * 1.2);
      positions[i * 3 + 2] = Math.cos(s * 9.3 + p * 5) * local * 0.4;
    }
    pts.geometry.attributes.position.needsUpdate = true;

    ring.scale.setScalar(0.2 + local * 2.4);
    (ring.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - local);
  });

  const glow = {
    color: ACCENT,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  };

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={matRef} size={0.05} sizeAttenuation {...glow} />
      </points>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.4, 0]}>
        <ringGeometry args={[0.4, 0.45, 64]} />
        <meshBasicMaterial side={THREE.DoubleSide} {...glow} />
      </mesh>
    </group>
  );
}
