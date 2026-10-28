"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { Project } from "@/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";

type Filter = { id: string; label: string; test: (p: Project) => boolean };

const FILTERS: Filter[] = [
  { id: "all", label: "All", test: () => true },
  { id: "live", label: "Live", test: (p) => p.status === "Live" },
  { id: "wip", label: "In progress", test: (p) => p.status === "In Progress" },
  { id: "hack", label: "Hackathon", test: (p) => p.tags.includes("Hackathon") },
];

export function CaseStudies() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterId, setFilterId] = useState("all");

  const selectedProject = PROJECTS.find((p) => p.id === selected) ?? null;
  const close = useCallback(() => setSelected(null), []);

  const filtered = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filterId) ?? FILTERS[0];
    return PROJECTS.filter(f.test);
  }, [filterId]);

  const showFeatured = filterId === "all";
  const featured = PROJECTS[0];
  const list = showFeatured ? PROJECTS.slice(1) : filtered;

  return (
    <section id="work" className="section">
      <div className="shell">
        <SectionHeader
          index="01"
          label="Selected work"
          title="Projects"
          note={`${PROJECTS.length} builds — from a parliament hackathon to a game I'm still writing. Open any one for the details.`}
        />

        {/* Filters */}
        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterId(f.id)}
                className="tab"
                data-active={filterId === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="font-mono text-[11px] text-faint tnum">
            {showFeatured ? PROJECTS.length : filtered.length} shown
          </p>
        </Reveal>

        {/* Featured */}
        {showFeatured && (
          <Reveal delay={0.05}>
            <FeaturedProject
              project={featured}
              onOpen={() => setSelected(featured.id)}
            />
          </Reveal>
        )}

        {/* The list */}
        <ul className="mt-6 border-t border-line">
          {list.map((p, i) => (
            <Reveal as="li" key={p.id} delay={Math.min(i * 0.04, 0.2)}>
              <ProjectRow
                project={p}
                index={showFeatured ? i + 2 : i + 1}
                onOpen={() => setSelected(p.id)}
              />
            </Reveal>
          ))}
        </ul>

        {list.length === 0 && (
          <p className="py-16 text-center font-mono text-sm text-muted">
            Nothing here yet.
          </p>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay project={selectedProject} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Status pill ─────────────────────────────────────────────────────────── */
function Status({ status }: { status: Project["status"] }) {
  const dot =
    status === "Live" ? "dot dot-live" : status === "In Progress" ? "dot dot-wip" : "dot";
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
      <span className={dot} />
      {status}
    </span>
  );
}

/* ── Featured block ──────────────────────────────────────────────────────── */
function FeaturedProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="card card-hover group mt-10 overflow-hidden">
      {project.image && (
        <div className="relative aspect-[16/7] w-full overflow-hidden border-b border-line bg-surface-2">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.tagline}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            priority
          />
        </div>
      )}
      <button onClick={onOpen} className="w-full px-6 py-8 text-left sm:px-10 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-faint tnum">01</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Featured
              </span>
            </div>

            <h3 className="font-display text-display-lg mt-5 text-foreground transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-2 text-base text-muted">{project.tagline}</p>

            <p className="measure mt-6 text-sm leading-relaxed text-ink-soft">
              {project.description}
            </p>

            <span className="link mt-7 inline-flex items-center gap-1.5 text-sm text-accent">
              Read the details
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>

          {/* Right rail: meta */}
          <div className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              <div className="flex items-baseline justify-between py-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  Year
                </dt>
                <dd className="font-mono text-xs text-foreground tnum">{project.year}</dd>
              </div>
              <div className="flex items-baseline justify-between py-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  Status
                </dt>
                <dd>
                  <Status status={project.status} />
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  Focus
                </dt>
                <dd className="text-right text-xs leading-snug text-foreground/80">
                  {project.focus}
                </dd>
              </div>
            </dl>

            {project.metrics && (
              <div className="mt-6 grid grid-cols-3 gap-4">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display tnum text-2xl leading-none text-foreground">
                      {m.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] leading-tight text-faint">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="chip-group mt-6 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 6).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}

/* ── One list row ────────────────────────────────────────────────────────── */
function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <article className="group border-b border-line">
      <button
        onClick={onOpen}
        className="grid w-full grid-cols-[2rem_1fr] items-start gap-x-4 gap-y-3 px-1 py-7 text-left transition-colors duration-300 hover:bg-surface-2/60 sm:grid-cols-[3rem_1fr_auto_auto] sm:gap-x-6 sm:px-3"
      >
        <span className="font-mono text-[11px] text-faint tnum pt-1.5">
          {String(index).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <h3 className="font-display text-2xl leading-tight text-foreground transition-colors group-hover:text-accent sm:text-[1.75rem]">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>
          <p className="measure mt-3 text-sm leading-relaxed text-ink-soft/90">
            {project.description.length > 160
              ? project.description.slice(0, 160).trimEnd() + "…"
              : project.description}
          </p>
          <div className="chip-group mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="chip border-dashed">+{project.tags.length - 4}</span>
            )}
          </div>
        </div>

        {project.image ? (
          <div className="relative hidden h-[88px] w-[150px] shrink-0 overflow-hidden border border-line bg-surface-2 sm:block">
            <Image
              src={project.image}
              alt=""
              fill
              sizes="150px"
              className="object-cover object-top opacity-90 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
            />
          </div>
        ) : (
          <span aria-hidden className="hidden sm:block sm:w-[150px]" />
        )}

        <div className="col-start-2 flex items-center gap-4 sm:col-start-4 sm:flex-col sm:items-end sm:gap-2 sm:pt-1.5">
          <span className="font-mono text-[11px] text-muted tnum">{project.year}</span>
          <Status status={project.status} />
          <ArrowUpRight
            size={15}
            className="text-faint transition-all duration-300 group-hover:text-accent sm:mt-2 sm:opacity-0 sm:group-hover:translate-x-0.5 sm:group-hover:-translate-y-0.5 sm:group-hover:opacity-100"
          />
        </div>
      </button>
    </article>
  );
}

