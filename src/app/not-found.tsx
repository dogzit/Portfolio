import Link from "next/link";
import { ArrowLeft, Home, MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-6">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-xl text-center">
        <p className="text-xs font-mono text-electric-bright/70 tracking-[0.25em] uppercase mb-6">
          {"// error.dispatch(404)"}
        </p>

        <h1 className="text-[120px] sm:text-[180px] font-black leading-none shimmer-text mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          You&apos;ve wandered off the path.
        </h2>

        <p className="text-sm text-white/45 leading-relaxed max-w-md mx-auto mb-10">
          This route doesn&apos;t exist — but the work that does is just one click away.
          Head back to the home base.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all"
            style={{
              background: "#3b82f6",
              boxShadow: "0 0 24px rgba(59,130,246,0.35), 0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <Home size={15} />
            Home
            <MoveRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/#work"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/70 font-medium text-sm border border-white/[0.09] hover:border-electric/30 hover:text-white transition-all"
            style={{ background: "rgba(13,13,20,0.6)", backdropFilter: "blur(12px)" }}
          >
            <ArrowLeft size={14} />
            See my work
          </Link>
        </div>

        <p className="mt-12 text-[10px] font-mono text-white/20 tracking-widest uppercase">
          Zolbayar · Full-Stack Developer
        </p>
      </div>
    </main>
  );
}
