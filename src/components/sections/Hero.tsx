"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { SpotlightEffect } from "@/components/shared/SpotlightEffect";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { BIO } from "@/lib/data";

function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % BIO.roles.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-flex items-center gap-1 relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={BIO.roles[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-electric-bright/70"
        >
          {BIO.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full opacity-[0.03] blur-3xl"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
        />
      </div>

      <SpotlightEffect className="w-full">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left — Text */}
            <div>
              {/* Eyebrow badge */}
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-electric/10 border border-electric/20 text-electric-bright">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.p
                variants={fadeUp}
                className="text-sm font-mono text-muted/60 tracking-widest uppercase mb-3"
              >
                Hi, I&apos;m
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2"
              >
                <span className="shimmer-text">Zolbayar</span>
              </motion.h1>
              <motion.h2
                variants={fadeUp}
                className="text-xl md:text-2xl font-semibold text-muted mb-6"
              >
                <RoleCycler />
              </motion.h2>

              {/* Story */}
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-muted/80 leading-relaxed mb-3 max-w-lg"
              >
                {BIO.story}
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-sm text-muted/40 font-mono mb-10 max-w-lg"
              >
                {BIO.tagline}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <MagneticButton href="#work">
                  <span className="flex items-center gap-2 px-6 py-3 rounded-xl bg-electric text-white font-semibold text-sm shadow-lg shadow-electric/20 hover:bg-electric/90 transition-all duration-200">
                    <Sparkles size={15} />
                    View Work
                  </span>
                </MagneticButton>
                <MagneticButton href="#contact">
                  <span className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/[0.08] text-foreground/80 font-medium text-sm hover:border-electric/30 hover:text-foreground transition-all duration-200">
                    Let&apos;s Talk
                  </span>
                </MagneticButton>
                <MagneticButton href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] text-muted/60 font-medium text-sm hover:border-white/20 hover:text-muted/90 transition-all duration-200">
                    <Download size={14} />
                    Resume
                  </span>
                </MagneticButton>
              </motion.div>

              {/* Motto */}
              <motion.p
                variants={fadeUp}
                className="mt-8 text-xs font-mono text-muted/30 italic"
              >
                &ldquo;{BIO.headline}&rdquo;
              </motion.p>
            </div>

            {/* Right — Profile Photo */}
            <motion.div variants={fadeUp} className="flex justify-center lg:justify-end">
              <ProfilePhoto />
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <p className="text-xs text-muted/30 font-mono tracking-widest uppercase">Scroll</p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown size={14} className="text-muted/30" />
            </motion.div>
          </motion.div>
        </div>
      </SpotlightEffect>
    </section>
  );
}

function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, #8b5cf6 50%, transparent 70%)" }}
      />

      {/* Rotating ring */}
      <div className="absolute -inset-3 rounded-full border border-electric/10 animate-spin-slow pointer-events-none" />
      <div
        className="absolute -inset-6 rounded-full border border-dashed border-electric/5 pointer-events-none"
        style={{ animation: "spin 20s linear infinite reverse" }}
      />

      {/* Photo frame */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
        {/* Electric border glow */}
        <div className="absolute inset-0 rounded-full ring-1 ring-electric/20 z-10 pointer-events-none" />

        {imgError ? (
          /* Placeholder when no image */
          <div className="w-full h-full flex flex-col items-center justify-center bg-surface-2">
            <p className="text-5xl font-bold gradient-text font-mono">ZB</p>
            <p className="text-xs text-muted/40 font-mono mt-2">profile.jpg</p>
          </div>
        ) : (
          <Image
            src="/images/profile.jpg"
            alt="Zolbayar — Full-Stack Developer"
            fill
            className="object-cover object-top"
            priority
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Floating — Available badge */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 -right-4 glass rounded-xl px-3 py-2 border border-white/[0.08] shadow-xl"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <p className="text-xs font-mono text-foreground/70">Available</p>
        </div>
      </motion.div>

      {/* Floating — Stack badge */}
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -top-2 -left-6 glass rounded-xl px-3 py-2 border border-white/[0.08] shadow-xl"
      >
        <p className="text-xs font-mono text-electric-bright/70">Next.js · Prisma</p>
      </motion.div>
    </div>
  );
}
