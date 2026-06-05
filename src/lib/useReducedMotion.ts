"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors the user's `prefers-reduced-motion` setting. Use this to silence
 * heavy ambient animations (particles, mesh blobs, looping floats) for users
 * who've opted out at the OS level.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
