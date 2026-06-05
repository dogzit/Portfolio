import { NextResponse } from "next/server";

const USERNAME = "dogzit";
const REVALIDATE_SECONDS = 60 * 60; // 1h

type Stats = {
  username: string;
  repos: number | null;
  followers: number | null;
  lastPushedAgo: string | null;
  lastRepo: string | null;
};

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}

export async function GET() {
  const empty: Stats = {
    username: USERNAME,
    repos: null,
    followers: null,
    lastPushedAgo: null,
    lastRepo: null,
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=1`,
        {
          headers: { Accept: "application/vnd.github+json" },
          next: { revalidate: REVALIDATE_SECONDS },
        },
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(empty, { status: 200 });
    }

    const user = (await userRes.json()) as {
      public_repos?: number;
      followers?: number;
    };
    const repos = (await reposRes.json()) as Array<{
      name?: string;
      pushed_at?: string;
    }>;
    const latest = repos[0];

    const stats: Stats = {
      username: USERNAME,
      repos: user.public_repos ?? null,
      followers: user.followers ?? null,
      lastPushedAgo: latest?.pushed_at ? timeAgo(latest.pushed_at) : null,
      lastRepo: latest?.name ?? null,
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(empty, { status: 200 });
  }
}
