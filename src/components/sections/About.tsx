import { STORY } from "@/lib/data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { Milestones } from "@/components/shared/Milestones";

/**
 * The long version. The hero gives two sentences; this is where someone who
 * wants the whole arc can read it, with the same ground covered as a
 * scannable list underneath for everyone else.
 */
export function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeader
          index="04"
          label="About"
          title="My story"
          note="Eleven years between the first computer I was allowed to touch and the first system my school actually runs on."
        />

        <div className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,34rem)_1fr]">
          <div className="space-y-5">
            {STORY.map((para, i) => (
              <Reveal key={para.slice(0, 24)} delay={Math.min(i * 0.04, 0.2)}>
                <p
                  className={
                    i === 0
                      ? "lead text-ink-soft"
                      : "text-[0.9375rem] leading-relaxed text-ink-soft"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* A pull-quote, set in the display face, so the column isn't dead space */}
          <Reveal delay={0.1} className="lg:pt-2">
            <figure className="m-0 border-l border-accent-line pl-6">
              <blockquote className="font-display text-display-sm text-foreground">
                I haven&apos;t won first place yet. What I&apos;m proud of is
                that each competition has been a step forward.
              </blockquote>
            </figure>
          </Reveal>
        </div>

        <Milestones />

        <div className="lattice-foot border-b border-line">
          <span className="cell-label">dev.story()</span>
        </div>
      </div>
    </section>
  );
}
