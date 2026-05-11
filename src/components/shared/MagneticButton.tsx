"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * strength;
      const y = (e.clientY - top - height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  }, []);

  const props = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    className: cn("inline-block cursor-pointer", className),
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileTap={{ scale: 0.96 }}
        {...(props as any)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div whileTap={{ scale: 0.96 }} {...(props as any)}>
      {children}
    </motion.div>
  );
}
