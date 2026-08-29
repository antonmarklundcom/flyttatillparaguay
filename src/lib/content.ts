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

/**
 * Det ett artikelkort behöver — utan brödtexten.
 *
 * Klientkomponenter (t.ex. clusterfiltret på /guider) ska ALLTID få den här
 * formen, aldrig hela `Guide`: annars serialiseras varje artikels body ner
 * till webbläsaren.
 */
export type GuideSummary = {
  slug: string;
  title: string;
  description: string;
  cluster: Cluster;
  publishedAt: string;
  updatedAt: string;
  heroImage: string | null;
  draft: boolean;
  readingMinutes: number;
};

export function toGuideSummary(guide: Guide): GuideSummary {
  return {
    slug: guide.slug,
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    cluster: guide.frontmatter.cluster,
    publishedAt: guide.frontmatter.publishedAt,
    updatedAt: guide.frontmatter.updatedAt,
    heroImage: guide.frontmatter.heroImage,
    draft: guide.frontmatter.draft,
    readingMinutes: guide.readingMinutes,
  };
}
