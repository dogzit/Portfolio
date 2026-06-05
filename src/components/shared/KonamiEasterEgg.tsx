"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trophy } from "lucide-react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
] as const;

export function KonamiEasterEgg() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf = [...buf, k].slice(-SEQUENCE.length);
      if (buf.length === SEQUENCE.length && buf.every((c, i) => c === SEQUENCE[i])) {
        setUnlocked(true);
        buf = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    const t = setTimeout(() => setUnlocked(false), 4200);
    return () => clearTimeout(t);
  }, [unlocked]);

  return (
    <AnimatePresence>
      {unlocked && (
        <>
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(59,130,246,0.18), transparent 70%)",
            }}
          />
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-10 z-[9999] pointer-events-none rounded-2xl px-5 py-4 border flex items-center gap-3"
            style={{
              background: "rgba(10,10,16,0.9)",
              backdropFilter: "blur(24px)",
              borderColor: "rgba(59,130,246,0.3)",
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.3)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.4)",
              }}
            >
              <Trophy size={18} className="text-electric-bright" />
            </div>
            <div>
              <p className="text-xs font-mono text-electric-bright tracking-widest uppercase">
                Achievement unlocked
              </p>
              <p className="text-sm font-semibold text-white">
                The Konami Coder · You speak my language.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
