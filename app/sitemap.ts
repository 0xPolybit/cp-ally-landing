import type { MetadataRoute } from "next";
import { SITE_URL } from "./_components/site";
import { sheets } from "./_data/sheets";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/sheets`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...sheets.map((s) => ({
      url: `${SITE_URL}/sheets/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
