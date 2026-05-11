import { Variants, Transition } from "framer-motion";

/* ─── Shared Transitions ─────────────────────────────────────────────────── */
export const smoothTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const gentleTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
};

export const easeTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94],
};

/* ─── Variants ───────────────────────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/* ─── Hover Variants ─────────────────────────────────────────────────────── */
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.015,
    y: -3,
    transition: smoothTransition,
  },
};

export const magneticButton = {
  rest: { x: 0, y: 0 },
  hover: { scale: 1.05, transition: smoothTransition },
  tap: { scale: 0.96, transition: { duration: 0.1 } },
};

/* ─── Viewport Config ────────────────────────────────────────────────────── */
export const viewportConfig = {
  once: true,
  margin: "-80px",
};
