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
      className="text-xs font-mono text-muted hover:text-foreground transition-colors"
      title="View GitHub profile"
    >
      {stats.repos} repos
      {stats.followers !== null && ` · ${stats.followers} followers`}
      {stats.lastPushedAgo && ` · pushed ${stats.lastPushedAgo}`}
    </a>
  );
}
