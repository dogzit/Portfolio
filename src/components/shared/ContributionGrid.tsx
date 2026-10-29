import type { Contributions } from "@/lib/github";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/**
 * A year of contributions as a grid of squares — the same shape GitHub uses,
 * repainted in the page's own clay accent so it belongs here rather than
 * looking pasted in. Levels are GitHub's quartiles, mixed against the paper.
 */
export function ContributionGrid({ data }: { data: Contributions }) {
  // A month label sits above the first week that starts a new month.
  const labels = data.weeks.map((week, i) => {
    const first = week[0];
    if (!first) return null;
    const month = new Date(first.date).getUTCMonth();
    const prev = data.weeks[i - 1]?.[0];
    if (i === 0 || (prev && new Date(prev.date).getUTCMonth() !== month)) {
      return MONTHS[month];
    }
    return null;
  });

  return (
    <figure className="m-0">
      <div className="overflow-x-auto no-scrollbar">
        <div className="inline-block min-w-full">
          {/* Month ruler */}
          <div
            aria-hidden
            className="mb-1.5 grid grid-flow-col gap-[3px] font-mono text-[10px] text-faint"
            style={{ gridTemplateColumns: `repeat(${data.weeks.length}, 11px)` }}
          >
            {labels.map((label, i) => (
              <span key={i} className="whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>

          {/* The year */}
          <div
            className="grid grid-flow-col gap-[3px]"
            style={{ gridTemplateRows: "repeat(7, 11px)" }}
            role="img"
            aria-label={`${data.total} GitHub contributions in the last year`}
          >
            {data.weeks.flatMap((week, w) =>
              week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} on ${day.date}`}
                  className="square-in h-[11px] w-[11px]"
                  style={{
                    background:
                      day.level === 0
                        ? "var(--surface-2)"
                        : `color-mix(in oklab, var(--accent) ${day.level * 25}%, var(--surface-2))`,
                    // Week index drives the delay, so the year fills as a wave.
                    animationDelay: `${w * 14}ms`,
                  }}
                />
              )),
            )}
          </div>
        </div>
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-faint">
        <span className="tnum">{data.total.toLocaleString()} contributions this year</span>
        <span className="flex items-center gap-1.5">
          Less
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              className="h-[9px] w-[9px]"
              style={{
                background:
                  level === 0
                    ? "var(--surface-2)"
                    : `color-mix(in oklab, var(--accent) ${level * 25}%, var(--surface-2))`,
              }}
            />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
