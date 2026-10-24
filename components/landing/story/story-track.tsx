"use client";

import { useRef, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { scrollState } from "@/lib/bot/scroll-state";
import { TRACK_SCREENS } from "@/lib/story/timeline";
import { StoryProgressContext } from "./story-progress";

/**
 * A tall scroll track with a pinned full-screen stage. Its scroll progress is
 * the single clock for both the overlay copy (via context) and the 3D head
 * (via scrollState), so card N is on screen exactly while part N flies in.
 */
export default function StoryTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    scrollState.progress = p;
  });
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? y);
    scrollState.velocity = Math.max(-1, Math.min(1, delta * 0.01));
  });

  return (
    <StoryProgressContext.Provider value={scrollYProgress}>
      <div
        ref={ref}
        className="relative"
        style={{ height: `${(TRACK_SCREENS + 1) * 100}svh` }}
      >
        <div className="sticky top-0 grid h-svh w-full place-items-center overflow-hidden">
          {children}
        </div>
      </div>
    </StoryProgressContext.Provider>
  );
}
