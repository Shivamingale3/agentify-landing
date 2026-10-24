"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";

/** Story scroll progress in [0, 1], provided by StoryTrack. */
export const StoryProgressContext = createContext<MotionValue<number> | null>(null);

export function useStoryProgress() {
  const progress = useContext(StoryProgressContext);
  if (!progress) throw new Error("useStoryProgress must be used inside <StoryTrack>");
  return progress;
}
