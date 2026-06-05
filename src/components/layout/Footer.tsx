import Link from "next/link";
import { GithubStats } from "@/components/shared/GithubStats";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] opacity-[0.03] blur-[80px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black gradient-text font-mono tracking-tighter">Z</span>
            <div>
              <p className="font-mono text-sm font-semibold text-foreground/80">
                <span className="gradient-text">zoloo</span>
                <span className="text-white/20">.dev</span>
              </p>
              <p className="text-[10px] text-white/20 font-mono">Full-Stack Developer · Mongolia</p>
            </div>
          </div>
          <p className="text-xs text-white/15 font-mono text-center md:text-right max-w-sm">
            Crafting the future of web, one pixel and one query at a time.
          </p>
        </div>

        {/* Live GitHub strip */}
        <div className="flex justify-center mb-8">
          <GithubStats />
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/15 font-mono">
            &copy; 2026 Zolbayar. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/now"
              className="text-[10px] text-white/30 hover:text-electric-bright font-mono transition-colors"
            >
              /now
            </Link>
            <span className="flex items-center gap-1.5 text-[10px] text-white/15 font-mono">
              <span className="w-1 h-1 rounded-full bg-green-400/60 animate-pulse" />
              All systems operational
            </span>
            <p className="text-[10px] text-white/15 font-mono">
              Next.js · Framer Motion · Prisma
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
