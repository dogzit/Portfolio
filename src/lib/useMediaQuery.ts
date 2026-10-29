"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors a media query. Starts `false` on the server and on first paint, so
 * callers should treat `false` as the narrow, conservative case.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}
