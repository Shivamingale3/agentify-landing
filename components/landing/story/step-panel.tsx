"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { TOTAL_STEPS, stepRange } from "@/lib/story/timeline";
import { useStoryProgress } from "./story-progress";

/** Share of a step's window spent fading in (and out). */
const FADE = 0.25;

/**
 * Pins one step's card on the stage and shows it only during its own
 * timeline window. Cards alternate sides so the head stays visible.
 */
export default function StepPanel({
  step,
  headingId,
  children,
}: {
  /** 1-based */
  step: number;
  headingId: string;
  children: ReactNode;
}) {
  const progress = useStoryProgress();
  const reduced = useReducedMotion();

  const [start, end] = stepRange(step);
  const f = (end - start) * FADE;
  const isLast = step === TOTAL_STEPS;
  const input = [start, start + f, end - f, end];

  const opacity = useTransform(progress, input, [0, 1, 1, isLast ? 1 : 0]);
  const y = useTransform(progress, input, reduced ? [0, 0, 0, 0] : [24, 0, 0, isLast ? 0 : -24]);
  // invisible cards are stacked on top of each other; don't let them eat clicks
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    <motion.section
      aria-labelledby={headingId}
      style={{ opacity, y, pointerEvents }}
      className={cn(
        "col-start-1 row-start-1 flex w-full px-6 pt-20 md:px-16 md:pt-0 lg:px-28",
        step % 2 === 0 ? "justify-end" : "justify-start"
      )}
    >
      {children}
    </motion.section>
  );
}
