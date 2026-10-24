/**
 * The one scroll timeline shared by the 3D head and the overlay copy.
 * `p` is scroll progress through the story track, in [0, 1]:
 *
 *   [0 .. EXPLODE_BAND)            hero: the finished head comes apart
 *   [EXPLODE_BAND .. DISPERSE_END) parts drift out onto a holding ring
 *   [DISPERSE_END .. 1]            TOTAL_STEPS equal segments, one per step
 */
export const TOTAL_STEPS = 8;
export const EXPLODE_BAND = 0.1;
export const DISPERSE_END = 0.2;

/** Screens of scrolling the whole story takes. Tuning knob for pacing. */
export const TRACK_SCREENS = 8;

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

export const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/** Progress window `[start, end]` owned by a 1-based step. */
export const stepRange = (step: number): [number, number] => {
  const span = (1 - DISPERSE_END) / TOTAL_STEPS;
  return [DISPERSE_END + (step - 1) * span, DISPERSE_END + step * span];
};

/** 0..1 progress through a step's own window. */
export const localProgress = (step: number, p: number) => {
  const [start, end] = stepRange(step);
  return clamp01((p - start) / (end - start));
};

/** 0 while the head is bursting apart, 1 once parts sit on the ring. */
export const disperseProgress = (p: number) =>
  p <= EXPLODE_BAND
    ? 0
    : easeInOutCubic(clamp01((p - EXPLODE_BAND) / (DISPERSE_END - EXPLODE_BAND)));
