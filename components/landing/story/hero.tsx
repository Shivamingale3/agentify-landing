"use client";

import { motion, useTransform } from "framer-motion";
import { EXPLODE_BAND, clamp01 } from "@/lib/story/timeline";
import { useStoryProgress } from "./story-progress";

/** Opening tagline. Leaves while the finished head comes apart. */
export default function Hero() {
  const progress = useStoryProgress();
  // function form on purpose: framer's accelerated [in]→[out] opacity path
  // hands this to a native scroll timeline that doesn't clamp and the hero reappears
  const opacity = useTransform(progress, (p) => 1 - clamp01(p / EXPLODE_BAND));
  const y = useTransform(progress, [0, EXPLODE_BAND], [0, -80]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="col-start-1 row-start-1 flex flex-col items-center px-6 text-center"
    >
      <h1 className="font-bold uppercase text-5xl leading-[1.05] tracking-wide md:text-7xl lg:text-8xl">
        Ship an agent,
        <br />
        not a chatbot.
      </h1>
      <p className="label-eyebrow mt-8">Scroll to assemble</p>
    </motion.div>
  );
}
