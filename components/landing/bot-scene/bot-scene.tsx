"use client";

import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { BACKDROP } from "@/lib/bot/colors";
import BotEnvironment from "./bot-environment";
import BotHead from "./bot-head";
import BotLighting from "./bot-lighting";
import BotPostProcessing from "./post-processing";
import ResponsiveCamera from "./responsive-camera";
import ShipEmitter from "./ship-emitter";

/** Composition root for the 3D head. */
export default function BotScene() {
  return (
    <Canvas
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      dpr={[1, 1.5]}
      scene={{ background: BACKDROP }}
    >
      <Suspense fallback={null}>
        <ResponsiveCamera />
        <BotLighting />
        <BotHead />
        <ShipEmitter />
        <BotEnvironment />
        <Preload all />
      </Suspense>
      <BotPostProcessing />
    </Canvas>
  );
}
