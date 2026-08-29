import type { MetadataRoute } from "next";

import { getCities, getGuides } from "@/lib/mdx";
import { siteUrl } from "@/lib/site";

/** Statiska sidor med prioritet — money pages först (plan.md §3A). */
const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/residency", priority: 0.95, changeFrequency: "monthly" },
  { path: "/fastigheter", priority: 0.85, changeFrequency: "monthly" },
  { path: "/livet-i-paraguay", priority: 0.8, changeFrequency: "monthly" },
  { path: "/plan-b", priority: 0.8, changeFrequency: "monthly" },
  { path: "/guider", priority: 0.75, changeFrequency: "weekly" },
  { path: "/om", priority: 0.6, changeFrequency: "yearly" },
  { path: "/kontakt", priority: 0.6, changeFrequency: "yearly" },
  { path: "/integritetspolicy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/villkor", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // getGuides/getCities filtrerar bort draft i produktion, så utkast hamnar
  // aldrig i sitemapen.
  for (const guide of getGuides()) {
    pages.push({
      url: `${siteUrl}/guider/${guide.slug}`,
      lastModified: new Date(guide.frontmatter.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const city of getCities()) {
    pages.push({
      url: `${siteUrl}/livet-i-paraguay/${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return pages;
}
