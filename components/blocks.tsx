import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { strings } from "@/content/strings";
import { whatsappUrl } from "@/content/site";
import { ButtonLink, Card, Eyebrow, SectionHeading } from "@/components/ui";
import { NewsletterForm } from "@/components/newsletter-form";
import { formatDate, type Cluster, type Doc, type GuideFrontmatter } from "@/lib/content";

/* ---------------------------------------------------------------- Split hero */

export function SplitHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  image,
  bullets = [],
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  image?: { src: string; alt: string };
  bullets?: string[];
}) {
  return (
    <section className="border-b border-(--color-line) bg-gradient-to-b from-cream-200 to-(--color-surface)">
      <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
        <div className="rise">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="text-4xl leading-[1.08] md:text-5xl lg:text-[3.4rem]">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-(--color-text-muted)">
            {description}
          </p>

          {bullets.length > 0 ? (
            <ul className="mt-6 grid gap-2">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-sm text-(--color-text)">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent)" />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {primary ? <ButtonLink href={primary.href}>{primary.label}</ButtonLink> : null}
            {secondary ? (
              <ButtonLink href={secondary.href} variant="ghost">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-xl) border border-(--color-line) bg-cream-300 shadow-(--shadow-lift)">
          {image ? (
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          ) : (
            <ImageSlot label="Hero-bild — fylls i fas sonnet-4" />
          )}
        </div>
      </div>
    </section>
  );
}

/** Dokumenterad platshållare tills higgsfield-fasen fyller bildslottarna. */
export function ImageSlot({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,var(--color-cream-300)_0_12px,var(--color-cream-200)_12px_24px)] p-6 text-center">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-(--color-text-muted)">
        {label}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- Bento grid */

export type BentoItem = {
  title: string;
  description: string;
  stat?: string;
  wide?: boolean;
};

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title} className={item.wide ? "md:col-span-2" : ""}>
          {item.stat ? (
            <p className="font-(family-name:--font-display) text-4xl text-(--color-brand)">{item.stat}</p>
          ) : null}
          <h3 className="mt-2 text-lg">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ Processtidslinje */

export type ProcessStep = { title: string; description: string };

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
      {steps.map((step, index) => (
        <li key={step.title} className="relative">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-brand) font-(family-name:--font-display) text-base text-cream-50">
            {index + 1}
          </span>
          <h3 className="mt-4 text-lg">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">{step.description}</p>
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute left-10 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-(--color-line) md:block"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------- Stat-rad */

export type Stat = { value: string; label: string; note?: string };

export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid gap-6 rounded-(--radius-lg) border border-(--color-line) bg-(--color-surface-raised) p-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="block font-(family-name:--font-display) text-3xl text-(--color-brand)">
              {stat.value}
            </span>
            <span className="mt-1 block text-sm font-medium">{stat.label}</span>
            {stat.note ? (
              <span className="mt-1 block text-xs text-(--color-text-muted)">{stat.note}</span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* --------------------------------------------------------------- Artikelkort */

export function ArticleCard({ guide }: { guide: Doc<GuideFrontmatter> }) {
  const { frontmatter } = guide;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-(--radius-lg) border border-(--color-line) bg-(--color-surface-raised) shadow-(--shadow-card) transition-shadow hover:shadow-(--shadow-lift)">
      <div className="relative aspect-16/9 bg-cream-300">
        {frontmatter.heroImage ? (
          <Image
            src={frontmatter.heroImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ImageSlot label="Artikelbild" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-accent)">
          {strings.clusters[frontmatter.cluster]}
          {frontmatter.draft ? ` · ${strings.guides.draftBadge}` : ""}
        </p>
        <h3 className="mt-2 text-lg leading-snug">
          <Link href={`/guider/${guide.slug}`} className="after:absolute after:inset-0">
            {frontmatter.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-(--color-text-muted)">
          {frontmatter.description}
        </p>
        <p className="mt-4 text-xs text-(--color-text-muted)">
          {formatDate(frontmatter.updatedAt ?? frontmatter.publishedAt)} · {guide.readingMinutes}{" "}
          {strings.guides.readingTime}
        </p>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------------- FAQ */

export function Faq({ items, title }: { items: { question: string; answer: string }[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl md:text-3xl">{title ?? strings.guides.faqTitle}</h2>
      <div className="mt-6 divide-y divide-(--color-line) border-y border-(--color-line)">
        {items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
              {item.question}
              <span
                aria-hidden="true"
                className="text-(--color-accent) transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-(--color-text-muted)">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- CTA-block */

export function CtaBlock({
  title,
  description,
  href = "/kontakt",
  label,
  cluster,
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
  cluster?: Cluster;
}) {
  const message = cluster
    ? `Hej Anton! Jag läste er ${strings.clusters[cluster].toLowerCase()}-guide och vill veta mer.`
    : strings.cta.whatsappMessage;

  return (
    <section className="overflow-hidden rounded-(--radius-xl) bg-(--color-surface-deep) px-6 py-12 text-cream-100 md:px-12">
      <div className="max-w-2xl">
        <h2 className="text-2xl text-cream-50 md:text-3xl">{title}</h2>
        <p className="mt-3 text-base leading-relaxed text-cream-300">{description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={whatsappUrl(message)}
            rel="noopener"
            className="inline-flex items-center rounded-(--radius-sm) bg-(--color-accent) px-5 py-3 text-sm font-semibold text-white hover:bg-terracotta-600"
          >
            {strings.cta.whatsapp}
          </a>
          <Link
            href={href}
            className="inline-flex items-center rounded-(--radius-sm) border border-white/25 px-5 py-3 text-sm font-semibold text-cream-100 hover:bg-white/10"
          >
            {label ?? strings.cta.form}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ Nyhetsbrevspanel */

/**
 * Nyhetsbrevsfångst utanför footern (plan §3C: footer + artikelslut).
 * Mörk yta eftersom NewsletterForm är byggd för ljus text på mörk bakgrund.
 */
export function NewsletterPanel({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`overflow-hidden rounded-(--radius-xl) bg-(--color-surface-deep) px-6 py-10 text-cream-100 md:px-10 ${className}`}
    >
      <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-(family-name:--font-display) text-2xl text-cream-50">
            {strings.newsletter.title}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-300">
            {strings.newsletter.description}
          </p>
        </div>
        <NewsletterForm />
      </div>
    </aside>
  );
}

/* ------------------------------------------------------- Sticky mobil-CTA */

export function StickyMobileCta({ label, href = "/kontakt" }: { label?: string; href?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-(--color-line) bg-(--color-surface)/95 p-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <a
          href={whatsappUrl(strings.cta.whatsappMessage)}
          rel="noopener"
          className="flex-1 rounded-(--radius-sm) bg-(--color-accent) px-4 py-3 text-center text-sm font-semibold text-white"
        >
          {strings.cta.whatsapp}
        </a>
        <Link
          href={href}
          className="flex-1 rounded-(--radius-sm) border border-(--color-line) px-4 py-3 text-center text-sm font-semibold"
        >
          {label ?? strings.cta.form}
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Section */

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export { SectionHeading };
