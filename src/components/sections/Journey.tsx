"use client";

import { TIMELINE } from "@/lib/data";
import { TimelineEvent } from "@/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";

export function Journey() {
  return (
    <section id="journey" className="section">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Journey"
          title="How I got here"
          note="Eleven years between the first computer and the first paid internship. The short version, in order."
        />

        <ol className="mt-12 max-w-3xl">
          {TIMELINE.map((event, i) => (
            <Reveal as="li" key={`${event.period}-${event.title}`} delay={Math.min(i * 0.05, 0.25)}>
              <TimelineItem event={event} last={i === TIMELINE.length - 1} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({ event, last }: { event: TimelineEvent; last: boolean }) {
  return (
    <div className="group relative grid grid-cols-[1.25rem_1fr] gap-5 sm:grid-cols-[7rem_1.25rem_1fr] sm:gap-6">
      {/* Period (its own column on wide screens) */}
      <p className="hidden pt-0.5 text-right font-mono text-[11px] leading-5 text-muted sm:block">
        {event.period}
      </p>

      {/* Rail */}
      <div className="relative flex justify-center">
        <span
          aria-hidden
          className={`absolute top-3 bottom-0 w-px bg-line ${last ? "hidden" : ""}`}
        />
        <span
          aria-hidden
          className="relative z-10 mt-1.5 h-2 w-2 rounded-full border border-line-strong bg-background transition-colors duration-300 group-hover:border-accent group-hover:bg-accent"
        />
      </div>

      {/* Content */}
      <div className="pb-10">
        <p className="mb-1 font-mono text-[11px] text-muted sm:hidden">{event.period}</p>
        <h3 className="font-display text-xl text-foreground">{event.title}</h3>
        <p className="mt-0.5 text-xs text-muted">{event.subtitle}</p>
        <p className="measure mt-3 text-sm leading-relaxed text-ink-soft">
          {event.description}
        </p>
        {event.tags.length > 0 && (
          <div className="chip-group mt-4 flex flex-wrap gap-1.5">
            {event.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
