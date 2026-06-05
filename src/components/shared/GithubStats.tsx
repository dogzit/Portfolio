"use client";

import { useEffect, useState } from "react";

type Stats = {
  repos: number | null;
  followers: number | null;
  lastPushedAgo: string | null;
  lastRepo: string | null;
};

export function GithubStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-stats")
      .then((r) => r.json())
      .then((data: Stats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        /* ignore — footer tile silently hides */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats || stats.repos === null) return null;

  return (
    <a
      href="https://github.com/dogzit"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 px-4 py-2 rounded-xl border border-white/[0.06] hover:border-electric/30 transition-all duration-200"
      style={{ background: "rgba(13,13,20,0.6)", backdropFilter: "blur(12px)" }}
      title="View GitHub profile"
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
        aria-hidden
      />
      <span className="flex items-center gap-3 text-[10px] font-mono text-white/40 group-hover:text-white/70 transition-colors">
        <span>
          <span className="text-white/70 font-semibold">{stats.repos}</span> repos
        </span>
        {stats.followers !== null && (
          <span>
            <span className="text-white/70 font-semibold">{stats.followers}</span>{" "}
            followers
          </span>
        )}
        {stats.lastPushedAgo && (
          <span className="hidden sm:inline">
            pushed <span className="text-electric-bright/80">{stats.lastPushedAgo}</span>
          </span>
        )}
      </span>
    </a>
  );
}
