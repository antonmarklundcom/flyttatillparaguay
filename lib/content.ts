import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Filbaserad innehållspipeline (plan §2). Ingen databas i v1.
 * Guider: content/guider/<slug>.mdx   Ortsprofiler: content/stader/<slug>.mdx
 */

export const CLUSTERS = ["residency", "ekonomi", "livsstil", "planb", "fastigheter"] as const;
export type Cluster = (typeof CLUSTERS)[number];

export function isCluster(value: unknown): value is Cluster {
  return typeof value === "string" && (CLUSTERS as readonly string[]).includes(value);
}

export type FaqItem = { question: string; answer: string };

export type GuideFrontmatter = {
  title: string;
  description: string;
  cluster: Cluster;
  publishedAt: string;
  updatedAt?: string;
  heroImage?: string;
  faq?: FaqItem[];
  /** Interna länkar som opus-2 planerar och sonnet-3 fyller på. */
  relatedSlugs?: string[];
  draft?: boolean;
};

export type CityFrontmatter = {
  title: string;
  description: string;
  region?: string;
  population?: string;
  publishedAt: string;
  updatedAt?: string;
  heroImage?: string;
  draft?: boolean;
};

export type Doc<T> = {
  slug: string;
  frontmatter: T;
  body: string;
  readingMinutes: number;
  wordCount: number;
};

const ROOT = process.cwd();
const GUIDES_DIR = path.join(ROOT, "content", "guider");
const CITIES_DIR = path.join(ROOT, "content", "stader");

const includeDrafts = process.env.NODE_ENV !== "production";

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function countWords(body: string): number {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`\-\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function read<T>(dir: string, slug: string, validate: (data: Record<string, unknown>, slug: string) => T): Doc<T> | null {
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const frontmatter = validate(data as Record<string, unknown>, slug);
  const wordCount = countWords(content);

  return {
    slug,
    frontmatter,
    body: content,
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 220)),
  };
}

function validateGuide(data: Record<string, unknown>, slug: string): GuideFrontmatter {
  const { title, description, cluster, publishedAt } = data;

  if (typeof title !== "string" || !title.trim()) {
    throw new Error(`content/guider/${slug}.mdx: frontmatter 'title' saknas.`);
  }
  if (typeof description !== "string" || !description.trim()) {
    throw new Error(`content/guider/${slug}.mdx: frontmatter 'description' saknas.`);
  }
  if (!isCluster(cluster)) {
    throw new Error(
      `content/guider/${slug}.mdx: 'cluster' måste vara en av ${CLUSTERS.join(", ")} (fick ${String(cluster)}).`,
    );
  }
  if (typeof publishedAt !== "string" || Number.isNaN(Date.parse(publishedAt))) {
    throw new Error(`content/guider/${slug}.mdx: 'publishedAt' måste vara ett datum (YYYY-MM-DD).`);
  }

  return {
    title,
    description,
    cluster,
    publishedAt,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    heroImage: typeof data.heroImage === "string" ? data.heroImage : undefined,
    faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : undefined,
    relatedSlugs: Array.isArray(data.relatedSlugs) ? (data.relatedSlugs as string[]) : undefined,
    draft: data.draft === true,
  };
}

function validateCity(data: Record<string, unknown>, slug: string): CityFrontmatter {
  const { title, description, publishedAt } = data;

  if (typeof title !== "string" || !title.trim()) {
    throw new Error(`content/stader/${slug}.mdx: frontmatter 'title' saknas.`);
  }
  if (typeof description !== "string" || !description.trim()) {
    throw new Error(`content/stader/${slug}.mdx: frontmatter 'description' saknas.`);
  }
  if (typeof publishedAt !== "string" || Number.isNaN(Date.parse(publishedAt))) {
    throw new Error(`content/stader/${slug}.mdx: 'publishedAt' måste vara ett datum (YYYY-MM-DD).`);
  }

  return {
    title,
    description,
    region: typeof data.region === "string" ? data.region : undefined,
    population: typeof data.population === "string" ? data.population : undefined,
    publishedAt,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    heroImage: typeof data.heroImage === "string" ? data.heroImage : undefined,
    draft: data.draft === true,
  };
}

function byNewest<T extends { publishedAt: string }>(a: Doc<T>, b: Doc<T>): number {
  return Date.parse(b.frontmatter.publishedAt) - Date.parse(a.frontmatter.publishedAt);
}

/** Alla guider. Utkast visas i dev, aldrig i produktionsbygget. */
export function getGuides(options: { withDrafts?: boolean } = {}): Doc<GuideFrontmatter>[] {
  const withDrafts = options.withDrafts ?? includeDrafts;
  return readDir(GUIDES_DIR)
    .map((slug) => read(GUIDES_DIR, slug, validateGuide))
    .filter((doc): doc is Doc<GuideFrontmatter> => doc !== null)
    .filter((doc) => withDrafts || !doc.frontmatter.draft)
    .sort(byNewest);
}

export function getGuide(slug: string): Doc<GuideFrontmatter> | null {
  return read(GUIDES_DIR, slug, validateGuide);
}

export function getGuidesByCluster(cluster: Cluster): Doc<GuideFrontmatter>[] {
  return getGuides().filter((doc) => doc.frontmatter.cluster === cluster);
}

export function getCities(options: { withDrafts?: boolean } = {}): Doc<CityFrontmatter>[] {
  const withDrafts = options.withDrafts ?? includeDrafts;
  return readDir(CITIES_DIR)
    .map((slug) => read(CITIES_DIR, slug, validateCity))
    .filter((doc): doc is Doc<CityFrontmatter> => doc !== null)
    .filter((doc) => withDrafts || !doc.frontmatter.draft)
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title, "sv"));
}

export function getCity(slug: string): Doc<CityFrontmatter> | null {
  return read(CITIES_DIR, slug, validateCity);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("sv-SE", { dateStyle: "long" }).format(new Date(value));
}
