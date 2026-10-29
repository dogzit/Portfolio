import { MILESTONES } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";

/**
 * The compact counterpart to the story thread above: the same arc, scannable
 * in a few seconds. Period on the left, what happened on the right, one
 * hairline between each.
 *
 * It used to be a lattice of filled cells, which put a second set of boxes
 * directly under the story. Plain rules only now, so it reads as a quiet
 * summary of the thread rather than competing with it.
 *
 * Periods are deliberately mixed (ages, years, stages). Several of these are
 * remembered by what was happening rather than by a date, and inventing dates
 * to make the column tidy would be the wrong trade.
 */
export function Milestones() {
  return (
    <div className="mt-16">
      <Reveal>
        <p className="eyebrow mb-5">
          <span aria-hidden className="h-px w-5 bg-line-strong" />
          The same arc, at a glance
        </p>
      </Reveal>

      <ol className="timeline">
        {MILESTONES.map((m, i) => (
          <Reveal as="li" key={m.title} delay={Math.min(i * 0.03, 0.18)}>
            <p className="timeline-period">{m.period}</p>
            <div>
              <h3 className="timeline-title font-display">{m.title}</h3>
              <p className="timeline-detail">{m.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
