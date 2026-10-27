"use client";

import { SKILLS } from "@/lib/data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";

export function Skills() {
  return (
    <section id="stack" className="section">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Stack"
          title="What I reach for"
          note="No skill bars — percentages on a portfolio are made up. Each tool below is listed with the thing I actually built with it."
        />

        <div className="mt-4">
          {SKILLS.map((cat, i) => (
            <Reveal key={cat.name} delay={Math.min(i * 0.06, 0.24)}>
              <div className="grid gap-5 border-b border-line py-8 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10">
                {/* Left: category */}
                <div>
                  <h3 className="flex items-baseline gap-3 font-display text-2xl text-foreground">
                    <span aria-hidden className="text-base text-accent">
                      {cat.icon}
                    </span>
                    {cat.name}
                  </h3>
                  {cat.note && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{cat.note}</p>
                  )}
                </div>

                {/* Right: the tool, and the receipt for it */}
                <dl className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-baseline justify-between gap-4 border-b border-line/60 py-2.5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                    >
                      <dt className="text-sm text-foreground/85 transition-colors group-hover:text-foreground">
                        {skill.name}
                      </dt>
                      <dd className="text-right font-mono text-[10.5px] leading-tight text-faint transition-colors group-hover:text-muted">
                        {skill.evidence}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="measure mt-8 text-sm leading-relaxed text-muted">
            Most of it I learned by needing it. The pattern is usually: pick a project
            that&apos;s slightly too hard, get stuck, read the docs properly, ship it
            anyway.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
