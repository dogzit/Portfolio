import { MILESTONES } from "@/lib/data";

/**
 * The compact counterpart to the story prose: the same arc, scannable in a
 * few seconds. Period on the left, what happened on the right, one hairline
 * between each — the same row rhythm the Stack section uses.
 *
 * Periods are deliberately mixed (ages, years, stages). Several of these are
 * remembered by what was happening rather than by a date, and inventing dates
 * to make the column tidy would be the wrong trade.
 */
export function Milestones() {
  return (
    <ol className="lattice mt-10">
      {MILESTONES.map((m) => (
        <li
          key={m.title}
          className="cell cell-hover rise grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[9rem_1fr]"
        >
          <p className="font-mono text-[11px] leading-5 tracking-[0.02em] text-accent sm:pt-px">
            {m.period}
          </p>
          <div>
            <h3 className="font-display text-lg leading-snug text-foreground">
              {m.title}
            </h3>
            <p className="measure mt-1 text-sm leading-relaxed text-muted">
              {m.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
