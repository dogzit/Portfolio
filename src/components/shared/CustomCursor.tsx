"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { damping: 22, stiffness: 180, mass: 0.4 });
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 180, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring — follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:   hovering ? 44 : clicking ? 22 : 32,
          height:  hovering ? 44 : clicking ? 22 : 32,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? "rgba(96,165,250,0.7)" : "rgba(59,130,246,0.35)",
          backgroundColor: hovering ? "rgba(59,130,246,0.08)" : "rgba(0,0,0,0)",
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Inner dot — follows exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:  hovering ? 0 : 5,
          height: hovering ? 0 : 5,
          opacity: visible ? 1 : 0,
          backgroundColor: "#3b82f6",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Glow trail — subtler, behind the ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:  hovering ? 80 : 56,
          height: hovering ? 80 : 56,
          opacity: visible ? (hovering ? 0.12 : 0.06) : 0,
        }}
        transition={{ duration: 0.3 }}
        aria-hidden
      >
        <div
          className="w-full h-full rounded-full blur-xl"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
        />
      </motion.div>
    </>
  );
}
