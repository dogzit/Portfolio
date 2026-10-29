"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMediaQuery } from "@/lib/useMediaQuery";

type Props = {
  children: React.ReactNode;
  /** Stagger in seconds. */
  delay?: number;
  /** Which edge the block drifts in from. Ignored below the two-column width. */
  from?: "left" | "right" | "up";
  className?: string;
};

/** Matches the breakpoint the story timeline splits in two at. */
const WIDE = "(min-width: 900px)";

/**
 * A slower, softer `Reveal` for the story chapters: more travel and a longer
 * settle, on one easing curve. No spring and no scale — those read as
 * "animated", and this should read as the page breathing.
 *
 * On the two-column timeline a chapter drifts in from its own side, so the
 * thread assembles itself alternately left and right as you scroll. Narrow
 * screens are a single column, where sideways travel would just fight the
 * reading direction, so there it falls back to drifting straight up.
 */
export function FloatIn({ children, delay = 0, from = "up", className }: Props) {
  const reduced = useReducedMotion();
  const wide = useMediaQuery(WIDE);

  if (reduced) return <div className={className}>{children}</div>;

  const sideways = wide && from !== "up";
  const initial = sideways
    ? { opacity: 0, x: from === "left" ? -56 : 56 }
    : { opacity: 0, y: 24 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