/* ── Detail overlay ──────────────────────────────────────────────────────── */
function ProjectOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  // Escape to close + lock the page behind the dialog
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 py-[8vh] backdrop-blur-[2px] sm:p-8"
      style={{ background: "color-mix(in srgb, var(--background) 40%, rgba(20,16,12,0.6))" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.99 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl rounded-none border border-line bg-surface"
        style={{ boxShadow: "var(--shadow-lg)" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Sticky head */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-none border-b border-line bg-surface/95 px-6 py-5 backdrop-blur-sm sm:px-9">
          <div className="min-w-0">
            <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
              <span className="tnum">{project.year}</span>
              <span aria-hidden className="h-px w-4 bg-line-strong" />
              <Status status={project.status} />
            </div>
            <h2 className="font-display mt-2 truncate text-3xl text-foreground">
              {project.title}
            </h2>
            <p className="truncate text-sm text-muted">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-none border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>

        {project.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-surface-2">
            <Image
              src={project.image}
              alt={`${project.title} — ${project.tagline}`}
              fill
              sizes="(max-width: 672px) 100vw, 672px"
              className="object-cover object-top"
            />
          </div>
        )}

        <div className="px-6 py-7 sm:px-9 sm:py-9">
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
            {project.description}
          </p>

          {project.highlights.length > 0 && (
            <section className="mt-9">
              <h3 className="eyebrow">What&apos;s in it</h3>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {project.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="grid grid-cols-[112px_1fr] items-baseline gap-4 py-3.5"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      {h.label}
                    </dt>
                    <dd className="text-sm text-foreground/85">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {project.metrics && (
            <section className="mt-9">
              <h3 className="eyebrow">By the numbers</h3>
              <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-none border border-line bg-line">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-surface px-4 py-4">
                    <p className="font-display tnum text-3xl leading-none text-foreground">
                      {m.value}
                    </p>
                    <p className="mt-2 font-mono text-[10px] leading-tight text-faint">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-9">
            <h3 className="eyebrow">Stack</h3>
            <div className="chip-group mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visit live site
                <ArrowUpRight size={14} />
              </a>
            )}
            {project.links.github && project.links.github !== "#" && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Source code
                <ArrowUpRight size={14} />
              </a>
            )}
            {!project.links.live && !project.links.github && (
              <p className="font-mono text-xs text-faint">
                Private repo — happy to walk through it on a call.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
