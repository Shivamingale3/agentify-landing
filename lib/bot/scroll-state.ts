/**
 * Scroll signal for the R3F frame loop. Written by StoryTrack, read in
 * useFrame, so scrolling never re-renders the 3D scene.
 */
export const scrollState = {
  /** story progress in [0, 1], see lib/story/timeline.ts */
  progress: 0,
  /** signed, clamped scroll delta per update */
  velocity: 0,
};
