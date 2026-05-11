"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { ArrowDown, Download, Sparkles, Zap, Trophy, Code2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { BIO } from "@/lib/data";

// ── Spring config ──────────────────────────────────────────────────────────────
const SPRING = { stiffness: 240, damping: 22, mass: 0.6 };

// ── Role cycler ────────────────────────────────────────────────────────────────
function RoleCycler() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % BIO.roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-block overflow-hidden h-[1.3em] align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={BIO.roles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="block text-electric-bright/80"
        >
          {BIO.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── 3D Tilt card wrapper ───────────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
  intensity = 12,
  glowColor = "rgba(59,130,246,0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]), SPRING);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]), SPRING);
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), SPRING) as MotionValue<number>;
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), SPRING) as MotionValue<number>;
  const scale = useSpring(1, SPRING);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
    scale.set(1.02);
  }, [rawX, rawY, scale]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
  }, [rawX, rawY, scale]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d", transformPerspective: 800 }}
      className={`relative ${className}`}
    >
      {/* Dynamic specular highlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor} 0%, transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// ── Animated mesh blob ─────────────────────────────────────────────────────────
function MeshBlob({
  color,
  size,
  x,
  y,
  duration,
  delay = 0,
}: {
  color: string;
  size: number;
  x: [string, string, string];
  y: [string, string, string];
  duration: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-[80px] pointer-events-none"
      style={{ width: size, height: size, background: color, left: x[0], top: y[0] }}
      animate={{ left: x, top: y }}
      transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
    />
  );
}

// ── Stat card (with 3D tilt) ───────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  value,
  label,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <TiltCard intensity={8} glowColor={`${color}25`} className="group">
        <div
          className="rounded-2xl px-4 py-3 flex items-center gap-3 border"
          style={{
            background: "rgba(13,13,20,0.75)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.07)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <Icon size={14} style={{ color }} />
          </motion.div>
          <div>
            <motion.p
              className="text-sm font-bold leading-none"
              style={{ color }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", ...SPRING }}
            >
              {value}
            </motion.p>
            <p className="text-[10px] text-white/30 font-mono mt-0.5">{label}</p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050508" }}
    >
      {/* ── Animated gradient mesh ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <MeshBlob color="rgba(59,130,246,0.12)" size={600} x={["10%", "35%", "15%"]} y={["5%", "20%", "10%"]} duration={18} />
        <MeshBlob color="rgba(139,92,246,0.09)" size={500} x={["60%", "75%", "55%"]} y={["10%", "30%", "5%"]} duration={22} delay={3} />
        <MeshBlob color="rgba(6,182,212,0.07)" size={400} x={["20%", "5%", "40%"]} y={["60%", "75%", "55%"]} duration={20} delay={6} />
        <MeshBlob color="rgba(59,130,246,0.06)" size={350} x={["70%", "55%", "80%"]} y={["65%", "50%", "80%"]} duration={25} delay={2} />
        <MeshBlob color="rgba(168,85,247,0.05)" size={300} x={["40%", "60%", "30%"]} y={["40%", "55%", "35%"]} duration={19} delay={8} />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* ── Left — Text ── */}
          <div>
            {/* Availability badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border"
                style={{ background: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.22)", color: "#93c5fd" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.p variants={fadeUp} className="text-sm font-mono text-white/30 tracking-[0.2em] uppercase mb-3">
              Hi, I&apos;m
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 leading-none"
            >
              <span className="shimmer-text">Zolbayar</span>
            </motion.h1>
            <motion.h2 variants={fadeUp} className="text-xl md:text-2xl font-semibold text-white/40 mb-7">
              <RoleCycler />
            </motion.h2>

            {/* Bio */}
            <motion.p variants={fadeUp} className="text-sm md:text-base text-white/50 leading-relaxed mb-2 max-w-lg">
              {BIO.story}
            </motion.p>
            <motion.p variants={fadeUp} className="text-xs text-white/25 font-mono mb-10 max-w-lg">
              {BIO.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <MagneticButton href="#work">
                <span className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200"
                  style={{ background: "#3b82f6", boxShadow: "0 0 24px rgba(59,130,246,0.35), 0 4px 12px rgba(0,0,0,0.3)" }}>
                  <Sparkles size={15} />
                  View Work
                </span>
              </MagneticButton>
              <MagneticButton href="#contact">
                <span className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/70 font-medium text-sm border border-white/[0.09] hover:border-electric/30 hover:text-white transition-all duration-200"
                  style={{ background: "rgba(13,13,20,0.6)", backdropFilter: "blur(12px)" }}>
                  Let&apos;s Talk
                </span>
              </MagneticButton>
              <MagneticButton href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <span className="flex items-center gap-2 px-5 py-3 rounded-xl text-white/40 font-medium text-sm border border-white/[0.07] hover:border-white/15 hover:text-white/70 transition-all duration-200">
                  <Download size={14} />
                  Resume
                </span>
              </MagneticButton>
            </motion.div>

            {/* Motto */}
            <motion.p variants={fadeUp} className="mt-8 text-xs font-mono text-white/20 italic">
              &ldquo;{BIO.headline}&rdquo;
            </motion.p>
          </div>

          {/* ── Right — Photo + floating cards ── */}
          <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-end gap-6">

            {/* Stat row — top */}
            <div className="flex gap-3 self-stretch justify-end">
              <StatCard
                icon={Trophy}
                value="2×"
                label="Hackathons"
                color="#f59e0b"
                delay={0.9}
              />
              <StatCard icon={Code2} value="15+" label="Projects" color="#60a5fa" delay={1.0} />
              <StatCard icon={Zap} value="17" label="Years old" color="#a78bfa" delay={1.1} />
            </div>

            {/* Profile photo — 3D tilt */}
            <TiltCard intensity={10} glowColor="rgba(59,130,246,0.18)" className="group">
              <ProfilePhoto />
            </TiltCard>

          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-[10px] text-white/20 font-mono tracking-widest uppercase">Scroll</p>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <ArrowDown size={13} className="text-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Profile photo ──────────────────────────────────────────────────────────────
function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="relative rounded-3xl overflow-hidden border w-full max-w-[320px]"
      style={{
        background: "rgba(13,13,20,0.7)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(255,255,255,0.08)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.07)",
        aspectRatio: "320 / 380",
      }}
    >
      {/* Inner glow ring */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.12)" }} />

      {/* Corner accent dots */}
      {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
        <div key={pos} className={`absolute ${pos} w-1 h-1 rounded-full bg-electric/40`} />
      ))}

      {/* Photo or placeholder */}
      {imgError ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <p className="text-6xl font-black gradient-text font-mono">ZB</p>
          <p className="text-xs text-white/20 font-mono">/images/profile.jpg</p>
        </div>
      ) : (
        <Image
          src="/images/profile.jpg"
          alt="Zolbayar"
          fill
          className="object-cover object-top"
          priority
          onError={() => setImgError(true)}
        />
      )}

      {/* Bottom glass strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ background: "linear-gradient(to top, rgba(5,5,8,0.9) 0%, transparent 100%)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <p className="text-sm font-bold text-white/80">Zolbayar</p>
        <p className="text-[11px] text-white/35 font-mono">Full-Stack Developer · Mongolia</p>
      </motion.div>

      {/* Available badge */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 top-8 rounded-xl px-3 py-2 border hidden sm:block"
        style={{
          background: "rgba(13,13,20,0.85)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <p className="text-xs font-mono text-white/60">Available</p>
        </div>
      </motion.div>

      {/* Stack badge */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-3 bottom-24 rounded-xl px-3 py-2 border hidden sm:block"
        style={{
          background: "rgba(13,13,20,0.85)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(59,130,246,0.2)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <p className="text-xs font-mono text-electric-bright/70">Next.js · Prisma</p>
      </motion.div>
    </div>
  );
}
