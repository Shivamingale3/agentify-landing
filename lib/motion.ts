let query: MediaQueryList | null = null;

/** Live reduced-motion preference; safe to call every frame. */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  query ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
};
