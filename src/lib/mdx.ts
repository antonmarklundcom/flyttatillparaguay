import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import {
  type City,
  type CityFrontmatter,
  type FaqItem,
  type Guide,
  type GuideFrontmatter,
  isCluster,
  readingMinutes,
} from "./content";

/**
 * Läser MDX-innehållet från repots `content/`-katalog vid byggtid.
 *
 * Innehållet ligger medvetet UTANFÖR src/ så att sökvägarna matchar
 * plan.md §2 ordagrant och en icke-utvecklare kan hitta filerna.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");
const GUIDES_DIR = path.join(CONTENT_ROOT, "guider");
const CITIES_DIR = path.join(CONTENT_ROOT, "stader");

/** Draft-artiklar syns i utvecklingsläge men aldrig i produktion. */
const showDrafts = process.env.NODE_ENV !== "production";

function listMdx(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

function requireString(
  value: unknown,
  field: string,
  file: string,
): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file}: frontmatter-fältet "${field}" saknas eller är tomt.`);
  }
  return value.trim();
}

function requireDate(value: unknown, field: string, file: string): string {
  const raw =
    value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? "");
  if (!/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    throw new Error(
      `${file}: frontmatter-fältet "${field}" måste vara ett datum (YYYY-MM-DD), fick "${raw}".`,
    );
  }
  return raw.slice(0, 10);
}

function parseFaq(value: unknown, file: string): FaqItem[] {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    throw new Error(`${file}: "faq" måste vara en lista.`);
  }
  return value.map((entry, index) => {
    const item = entry as Record<string, unknown>;
    return {
      question: requireString(item?.question, `faq[${index}].question`, file),
      answer: requireString(item?.answer, `faq[${index}].answer`, file),
    };
  });
}

function parseStringList(value: unknown, field: string, file: string): string[] {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    throw new Error(`${file}: "${field}" måste vara en lista.`);
  }
  return value.map((entry, index) =>
    requireString(entry, `${field}[${index}]`, file),
  );
}

function readGuide(slug: string): Guide {
  const file = `content/guider/${slug}.mdx`;
  const raw = fs.readFileSync(path.join(GUIDES_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);

  if (!isCluster(data.cluster)) {
    throw new Error(
      `${file}: "cluster" måste vara residency | ekonomi | livsstil | planb | fastigheter, fick "${String(data.cluster)}".`,
    );
  }

  const publishedAt = requireDate(data.publishedAt, "publishedAt", file);

  const frontmatter: GuideFrontmatter = {
    title: requireString(data.title, "title", file),
    description: requireString(data.description, "description", file),
    cluster: data.cluster,
    publishedAt,
    updatedAt: data.updatedAt ? requireDate(data.updatedAt, "updatedAt", file) : publishedAt,
    heroImage: typeof data.heroImage === "string" && data.heroImage ? data.heroImage : null,
    faq: parseFaq(data.faq, file),
    draft: data.draft === true,
    related: parseStringList(data.related, "related", file),
  };

  return {
    slug,
    frontmatter,
    body: content,
    readingMinutes: readingMinutes(content),
  };
}

function readCity(slug: string): City {
  const file = `content/stader/${slug}.mdx`;
  const raw = fs.readFileSync(path.join(CITIES_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);

  const frontmatter: CityFrontmatter = {
    title: requireString(data.title, "title", file),
    description: requireString(data.description, "description", file),
    region: requireString(data.region, "region", file),
    heroImage: typeof data.heroImage === "string" && data.heroImage ? data.heroImage : null,
    draft: data.draft === true,
  };

  return { slug, frontmatter, body: content };
}

function visible<T extends { frontmatter: { draft: boolean } }>(items: T[]): T[] {
  return showDrafts ? items : items.filter((item) => !item.frontmatter.draft);
}

/** Alla publicerade guider, nyast först. */
export function getGuides(): Guide[] {
  const guides = listMdx(GUIDES_DIR).map(readGuide);
  return visible(guides).sort((a, b) =>
    b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt),
  );
}

export function getGuide(slug: string): Guide | null {
  if (!listMdx(GUIDES_DIR).includes(slug)) return null;
  const guide = readGuide(slug);
  if (guide.frontmatter.draft && !showDrafts) return null;
  return guide;
}

export function getGuidesByCluster(cluster: string): Guide[] {
  return getGuides().filter((guide) => guide.frontmatter.cluster === cluster);
}

export function getCities(): City[] {
  return visible(listMdx(CITIES_DIR).map(readCity)).sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title, "sv"),
  );
}

export function getCity(slug: string): City | null {
  if (!listMdx(CITIES_DIR).includes(slug)) return null;
  const city = readCity(slug);
  if (city.frontmatter.draft && !showDrafts) return null;
  return city;
}
