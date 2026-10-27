import { getGithubProfile } from "@/lib/github";
import { LiveClock } from "@/components/shared/LiveClock";

/**
 * The terminal strip across the very top. Everything in it is live: the clock
 * ticks, and the repo and push time come from the GitHub API. It's the first
 * thing a visitor sees, so it should be the first thing that proves the page
 * isn't a static mockup.
 */
export async function StatusBar() {
  const profile = await getGithubProfile();

  return (
    <div className="status-bar">
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="shrink-0 opacity-90">zolbayar@ulaanbaatar</span>
        <span aria-hidden className="shrink-0 opacity-40">
          :~$
        </span>
        {profile.lastRepo && (
          <span className="truncate opacity-70">
            git push {profile.lastRepo}
            {profile.lastPushedAgo && ` · ${profile.lastPushedAgo}`}
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="status-led" />
          available for internships
        </span>
        <LiveClock />
      </div>
    </div>
  );
}
