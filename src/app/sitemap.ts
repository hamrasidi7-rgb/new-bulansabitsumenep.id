import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/edukasi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/kontributor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/artikel/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...articleRoutes];
}
