"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

type MovingBorderProps = {
  children: React.ReactNode;
  /** One full lap, in ms. */
  duration?: number;
  rx?: string;
  ry?: string;
};

/**
 * Walks `children` around the perimeter of its parent.
 *
 * The trick is the same one Aceternity uses and it's a good one: lay down an
 * invisible SVG `<rect>`, then sample `getPointAtLength()` each frame to get a
 * point travelling its outline. No keyframes to hand-write per aspect ratio —
 * the path is whatever shape the box happens to be.
 *
 * The one real fix over the original: it drives `progress` off the raw
 * `time` argument, so the light's position depends on how long the page has
 * been open and every instance on the page is at a different point in its lap
 * for no reason. This accumulates `delta` from zero instead, so each one
 * starts at the same corner.
 */
export function MovingBorder({
  children,
  duration = 3600,
  rx = "0%",
  ry = "0%",
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((_time, delta) => {
    const length = pathRef.current?.getTotalLength();
    if (!length) return;
    const pxPerMs = length / duration;
    progress.set((progress.get() + delta * pxPerMs) % length);
  });

  const x = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).x ?? 0);
  const y = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect ref={pathRef} fill="none" width="100%" height="100%" rx={rx} ry={ry} />
      </svg>
      <motion.div style={{ position: "absolute", top: 0, left: 0, transform }}>
        {children}
      </motion.div>
    </>
  );
}

type BorderTrailProps = {
  children: React.ReactNode;
  className?: string;
  /** Wrapper classes — this is the element the light laps around. */
  containerClassName?: string;
  duration?: number;
  href?: string;
  onClick?: () => void;
  /**
   * `solid` matches `.btn-primary` — ink fill, paper text — so a hero CTA
   * keeps its weight. `quiet` matches `.btn-ghost`.
   */
  tone?: "solid" | "quiet";
};

/**
 * A button with a soft light lapping its border. Square corners and a clay
 * glow instead of the original's pill shape and purple, so it sits inside the
 * same hairline grammar as `.btn`.
 *
 * Under `prefers-reduced-motion` it degrades to a plain bordered button rather
 * than a static dot parked in one corner.
 */
export function BorderTrailButton({
  children,
  className,
  containerClassName,
  duration = 3600,
  href,
  onClick,
  tone = "solid",
}: BorderTrailProps) {
  const reduced = useReducedMotion();
  const inner = (
    <span
      className={cn(
        // Sized to land on exactly the same box as `.btn`: that rule is
        // 11px/18px padding inside a 1px border, and the wrapper here already
        // contributes 1px of border plus 1px of padding on every side.
        "relative z-10 flex h-full w-full items-center justify-center gap-2 px-[1.0625rem] py-[0.625rem] text-sm leading-none font-medium transition-colors duration-200",
        tone === "solid"
          ? "bg-foreground text-background hover:bg-accent-ink"
          : "bg-surface text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );

  const shell = (
    <>
      {!reduced && (
        <span aria-hidden className="absolute inset-0">
          <MovingBorder duration={duration}>
            {/* The light itself: a clay radial fading to nothing. It reads
                against the 1px gap, so it needs more punch over an ink fill
                than over paper. */}
            <span
              className={cn(
                "block h-20 w-20 bg-[radial-gradient(circle,var(--accent)_0%,transparent_65%)]",
                tone === "solid" ? "opacity-90" : "opacity-55",
              )}
            />
          </MovingBorder>
        </span>
      )}
      {inner}
    </>
  );

  const wrapper = cn(
    "relative inline-flex overflow-hidden border border-line p-px transition-colors duration-200 hover:border-line-strong",
    containerClassName,
  );

  return href ? (
    <a href={href} className={wrapper}>
      {shell}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={wrapper}>
      {shell}
    </button>
  );
}
