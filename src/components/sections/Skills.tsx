"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SKILLS } from "@/lib/data";
import { SkillCategory, Skill } from "@/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/shared/BentoGrid";
import { cn } from "@/lib/utils";
import { fadeUp, staggerFast, viewportConfig } from "@/lib/animations";

export function Skills() {
  return (
    <section id="stack" className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="// 02  the stack"
          title="Tools of the Trade"
          description="Every tool chosen deliberately. Frontend for experience, backend for power, workflow for speed."
        />

        <BentoGrid className="md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((cat, i) => (
            <SkillCategoryCard key={cat.name} category={cat} delay={i * 0.12} />
          ))}
        </BentoGrid>

        {/* Tech orbit banner */}
        <TechOrbit />
      </div>
    </section>
  );
}

function SkillCategoryCard({
  category,
  delay,
}: {
  category: SkillCategory;
  delay: number;
}) {
  return (
    <BentoCard delay={delay} glowColor="#3b82f6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xl text-electric-bright font-mono">{category.icon}</span>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
          <p className="text-xs text-muted/50 font-mono">{category.skills.length} tools</p>
        </div>
      </div>

      {/* Skills */}
      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="space-y-4"
      >
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </BentoCard>
  );
}

function SkillBar({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          {skill.name}
        </span>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 4 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-mono text-muted/60"
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})` }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0 rounded-full opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${skill.color}60, transparent)`,
              animation: "shimmer 2s linear infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

const TECH_TAGS = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Prisma", "PostgreSQL", "Node.js", "Framer Motion",
  "Vercel", "Neon DB", "REST API", "Git", "Figma", "Auth.js",
];

function TechOrbit() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-16 py-8 relative overflow-hidden"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--background), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, var(--background), transparent)" }} />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-3 w-max"
      >
        {[...TECH_TAGS, ...TECH_TAGS].map((tag, i) => (
          <span
            key={i}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-mono whitespace-nowrap",
              "glass border border-white/[0.06] text-muted/60",
              "hover:border-electric/30 hover:text-electric-bright transition-all duration-200",
            )}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
