"use client";

import { useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { X, ExternalLink, GitBranch, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { Project } from "@/types";
import { fadeUp, viewportConfig } from "@/lib/animations";

// ── Spring config ─────────────────────────────────────────────────────────────
const SPRING = { type: "spring" as const, stiffness: 280, damping: 26, mass: 0.7 };

// ── Bento cell layout config (desktop 3-col grid) ────────────────────────────
// Each entry: [colStart, colEnd, rowStart, rowEnd]
const GRID_DESKTOP: [number, number, number, number][] = [
  [1, 3, 1, 3], // 0 SIDEQUEST       — large 2×2
  [3, 4, 1, 2], // 1 Surguuli        — right top
  [3, 4, 2, 3], // 2 Smart Canteen   — right mid
  [1, 2, 3, 4], // 3 RentlyMN        — small
  [2, 3, 3, 4], // 4 FitBet          — small
  [3, 4, 3, 4], // 5 Open Mic        — small
  [1, 2, 4, 5], // 6 School Hub      — small
  [2, 4, 4, 5], // 7 IG Clone        — wide 2×1
  [1, 3, 5, 6], // 8 Pinetour        — wide 2×1
  [3, 4, 5, 6], // 9 Erhes Tenger    — small
];

// Tablet 2-col grid positions
const GRID_TABLET: [number, number, number, number][] = [
  [1, 3, 1, 3], // 0 SIDEQUEST       — large 2×2
  [1, 2, 3, 4], // 1 Surguuli
  [2, 3, 3, 4], // 2 Smart Canteen
  [1, 2, 4, 5], // 3 RentlyMN
  [2, 3, 4, 5], // 4 FitBet
  [1, 2, 5, 6], // 5 Open Mic
  [2, 3, 5, 6], // 6 School Hub
  [1, 3, 6, 7], // 7 IG Clone        — wide 2×1
  [1, 2, 7, 8], // 8 Pinetour
  [2, 3, 7, 8], // 9 Erhes Tenger
];

// ── Filter chips ──────────────────────────────────────────────────────────────
type Filter = {
  id: string;
  label: string;
  test: (p: Project) => boolean;
};
const FILTERS: Filter[] = [
  { id: "all", label: "All", test: () => true },
  { id: "live", label: "Live", test: (p) => p.status === "Live" },
  { id: "wip", label: "In Progress", test: (p) => p.status === "In Progress" },
  { id: "team", label: "Team Lead", test: (p) => p.tags.includes("Team Lead") },
];

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusDot({ status, color }: { status: Project["status"]; color: string }) {
  if (status === "Live")
    return <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />;
  if (status === "In Progress")
    return <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />;
  return null;
}

// ── Bento card (grid item) ────────────────────────────────────────────────────
function BentoCard({
  project,
  desktopPos,
  tabletPos,
  index,
  isSelected,
  onSelect,
}: {
  project: Project;
  desktopPos: [number, number, number, number];
  tabletPos: [number, number, number, number];
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [cs, ce, rs, re] = desktopPos;
  const [tcs, tce, trs, tre] = tabletPos;
  const isBig = ce - cs >= 2 && re - rs >= 2;
  const isWide = ce - cs >= 2 && re - rs === 1;

  return (
    <div
      className="bento-cell"
      style={{
        // Mobile: single column, no explicit grid placement
        // Tablet & desktop positions via CSS custom properties
        "--col-md": `${tcs} / ${tce}`,
        "--row-md": `${trs} / ${tre}`,
        "--col-lg": `${cs} / ${ce}`,
        "--row-lg": `${rs} / ${re}`,
        visibility: isSelected ? "hidden" : "visible",
      } as React.CSSProperties}
    >
      <motion.div
        layoutId={`bento-${project.id}`}
        onClick={onSelect}
        className="gradient-border relative h-full min-h-[140px] rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          background: "rgba(13,13,20,0.8)",
          border: `1px solid rgba(255,255,255,0.07)`,
          backdropFilter: "blur(12px)",
          "--accent": `${project.accentColor}80`,
        } as React.CSSProperties}
        whileHover={{ scale: 1.018, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING}
      >
        {/* Accent corner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${project.accentColor}18 0%, transparent 70%)`,
          }}
        />

        {/* Left accent bar */}
        <div
          className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to bottom, transparent, ${project.accentColor}, transparent)` }}
        />

        {/* Watermark number */}
        <div
          className="absolute -right-2 -bottom-4 font-black select-none pointer-events-none leading-none opacity-[0.035] group-hover:opacity-[0.07] transition-opacity duration-500"
          style={{ fontSize: isBig ? 140 : 90, color: project.accentColor }}
        >
          {String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}
        </div>

        <div className={`relative z-10 flex flex-col h-full ${isBig ? "p-7" : "p-5"}`}>
          {/* Top row */}
          <div className="flex items-center justify-between mb-auto">
            <div className="flex items-center gap-2">
              <StatusDot status={project.status} color={project.accentColor} />
              <span className="text-[10px] font-mono text-white/25 tracking-wider">{project.year}</span>
            </div>
            <ArrowUpRight
              size={14}
              className="text-white/15 group-hover:text-white/50 transition-colors"
            />
          </div>

          {/* Content */}
          <div className="mt-4">
            {isBig && (
              <p className="text-[10px] font-mono tracking-widest uppercase mb-2 opacity-60"
                style={{ color: project.accentColor }}>
                {project.tags[0]} · {project.tags[1]}
              </p>
            )}
            <h3
              className={`font-bold leading-tight text-white/80 group-hover:text-white transition-colors ${isBig ? "text-2xl" : isWide ? "text-xl" : "text-base"}`}
            >
              {project.title}
            </h3>
            <p
              className={`mt-1 font-mono ${isBig ? "text-sm" : "text-xs"}`}
              style={{ color: `${project.accentColor}70` }}
            >
              {project.tagline}
            </p>
            {isBig && (
              <p className="mt-3 text-sm text-white/35 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            )}
          </div>

          {/* Tag pills — big card only */}
          {isBig && (
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono"
                  style={{ background: `${project.accentColor}12`, border: `1px solid ${project.accentColor}25`, color: `${project.accentColor}80` }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Flat card (uniform grid view used when filtering) ────────────────────────
function FlatCard({
  project,
  index,
  isSelected,
  onSelect,
}: {
  project: Project;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.28, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ visibility: isSelected ? "hidden" : "visible" }}
    >
      <motion.div
        layoutId={`bento-${project.id}`}
        onClick={onSelect}
        whileHover={{ scale: 1.018 }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING}
        className="gradient-border relative rounded-2xl overflow-hidden cursor-pointer group min-h-[180px] h-full"
        style={{
          background: "rgba(13,13,20,0.8)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          "--accent": `${project.accentColor}80`,
        } as React.CSSProperties}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${project.accentColor}18 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to bottom, transparent, ${project.accentColor}, transparent)` }}
        />
        <div className="relative z-10 flex flex-col h-full p-5">
          <div className="flex items-center justify-between mb-auto">
            <div className="flex items-center gap-2">
              <StatusDot status={project.status} color={project.accentColor} />
              <span className="text-[10px] font-mono text-white/25 tracking-wider">{project.year}</span>
            </div>
            <ArrowUpRight size={14} className="text-white/15 group-hover:text-white/50 transition-colors" />
          </div>
          <div className="mt-4">
            <h3 className="font-bold leading-tight text-base text-white/80 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs" style={{ color: `${project.accentColor}70` }}>
              {project.tagline}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Expanded overlay card ─────────────────────────────────────────────────────
function ExpandedCard({ project, onClose }: { project: Project; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{ backgroundColor: "rgba(5,5,8,0.85)" }}
      exit={{ backgroundColor: "rgba(0,0,0,0)" }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{ backdropFilter: "blur(12px)" }}
    >
      {/* Expanded card — same layoutId as grid card */}
      <motion.div
        layoutId={`bento-${project.id}`}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: "rgba(10,10,16,0.98)",
          border: `1px solid rgba(255,255,255,0.09)`,
          boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px ${project.accentColor}18`,
        }}
        transition={SPRING}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}60, transparent)` }} />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 40% at 50% 0%, ${project.accentColor}10 0%, transparent 70%)` }}
        />

        <div className="relative z-10 p-5 sm:p-7 md:p-9">
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.15, duration: 0.2 }}
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <X size={14} />
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <StatusDot status={project.status} color={project.accentColor} />
              <span className="text-[10px] font-mono text-white/30 tracking-widest">{project.year}</span>
              <span className="text-white/15">·</span>
              <span className="text-[10px] font-mono" style={{ color: `${project.accentColor}70` }}>
                {project.status}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-2">
              {project.title}
            </h2>
            <p className="text-base font-mono mb-5" style={{ color: `${project.accentColor}80` }}>
              {project.tagline}
            </p>
            <p className="text-sm text-white/50 leading-relaxed mb-7">
              {project.description}
            </p>
          </motion.div>

          {/* Highlights */}
          {project.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.17, duration: 0.3 }}
              className="space-y-2.5 py-5 border-t border-b mb-6"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              {project.highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-2 sm:gap-3 text-sm">
                  <span className="w-5 shrink-0 hidden sm:block">{h.icon}</span>
                  <span className="text-[11px] font-mono text-white/25 w-20 sm:w-24 shrink-0">{h.label}</span>
                  <span className="text-[11px] font-mono shrink-0" style={{ color: `${project.accentColor}50` }}>→</span>
                  <span className="text-sm text-white/55">{h.value}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Metrics */}
          {project.metrics && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex flex-wrap gap-4 sm:gap-8 mb-7"
            >
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-2xl font-black leading-none" style={{ color: project.accentColor }}>{m.value}</p>
                  <p className="text-[10px] text-white/25 mt-1 font-mono uppercase tracking-wide">{m.label}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tags + links */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.23, duration: 0.3 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[10px] rounded-lg font-mono"
                  style={{ background: `${project.accentColor}0e`, border: `1px solid ${project.accentColor}22`, color: `${project.accentColor}80` }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {project.links.github && project.links.github !== "#" && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono text-white/50 hover:text-white transition-colors border border-white/[0.07] hover:border-white/20">
                  <GitBranch size={11} /> Code
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-medium transition-colors"
                  style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}38`, color: project.accentColor }}>
                  <ExternalLink size={11} /> Live ↗
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function CaseStudies() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterId, setFilterId] = useState<string>("all");
  const selectedProject = PROJECTS.find((p) => p.id === selected) ?? null;

  const close = useCallback(() => setSelected(null), []);

  const filter = FILTERS.find((f) => f.id === filterId) ?? FILTERS[0];
  const filtered = PROJECTS.filter(filter.test);
  const bentoProjects = PROJECTS.slice(0, GRID_DESKTOP.length);

  return (
    <section id="work" className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-electric/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-8"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-electric/60 tracking-[0.2em] uppercase mb-5">
            {"// 01"} &nbsp; selected work
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Case Studies
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xs font-mono text-white/15 sm:pb-2 shrink-0">
              tap to expand
            </motion.p>
          </div>
          <motion.p variants={fadeUp} className="text-muted/50 text-sm mt-3 max-w-lg leading-relaxed">
            Real problems, real users, real outcomes.
          </motion.p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <LayoutGroup id="filter-chips">
            {FILTERS.map((f) => {
              const count = PROJECTS.filter(f.test).length;
              const active = filterId === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilterId(f.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors ${
                    active ? "text-electric-bright" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-electric/10 border border-electric/25"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {f.label}
                    <span className={`text-[10px] ${active ? "text-electric-bright/70" : "text-white/25"}`}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </motion.div>

        {/* Grid */}
        <LayoutGroup id="case-studies-grid">
          {filterId === "all" ? (
            <motion.div layout className="bento-cases">
              {bentoProjects.map((project, i) => (
                <BentoCard
                  key={project.id}
                  project={project}
                  desktopPos={GRID_DESKTOP[i]}
                  tabletPos={GRID_TABLET[i]}
                  index={i}
                  isSelected={selected === project.id}
                  onSelect={() => setSelected(project.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <FlatCard
                    key={project.id}
                    project={project}
                    index={i}
                    isSelected={selected === project.id}
                    onSelect={() => setSelected(project.id)}
                  />
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <p className="text-sm font-mono text-white/30 col-span-full py-12 text-center">
                  No projects match this filter.
                </p>
              )}
            </motion.div>
          )}

          {/* Expanded overlay */}
          <AnimatePresence>
            {selectedProject && (
              <ExpandedCard
                key={selectedProject.id}
                project={selectedProject}
                onClose={close}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
