import type { MetadataRoute } from "next"
import { projects } from "@/lib/projectsData"

const SITE_URL = "https://kirtikadev.in"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
