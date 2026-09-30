import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.7 },
  { path: "/skills", priority: 0.7 },
  { path: "/projects", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/Kiran%20Dhakal%20.pdf", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "weekly",
    priority,
  }));
}
