"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportConfig } from "@/lib/animations";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  delay?: number;
  glowColor?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
  delay = 0,
  glowColor,
}: BentoCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={cn(
        "glass glass-hover rounded-2xl p-6 relative overflow-hidden",
        "transition-all duration-300",
        className,
      )}
      style={
        glowColor
          ? {
              boxShadow: `0 0 0 1px ${glowColor}22, 0 4px 40px ${glowColor}0a`,
            }
          : undefined
      }
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-[0.04] rounded-bl-full"
        style={{ background: glowColor ?? "var(--electric-blue)" }}
      />
      {children}
    </motion.div>
  );
}
