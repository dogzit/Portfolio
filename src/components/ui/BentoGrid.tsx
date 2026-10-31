"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { confetti } from "@/lib/confetti";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * A bento tile grid — the layout idea from Aceternity's `BentoGrid`, rebuilt
 * on the lattice grammar this site already uses.
 *
 * The original is a set of floating `rounded-3xl` cards on black with gradient
 * fills and a 3D globe in one cell. Here the grid itself is painted in the
 * line colour and each tile repaints the background over it, so the 1px gaps
 * *are* the rules — same trick as `.lattice`, which means the bento lines up
 * with the rest of the page instead of hovering above it.
 */
export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

type TileProps = {
  children?: React.ReactNode;
  className?: string;
  /** Mono label in the tile's top-left, as on a drawing sheet. */
  label?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

/**
 * One tile. Tracks the cursor and lifts a faint clay wash under it — the
 * hover-spotlight pattern from the template's cards, at an opacity that reads
 * on paper. The wash is a separate absolutely-positioned layer so it never
 * tints the text sitting on top of it.
 */
export function BentoTile({ children, className, label, title, description }: TileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [lit, setLit] = useState(false);

  const wash = useMotionTemplate`radial-gradient(16rem circle at ${mx}px ${my}px, var(--accent-soft), transparent 70%)`;

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerEnter={() => setLit(true)}
      onPointerLeave={() => setLit(false)}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden bg-background p-6 sm:p-7",
        className,
      )}
    >
      {!reduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: wash }}
          animate={{ opacity: lit ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative">
        {label && <span className="cell-label">{label}</span>}
        {title && (
          <h3 className="font-display text-display-sm mt-3 text-foreground">{title}</h3>
        )}
        {description && (
          <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>
        )}
      </div>

      {children && <div className="relative mt-6">{children}</div>}
    </div>
  );
}

/**
 * The copy-to-clipboard tile. The template celebrates this with a Lottie
 * animation; `confetti()` does the same job from the burst's own origin —
 * the button you just pressed — with no dependency behind it.
 */
export function CopyTile({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      // Throw the paper from the button itself, not the middle of the screen.
      const r = ref.current?.getBoundingClientRect();
      confetti(
        r
          ? { x: r.left + r.width / 2, y: r.top + r.height / 2, count: 26, power: 11 }
          : { count: 26, power: 11 },
      );

      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard denied — the address is selectable text above, so no fallback. */
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy ${value}`}
      className="group/copy inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 font-mono text-[12px] text-foreground transition-colors duration-200 hover:border-foreground hover:bg-surface"
    >
      {copied ? (
        <Check size={13} className="text-positive" />
      ) : (
        <Copy size={13} className="text-faint transition-colors group-hover/copy:text-accent" />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}
