"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. Keep this small. */
  max?: number;
  /** Lifts the card toward the viewer on hover, in px. */
  lift?: number;
};

/**
 * Tilts toward the cursor on hover.
 *
 * This is the useful half of Aceternity's `PinContainer`. That component locks
 * the card at `rotateX(70deg)` and floats a glowing pin out of it, which is a
 * lot of theatre for a project card and unreadable while it's mid-rotation.
 * What's actually nice is the sense that the card is a physical object, so
 * that's all this keeps: the rotation tracks the pointer, maxes out at a few
 * degrees, and runs through a spring so it settles instead of snapping.
 *
 * Off entirely without a hover-capable pointer (every touch device would
 * otherwise get a card stuck at whatever angle it was last tapped) and under
 * `prefers-reduced-motion`. In both cases it renders a plain wrapper, so the
 * children never need to know.
 */
export function TiltCard({ children, className, max = 5, lift = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hovered = useMotionValue(0);

  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const z = useSpring(useTransform(hovered, [0, 1], [0, lift]), spring);

  if (reduced || !canHover) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("[perspective:1400px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerEnter={() => hovered.set(1)}
        onPointerLeave={() => {
          hovered.set(0);
          px.set(0);
          py.set(0);
        }}
        style={{ rotateX, rotateY, translateZ: z, transformStyle: "preserve-3d" }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
