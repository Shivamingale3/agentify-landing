"use client";

import { ACCENT } from "@/lib/bot/colors";

/** Three-point rig plus the violet kicker that pushes the brain over the bloom threshold. */
export default function BotLighting() {
  return (
    <>
      <ambientLight intensity={0.18} color="#9aa6d6" />
      {/* rim: cool, upper back right */}
      <directionalLight position={[3, 4, -3]} intensity={1.4} color="#dfeef9" />
      {/* key: warm, front left */}
      <directionalLight position={[-2.5, 1.5, 3]} intensity={0.7} color="#fff3e0" />
      {/* tight falloff: exploded parts drift past it and would blow out to white */}
      <pointLight position={[0, 0.35, 0]} intensity={2.6} color={ACCENT} distance={1.9} decay={2} />
    </>
  );
}
