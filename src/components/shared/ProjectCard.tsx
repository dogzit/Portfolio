"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d14]/70 backdrop-blur-xl h-full"
      style={{
        boxShadow: hovered
          ? `0 0 60px ${project.accentColor}18, 0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`
          : "0 4px 24px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.5s ease",
      }}
    >
      {/* Left accent border */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] z-10"
        animate={{ opacity: hovered ? 1 : 0.35 }}
        transition={{ duration: 0.4 }}
        style={{ background: `linear-gradient(to bottom, transparent, ${project.accentColor}, transparent)` }}
      />

      {/* Watermark number */}
      <div
        className="absolute -right-3 -top-6 font-black select-none pointer-events-none leading-none z-0"
        style={{
          fontSize: featured ? "160px" : "120px",
          color: project.accentColor,
          opacity: hovered ? 0.07 : 0.03,
          transition: "opacity 0.5s ease",
        }}
      >
        {num}
      </div>

      {/* Hover grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.04 : 0,
          backgroundImage: `linear-gradient(${project.accentColor}60 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}60 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial corner glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse 70% 50% at 100% 0%, ${project.accentColor}0a 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-6 pl-8 flex flex-col h-full">
        {/* Top row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold" style={{ color: `${project.accentColor}90` }}>
              {num}
            </span>
            <span className="text-[10px] font-mono text-white/20 tracking-wider uppercase">{project.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} accentColor={project.accentColor} />
            <AnimatePresence>
              {hovered && (
                <>
                  {project.links.github && project.links.github !== "#" && (
                    <motion.a
                      key="github"
                      initial={{ opacity: 0, x: 8, scale: 0.85 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.85 }}
                      transition={{ duration: 0.18 }}
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-[11px] text-white/60 hover:text-white hover:border-white/20 transition-colors"
                    >
                      <GitBranch size={11} />
                      Code
                    </motion.a>
                  )}
                  {project.links.live && (
                    <motion.a
                      key="live"
                      initial={{ opacity: 0, x: 8, scale: 0.85 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.85 }}
                      transition={{ duration: 0.18, delay: 0.04 }}
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors"
                      style={{
                        background: `${project.accentColor}18`,
                        border: `1px solid ${project.accentColor}45`,
                        color: project.accentColor,
                      }}
                    >
                      <ExternalLink size={11} />
                      Live
                    </motion.a>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Title + tagline */}
        <div className="mb-4">
          <h3
            className={`font-bold tracking-tight transition-colors duration-300 ${featured ? "text-3xl" : "text-xl"}`}
            style={{ color: hovered ? "#ffffff" : "#f0f0f8" }}
          >
            {project.title}
          </h3>
          <p className="text-sm mt-1" style={{ color: `${project.accentColor}80` }}>
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-white/45 leading-relaxed mb-5">{project.description}</p>

        {/* Highlights */}
        <div
          className="space-y-2.5 py-4 mb-5 border-t border-b"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          {project.highlights.map((h) => (
            <div key={h.label} className="flex items-center gap-3 text-sm">
              <span className="text-sm w-5 shrink-0">{h.icon}</span>
              <span className="text-[11px] font-mono text-white/30 min-w-[100px]">{h.label}</span>
              <span className="text-[11px] font-mono" style={{ color: `${project.accentColor}70` }}>
                →
              </span>
              <span className="text-sm text-white/60">{h.value}</span>
            </div>
          ))}
        </div>

        {/* Bottom: tags + metrics */}
        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded font-mono"
                style={{
                  background: `${project.accentColor}0e`,
                  border: `1px solid ${project.accentColor}22`,
                  color: `${project.accentColor}80`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {project.metrics && (
            <div className="flex gap-4 shrink-0">
              {project.metrics.slice(0, featured ? 3 : 2).map((m) => (
                <div key={m.label} className="text-right">
                  <p className="text-sm font-bold leading-none" style={{ color: project.accentColor }}>
                    {m.value}
                  </p>
                  <p className="text-[10px] text-white/25 mt-1 font-mono">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function StatusBadge({
  status,
  accentColor,
}: {
  status: Project["status"];
  accentColor: string;
}) {
  if (status === "Live") {
    return (
      <span
        className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono border"
        style={{
          background: `${accentColor}12`,
          borderColor: `${accentColor}30`,
          color: accentColor,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: accentColor }}
        />
        Live
      </span>
    );
  }
  if (status === "In Progress") {
    return (
      <span className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono bg-amber-500/10 border border-amber-500/25 text-amber-400">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Building
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono bg-zinc-500/10 border border-zinc-500/20 text-zinc-400">
      Archived
    </span>
  );
}
