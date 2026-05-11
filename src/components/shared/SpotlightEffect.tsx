"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SpotlightEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightEffect({ children, className }: SpotlightEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, top } = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - top}px`);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("spotlight-container", className)}
    >
      {children}
    </div>
  );
}
