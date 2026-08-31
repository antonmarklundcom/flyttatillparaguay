import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getCities, getGuides } from "@/lib/content";

const staticRoutes = [
  "",
  "/residency",
  "/fastigheter",
  "/livet-i-paraguay",
  "/plan-b",
  "/guider",
  "/om",
  "/kontakt",
  "/integritetspolicy",
  "/villkor",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/residency" ? 0.9 : 0.7,
  }));

  const guides = getGuides({ withDrafts: false }).map((guide) => ({
    url: `${site.url}/guider/${guide.slug}`,
    lastModified: new Date(guide.frontmatter.updatedAt ?? guide.frontmatter.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cities = getCities({ withDrafts: false }).map((city) => ({
    url: `${site.url}/livet-i-paraguay/${city.slug}`,
    lastModified: new Date(city.frontmatter.updatedAt ?? city.frontmatter.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...pages, ...guides, ...cities];
}
