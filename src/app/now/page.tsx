import Link from "next/link";
import { ArrowLeft, Briefcase, Code2, GraduationCap, Sparkles, Wrench } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now — Zolbayar",
  description:
    "What I'm focused on right now: current builds, what I'm learning, and where my attention is.",
};

const lastUpdated = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

type NowItem = {
  icon: React.ElementType;
  label: string;
  title: string;
  body: string;
  accent: string;
};

const NOW: NowItem[] = [
  {
    icon: Sparkles,
    label: "Building",
    title: "SIDEQUEST — social RPG for real life",
    body:
      "Lobby system, EXIF photo-verified quests, peer veto voting, TensorFlow.js pushup detection, and a 20-model Prisma schema. Currently smoothing out the coin/XP economy and pushing toward beta.",
    accent: "#d946ef",
  },
  {
    icon: Briefcase,
    label: "Working",
    title: "Frontend Intern at a Mongolian FinTech",
    body:
      "Building production-grade UI components under engineering review, shipping into a real revenue product.",
    accent: "#60a5fa",
  },
  {
    icon: GraduationCap,
    label: "Studying",
    title: "Distributed systems & real-time architectures",
    body:
      "Going deeper on Pusher, WebSockets, Web Push, and the trade-offs between server-actions, REST, and event-driven flows.",
    accent: "#a78bfa",
  },
  {
    icon: Wrench,
    label: "Maintaining",
    title: "Surguuli + earlier client work",
    body:
      "Surguuli (teacher sign-off app) is live in a Mongolian school. Small fixes and Excel import improvements as feedback comes in.",
    accent: "#06b6d4",
  },
  {
    icon: Code2,
    label: "Next up",
    title: "Open-sourcing a slice of SIDEQUEST",
    body:
      "Considering pulling the EXIF photo-proof verification flow into a standalone package — it's the most interesting and reusable piece.",
    accent: "#10b981",
  },
];

export default function NowPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-25"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5), transparent 70%)" }}
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

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 sm:py-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/80 transition-colors mb-12"
        >
          <ArrowLeft size={12} />
          back to home
        </Link>

        <p className="text-xs font-mono text-electric-bright/70 tracking-[0.25em] uppercase mb-5">
          {"// current focus"}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight shimmer-text mb-4">
          Right Now
        </h1>
        <p className="text-sm text-white/45 leading-relaxed max-w-xl mb-3">
          A snapshot of what I&apos;m building, working on, and learning. Inspired by{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-bright/80 hover:text-electric-bright underline-offset-2 hover:underline"
          >
            Derek Sivers&apos; /now movement
          </a>
          .
        </p>
        <p className="text-[11px] font-mono text-white/25 mb-14">
          Last updated · {lastUpdated}
        </p>

        <div className="space-y-4">
          {NOW.map((item, i) => (
            <article
              key={i}
              className="group relative rounded-2xl p-6 border transition-all duration-300 hover:border-white/15 hover:-translate-y-0.5"
              style={{
                background: "rgba(13,13,20,0.6)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="absolute -top-px left-6 right-6 h-px opacity-50 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                }}
              />
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}
                >
                  <item.icon size={16} style={{ color: item.accent }} />
                </div>
                <div className="flex-1">
                  <p
                    className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5"
                    style={{ color: `${item.accent}cc` }}
                  >
                    {item.label}
                  </p>
                  <h2 className="text-base font-semibold text-foreground mb-1.5">
                    {item.title}
                  </h2>
                  <p className="text-sm text-white/55 leading-relaxed">{item.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 text-center text-[11px] font-mono text-white/25">
          Zolbayar · Full-Stack Developer
        </p>
      </div>
    </main>
  );
}
