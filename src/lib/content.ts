/**
 * Filbaserad objektmodell (plan.md §2). Ingen DB, ingen auth i v1.
 *
 * Frontmatter valideras här — en MDX-fil med felaktig frontmatter ska få
 * bygget att fallera med ett begripligt felmeddelande, inte tyst rendera en
 * trasig sida. Senare faser lägger till filer, inte fält.
 */

export const CLUSTERS = [
  "residency",
  "ekonomi",
  "livsstil",
  "planb",
  "fastigheter",
] as const;

export type Cluster = (typeof CLUSTERS)[number];

export function isCluster(value: unknown): value is Cluster {
  return typeof value === "string" && (CLUSTERS as readonly string[]).includes(value);
}

export type FaqItem = {
  question: string;
  answer: string;
};

/** Frontmatter för content/guider/<slug>.mdx */
export type GuideFrontmatter = {
  title: string;
  description: string;
  cluster: Cluster;
  publishedAt: string;
  updatedAt: string;
  heroImage: string | null;
  faq: FaqItem[];
  /** Sätts av opus-2 på stubbar; sonnet-3 tar bort den per färdig artikel. */
  draft: boolean;
  /** Interna länkar som opus-2 planerar och sonnet-3 skriver in i brödtexten. */
  related: string[];
};

/** Frontmatter för content/stader/<slug>.mdx */
export type CityFrontmatter = {
  title: string;
  description: string;
  region: string;
  heroImage: string | null;
  draft: boolean;
};

export type Guide = {
  slug: string;
  frontmatter: GuideFrontmatter;
  body: string;
  readingMinutes: number;
};

export type City = {
  slug: string;
  frontmatter: CityFrontmatter;
  body: string;
};

export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
