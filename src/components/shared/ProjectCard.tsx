"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, Plus, Minus } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(featured);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative border-b border-white/[0.05] last:border-0"
    >
      {/* Left accent bar — slides in when expanded */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
        animate={{ opacity: expanded ? 1 : 0, scaleY: expanded ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: `linear-gradient(to bottom, transparent, ${project.accentColor}, transparent)`, transformOrigin: "top" }}
      />

      {/* ── Collapsed header row ── */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 md:gap-8 py-6 pl-5 pr-4 text-left group"
      >
        {/* Big watermark number */}
        <span
          className="text-3xl md:text-4xl font-black font-mono w-12 shrink-0 leading-none select-none transition-all duration-300"
          style={{ color: expanded ? `${project.accentColor}60` : "rgba(255,255,255,0.07)" }}
        >
          {num}
        </span>

        {/* Title + tagline */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-xl font-bold text-white/70 group-hover:text-white transition-colors duration-200 leading-tight">
            {project.title}
          </h3>
          <p
            className="text-xs md:text-sm mt-0.5 transition-colors duration-300"
            style={{ color: expanded ? `${project.accentColor}70` : "rgba(255,255,255,0.25)" }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Tech preview — desktop only */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-white/20 tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        {/* Year */}
        <span className="hidden md:block text-xs font-mono text-white/20 shrink-0 tabular-nums">
          {project.year}
        </span>

        {/* Status */}
        <StatusBadge status={project.status} accentColor={project.accentColor} />

        {/* Expand toggle */}
        <motion.div
          animate={{ rotate: expanded ? 0 : 0 }}
          className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-white/20 transition-colors"
          style={{ background: expanded ? `${project.accentColor}12` : "transparent", borderColor: expanded ? `${project.accentColor}35` : undefined }}
        >
          {expanded
            ? <Minus size={11} style={{ color: project.accentColor }} />
            : <Plus size={11} className="text-white/30" />
          }
        </motion.div>
      </button>

      {/* ── Expanded panel ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-8 pl-[72px] pr-4 md:pr-8">

              {/* Subtle accent glow */}
              <div
                className="absolute left-0 right-0 h-px opacity-30"
                style={{ background: `linear-gradient(to right, ${project.accentColor}40, transparent 60%)` }}
              />

              {/* Description */}
              <p className="text-sm text-white/45 leading-relaxed mb-6 max-w-2xl">
                {project.description}
              </p>

              {/* Highlights + metrics side by side */}
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                {/* Highlights */}
                <div className="flex-1 space-y-2">
                  {project.highlights.map((h) => (
                    <div key={h.label} className="flex items-center gap-3 text-sm">
                      <span className="text-base w-5 shrink-0">{h.icon}</span>
                      <span className="text-[11px] font-mono text-white/25 w-24 shrink-0">{h.label}</span>
                      <span className="text-[11px] font-mono shrink-0" style={{ color: `${project.accentColor}55` }}>→</span>
                      <span className="text-sm text-white/55">{h.value}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div className="flex gap-6 md:gap-8 shrink-0">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-xl font-bold leading-none" style={{ color: project.accentColor }}>
                          {m.value}
                        </p>
                        <p className="text-[10px] text-white/25 mt-1.5 font-mono uppercase tracking-wide">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom: tags + links */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] rounded font-mono"
                      style={{
                        background: `${project.accentColor}0d`,
                        border: `1px solid ${project.accentColor}20`,
                        color: `${project.accentColor}70`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.links.github && project.links.github !== "#" && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[11px] text-white/50 hover:text-white hover:border-white/20 transition-colors font-mono"
                    >
                      <GitBranch size={11} />
                      Code
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-colors"
                      style={{
                        background: `${project.accentColor}15`,
                        border: `1px solid ${project.accentColor}35`,
                        color: project.accentColor,
                      }}
                    >
                      <ExternalLink size={11} />
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function StatusBadge({ status, accentColor }: { status: Project["status"]; accentColor: string }) {
  if (status === "Live") {
    return (
      <span
        className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono border shrink-0"
        style={{ background: `${accentColor}10`, borderColor: `${accentColor}28`, color: accentColor }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
        Live
      </span>
    );
  }
  if (status === "In Progress") {
    return (
      <span className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Building
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono bg-zinc-500/10 border border-zinc-500/20 text-zinc-500 shrink-0">
      Archived
    </span>
  );
}
