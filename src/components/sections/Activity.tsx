import { getGithubProfile } from "@/lib/github";
import { ContributionGrid } from "@/components/shared/ContributionGrid";
import { SectionHeader } from "@/components/shared/SectionHeader";

/**
 * Everything in this section is read from the GitHub API at request time and
 * cached for an hour. Nothing here is typed by hand — which is the whole
 * reason it's on the page.
 *
 * It degrades in tiers: the calendar and language split need a token, the
 * repo and follower counts don't, and with neither the section still shows
 * the profile link rather than leaving a dead anchor in the nav.
 */
export async function Activity() {
  const profile = await getGithubProfile();
  const c = profile.contributions;

  const totals = c
    ? [
        { label: "commits", value: c.commits },
        { label: "pull requests", value: c.pullRequests },
        { label: "issues", value: c.issues },
        { label: "reviews", value: c.reviews },
      ]
    : [
        { label: "public repos", value: profile.repos },
        { label: "followers", value: profile.followers },
      ].filter((t): t is { label: string; value: number } => !!t.value);

  return (
    <section id="activity" className="section">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Activity"
          title="The last year, unedited"
          note="Read live from the GitHub API and cached for an hour. I can't tune these numbers from here — they're whatever the commits say."
        />

        {totals.length > 0 && (
          <div
            className={`lattice mt-10 ${c ? "md:grid-cols-[minmax(0,16rem)_1fr]" : ""}`}
          >
            {/* Totals */}
            {/* Tailwind needs the full class name at build time, so no template. */}
            <div className={`lattice ${c ? "" : "grid-cols-2"}`}>
              {totals.map((t) => (
                <div key={t.label} className="cell cell-hover rise py-5">
                  <span className="font-display tnum block text-3xl leading-none text-foreground">
                    {t.value.toLocaleString()}
                  </span>
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>

            {/* The calendar — only exists with a token */}
            {c && (
              <div className="cell rise flex flex-col justify-between gap-6">
                <ContributionGrid data={c} />

                {profile.languages && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      Languages by bytes written
                    </p>
                    <div className="mt-2.5 flex h-2.5 w-full overflow-hidden">
                      {profile.languages.map((lang, i) => (
                        <span
                          key={lang.name}
                          title={`${lang.name} — ${(lang.share * 100).toFixed(1)}%`}
                          style={{
                            width: `${lang.share * 100}%`,
                            background: `color-mix(in oklab, var(--accent) ${100 - i * 15}%, var(--surface-2))`,
                          }}
                        />
                      ))}
                    </div>
                    <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-muted">
                      {profile.languages.map((lang) => (
                        <li key={lang.name} className="tnum">
                          {lang.name} {(lang.share * 100).toFixed(0)}%
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Sheet-corner tag, the way the grid language wants it */}
        <div className="lattice-foot border-b border-line">
          <span className="cell-label">dev.commits()</span>
          <a
            href={`https://github.com/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link font-mono text-[11px] text-muted"
          >
            github.com/{profile.username}
            {profile.lastPushedAgo && ` · pushed ${profile.lastPushedAgo}`}
          </a>
        </div>
      </div>
    </section>
  );
}
