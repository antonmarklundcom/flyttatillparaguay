import type { Metadata } from "next";
import { site } from "@/content/site";

/** Bygger sidmetadata med canonical + OG enligt nextjs-national-lead-gen §3. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image ?? "/og/default.png";

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    description:
      "Hjälper svenskar att få residency i Paraguay — process, dokument och ombud på plats.",
    slogan: "Residency i Paraguay — hela vägen, på svenska.",
    founder: {
      "@type": "Person",
      name: site.author.name,
      jobTitle: site.author.role,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Asunción",
      addressCountry: "PY",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.email,
        availableLanguage: ["sv", "es", "en"],
      },
    ],
    knowsLanguage: ["sv", "es"],
    areaServed: [
      { "@type": "Country", name: "Sverige" },
      { "@type": "Country", name: "Paraguay" },
    ],
  };
}

/** Brödsmulor för hubb- och artikelsidor (nextjs-national-lead-gen §3). */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
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

export function articleSchema({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  image,
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: `${site.url}${path}`,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    image: image ? `${site.url}${image}` : undefined,
    author: { "@type": "Person", name: site.author.name },
    publisher: { "@type": "Organization", name: site.name },
    inLanguage: "sv-SE",
  };
}
