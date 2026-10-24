"use client";

import { useRef } from "react";
import { playClack, playPing } from "@/lib/bot/audio";
import { stepRange } from "@/lib/story/timeline";

const FINALE_AT = stepRange(8)[0];
const FINALE_RESET_BELOW = stepRange(7)[0];
const SEATED = 0.92;

/**
 * Sound cues for the frame loop: one clack as each bucket seats, one ping
 * when the finale starts (re-armed once the reader scrolls back past step 7).
 */
export function useAssemblyCues() {
  const last = useRef<Record<string, number>>({});
  const finaleFired = useRef(false);

  const seat = (key: string, local: number) => {
    if ((last.current[key] ?? 0) < SEATED && local >= SEATED) playClack();
    last.current[key] = local;
  };

  const finale = (p: number) => {
    if (p > FINALE_AT && !finaleFired.current) {
      finaleFired.current = true;
      playPing();
    } else if (p < FINALE_RESET_BELOW) {
      finaleFired.current = false;
    }
  };

  return { seat, finale };
}
