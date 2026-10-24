"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { BACKDROP } from "@/lib/bot/colors";

const CAM_Z_WIDE = 4.6;
const CAM_Z_NARROW = 7.7;
const ASPECT_WIDE = 1.4;
const ASPECT_NARROW = 0.45;

/**
 * FOV is vertical, so narrow screens lose horizontal room around the head.
 * Dolly back as the frame narrows, and keep fog just behind the subject.
 */
export default function ResponsiveCamera() {
  const size = useThree((s) => s.size);
  const scene = useThree((s) => s.scene);

  const aspect = size.width / Math.max(size.height, 1);
  const t = THREE.MathUtils.clamp((aspect - ASPECT_NARROW) / (ASPECT_WIDE - ASPECT_NARROW), 0, 1);
  const z = THREE.MathUtils.lerp(CAM_Z_NARROW, CAM_Z_WIDE, t);

  useEffect(() => {
    scene.fog = new THREE.Fog(BACKDROP, z + 0.7, z + 12);
  }, [scene, z]);

  return <PerspectiveCamera makeDefault fov={32} position={[0, 0.4, z]} near={0.1} far={50} />;
}
