import type { Metadata } from "next";

import { strings } from "@content/strings";

import { siteUrl } from "./site";

/**
 * Metadata- och strukturerad data-grund (skillen nextjs-national-lead-gen §3).
 *
 * Fas opus-2 bygger vidare med FAQPage/Article per sida — men varje sida
 * ska redan från opus-1 ha unik titel, beskrivning, canonical och OG.
 */

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: {
  title: string;
  description: string;
  /** Absolut sökväg, t.ex. "/residency". */
  path: string;
  /** Utelämnas normalt: då används den genererade sitewide-OG-bilden
   *  (app/opengraph-image.tsx). Sätt bara när en sida har en egen bild. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: strings.brand.name,
      locale: "sv_SE",
      ...(image
        ? { images: [{ url: `${siteUrl}${image}`, width: 1200, height: 630, alt: title }] }
        : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [`${siteUrl}${image}`] } : {}),
    },
  };
}

/** Sitewide Organization-schema (skillen §3). */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: strings.brand.name,
    url: siteUrl,
    description: strings.brand.tagline,
    areaServed: ["SE", "PY"],
    knowsLanguage: ["sv", "es"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: strings.brand.name,
    url: siteUrl,
    inLanguage: "sv-SE",
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}
