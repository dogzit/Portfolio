"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { confetti } from "@/lib/confetti";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** ↑ ↑ ↓ ↓ ← → ← → B A */
const CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
] as const;

/**
 * The Konami code, which awards XP.
 *
 * SIDEQUEST is a game that hands out XP for doing things in real life, so a
 * portfolio that hands out XP for poking around in it felt like the right
 * joke to make — it's the one easter egg here that's actually about the work.
 *
 * Hidden on purpose: nothing on the page advertises it, so a reviewer reading
 * this as an application never trips over it, and anyone who tries the code
 * on a developer's site gets rewarded for the instinct.
 */
export function Konami() {
  const [open, setOpen] = useState(false);
  const progress = useRef(0);
  const timer = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const dismiss = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't eat the sequence while someone is filling in the contact form.
      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable)
      ) {
        return;
      }

      const want = CODE[progress.current];
      const got = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (got !== want) {
        // A wrong key still counts as a first key if it matches the start.
        progress.current = got === CODE[0] ? 1 : 0;
        return;
      }

      progress.current += 1;
      if (progress.current < CODE.length) return;

      progress.current = 0;
      setOpen(true);
      confetti({ y: window.innerHeight * 0.34, count: 46, power: 15 });
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setOpen(false), 6000);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          // Bottom-right: the music player already owns bottom-left.
          className="fixed right-[clamp(0.875rem,2.5vw,1.75rem)] bottom-[clamp(0.875rem,2.5vw,1.75rem)] z-[9100] max-w-[min(20rem,calc(100vw-1.75rem))]"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
        >
          <div className="border border-line-strong bg-surface p-5 shadow-[var(--shadow-lg)]">
            <p className="eyebrow">
              <span className="dot dot-live" />
              Quest complete
            </p>

            <p className="font-display mt-3 text-xl leading-tight text-foreground">
              +500 XP
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              You found the Konami code. This is roughly how SIDEQUEST works,
              except there you have to actually leave the house.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a href="#work" onClick={dismiss} className="btn btn-ghost">
                See SIDEQUEST
              </a>
              <button onClick={dismiss} className="btn btn-quiet">
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
