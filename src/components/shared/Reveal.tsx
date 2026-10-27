"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in seconds. */
  delay?: number;
  /** Travel distance in px. Keep it small — this should feel like paper settling. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
};

/**
 * Fades content up once as it enters the viewport. Deliberately understated:
 * 14px of travel, one easing curve, and nothing at all for users who asked
 * for reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
