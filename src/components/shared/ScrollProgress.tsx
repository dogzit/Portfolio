"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const p = scrollTop / (scrollHeight - clientHeight);
      setProgress(Number.isNaN(p) ? 0 : p);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] bg-white/[0.04] pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
          transition: "transform 0.05s linear",
        }}
      />
    </div>
  );
}
