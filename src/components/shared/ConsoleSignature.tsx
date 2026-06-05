"use client";

import { useEffect } from "react";

export function ConsoleSignature() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as unknown as { __zb_signed?: boolean }).__zb_signed) return;
    (window as unknown as { __zb_signed?: boolean }).__zb_signed = true;

    const banner = [
      "%c ZOLBAYAR ",
      "%c Full-Stack Developer · Mongolia ",
      "",
      "%cHey, curious one 👋",
      "%cIf you found this, you're already the kind of person I want to work with.",
      "%cReach out: bolorzoloko@gmail.com",
      "%cGitHub: github.com/dogzit",
    ].join("\n");

    console.log(
      banner,
      "background:#3b82f6;color:#fff;font-weight:700;padding:6px 10px;border-radius:6px 0 0 6px;font-size:13px;",
      "background:#0d0d14;color:#93c5fd;padding:6px 10px;border:1px solid #1f2937;border-left:0;border-radius:0 6px 6px 0;font-size:12px;font-family:monospace;",
      "color:#fff;font-size:14px;font-weight:600;margin-top:8px;",
      "color:#93c5fd;font-size:12px;",
      "color:#60a5fa;font-size:12px;",
      "color:#94a3b8;font-size:11px;font-family:monospace;",
    );
  }, []);

  return null;
}
