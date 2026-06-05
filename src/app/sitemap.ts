import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zolbayar.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = ["", "#work", "#stack", "#journey", "#contact"];

  return [
    ...sections.map((hash) => ({
      url: `${SITE_URL}/${hash}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: hash === "" ? 1 : 0.7,
    })),
    {
      url: `${SITE_URL}/now`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ];
}
