/**
 * GitHub data, fetched server-side.
 *
 * Two tiers, on purpose:
 *   - REST, unauthenticated: repo and follower counts. 60 requests/hour per IP,
 *     and on a serverless host that IP is shared, so this can and does come
 *     back empty in production.
 *   - GraphQL, authenticated: the contribution calendar and language split.
 *     GitHub has no unauthenticated GraphQL endpoint, so these need a token.
 *
 * Everything degrades to null rather than throwing. A missing token means a
 * smaller page, never a broken one.
 */

const USERNAME = "dogzit";
const REVALIDATE = 60 * 60; // 1h

export type ContributionDay = {
  date: string;
  count: number;
  /** 0–4, GitHub's own quartile bucketing. */
  level: 0 | 1 | 2 | 3 | 4;
};

export type Contributions = {
  total: number;
  /** Columns, oldest first. Each is one week, Sunday-first. */
  weeks: ContributionDay[][];
  commits: number;
  pullRequests: number;
  issues: number;
  reviews: number;
};

export type Language = { name: string; share: number };

export type GithubProfile = {
  username: string;
  repos: number | null;
  followers: number | null;
  lastRepo: string | null;
  lastPushedAgo: string | null;
  contributions: Contributions | null;
  languages: Language[] | null;
};

const LEVELS: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

/* ─── REST: counts that work without a token ─────────────────────────────── */

async function fetchRest() {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`, {
      headers,
      next: { revalidate: REVALIDATE },
    }),
    fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=1`,
      { headers, next: { revalidate: REVALIDATE } },
    ),
  ]);

  if (!userRes.ok || !reposRes.ok) return null;

  const user = (await userRes.json()) as {
    public_repos?: number;
    followers?: number;
  };
  const repos = (await reposRes.json()) as Array<{
    name?: string;
    pushed_at?: string;
  }>;

  return {
    repos: user.public_repos ?? null,
    followers: user.followers ?? null,
    lastRepo: repos[0]?.name ?? null,
    lastPushedAgo: repos[0]?.pushed_at ? timeAgo(repos[0].pushed_at) : null,
  };
}

/* ─── GraphQL: the calendar and the language split ───────────────────────── */

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      repositories(
        first: 100
        isFork: false
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
    }
  }
`;

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalIssueContributions: number;
        totalPullRequestReviewContributions: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }>;
          }>;
        };
      };
      repositories?: {
        nodes: Array<{
          languages: { edges: Array<{ size: number; node: { name: string } }> };
        } | null>;
      };
    };
  };
};

async function fetchGraphQL() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { contributions: null, languages: null };

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) return { contributions: null, languages: null };

  const json = (await res.json()) as GraphQLResponse;
  const user = json.data?.user;
  const cc = user?.contributionsCollection;
  if (!cc) return { contributions: null, languages: null };

  const contributions: Contributions = {
    total: cc.contributionCalendar.totalContributions,
    weeks: cc.contributionCalendar.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel] ?? 0,
      })),
    ),
    commits: cc.totalCommitContributions,
    pullRequests: cc.totalPullRequestContributions,
    issues: cc.totalIssueContributions,
    reviews: cc.totalPullRequestReviewContributions,
  };

  // Bytes per language across every non-fork repo, as a share of the total.
  const bytes = new Map<string, number>();
  for (const repo of user?.repositories?.nodes ?? []) {
    for (const edge of repo?.languages.edges ?? []) {
      bytes.set(edge.node.name, (bytes.get(edge.node.name) ?? 0) + edge.size);
    }
  }
  const totalBytes = [...bytes.values()].reduce((a, b) => a + b, 0);
  const languages: Language[] | null = totalBytes
    ? [...bytes.entries()]
        .map(([name, size]) => ({ name, share: size / totalBytes }))
        .sort((a, b) => b.share - a.share)
        .slice(0, 6)
    : null;

  return { contributions, languages };
}

/** Everything the page shows about GitHub, in one call. Never throws. */
export async function getGithubProfile(): Promise<GithubProfile> {
  const empty: GithubProfile = {
    username: USERNAME,
    repos: null,
    followers: null,
    lastRepo: null,
    lastPushedAgo: null,
    contributions: null,
    languages: null,
  };

  try {
    const [rest, graph] = await Promise.all([fetchRest(), fetchGraphQL()]);
    return { ...empty, ...(rest ?? {}), ...graph };
  } catch {
    return empty;
  }
}
