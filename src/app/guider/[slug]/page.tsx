import Link from "next/link";
import { notFound } from "next/navigation";

import { strings } from "@content/strings";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArticleCard } from "@/components/marketing/ArticleCard";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { MdxContent } from "@/components/mdx/MdxContent";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { JsonLd } from "@/components/ui/JsonLd";
import type { Cluster } from "@/lib/content";
import type { LeadFormId } from "@/lib/lead";
import { getGuide, getGuides } from "@/lib/mdx";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

/**
 * Guidesida (plan.md §3A). Varje guide slutar i ett cluster-relevant
 * CTA-block plus nyhetsbrevsfångst (§3C).
 */

/** Vilket formulär som passar respektive ämne. */
const clusterForm: Record<Cluster, LeadFormId> = {
  residency: "residency",
  ekonomi: "kontakt",
  livsstil: "kontakt",
  planb: "residency",
  fastigheter: "fastigheter",
};

const clusterCta: Record<Cluster, { title: string; body: string }> = {
  residency: {
    title: "Vill du att någon går bredvid dig genom processen?",
    body: "Platshållartext: berätta var du är just nu så säger jag vad nästa steg blir i ditt fall.",
  },
  ekonomi: {
    title: "Frågor om ekonomin i praktiken?",
    body: "Platshållartext: skatt, bankkonto och att flytta pengar — hör av dig så reder vi ut det.",
  },
  livsstil: {
    title: "Undrar du hur det är att bo här på riktigt?",
    body: "Platshållartext: fråga om vad som helst i vardagen, jag svarar rakt.",
  },
  planb: {
    title: "Är Paraguay rätt Plan B för dig?",
    body: "Platshållartext: några rader om din situation räcker för ett ärligt svar.",
  },
  fastigheter: {
    title: "Letar du efter mark eller hus?",
    body: "Platshållartext: skriv region och budget så pekar jag dig rätt.",
  },
};

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guider/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return buildMetadata({
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    path: `/guider/${guide.slug}`,
    type: "article",
    publishedTime: guide.frontmatter.publishedAt,
    modifiedTime: guide.frontmatter.updatedAt,
    noIndex: guide.frontmatter.draft,
  });
}

export default async function GuidePage({ params }: PageProps<"/guider/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const { frontmatter: fm } = guide;
  const cta = clusterCta[fm.cluster];

  const related = getGuides()
    .filter((item) => item.slug !== guide.slug)
    .filter(
      (item) =>
        fm.related.includes(item.slug) || item.frontmatter.cluster === fm.cluster,
    )
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.publishedAt,
    dateModified: fm.updatedAt,
    inLanguage: "sv-SE",
    author: { "@type": "Person", name: "Anton Marklund" },
    mainEntityOfPage: `${siteUrl}/guider/${guide.slug}`,
  };

  return (
    <>
      <Container width="content" className="pt-10 sm:pt-14">
        <Link
          href="/guider"
          className="text-sm font-medium text-forest-800 underline decoration-forest-300 underline-offset-4"
        >
          ← {strings.cta.backToGuides}
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-clay-600">
          {strings.clusters[fm.cluster]}
          {fm.draft ? " · utkast" : ""}
        </p>

        <h1 className="mt-3 text-display-lg">{fm.title}</h1>
        <p className="mt-5 text-lead text-ink-500">{fm.description}</p>
        <p className="mt-6 text-sm text-ink-400">
          {strings.guides.updatedPrefix} {fm.updatedAt} · {guide.readingMinutes}{" "}
          {strings.guides.readingSuffix}
        </p>
      </Container>

      <Container width="content" className="mt-10">
        <ImageSlot
          src={fm.heroImage}
          alt={fm.title}
          brief={`${strings.placeholders.image}: ${fm.title}`}
          aspect="16 / 9"
          sizes="(min-width: 768px) 46rem, 100vw"
        />
      </Container>

      <Container width="content" className="mt-12">
        <div className="prose">
          <MdxContent source={guide.body} />
        </div>
      </Container>

      {fm.faq.length > 0 ? (
        <Container width="content" className="mt-16">
          <h2 className="text-display-sm">{strings.guides.faqTitle}</h2>
          <div className="mt-6">
            <FaqAccordion items={fm.faq} />
          </div>
        </Container>
      ) : null}

      <Container width="content" className="mt-16">
        <CtaBlock
          formId={clusterForm[fm.cluster]}
          variant="compact"
          eyebrow="Nästa steg"
          title={cta.title}
          body={cta.body}
          whatsappMessage={`Hej Anton! Jag läste "${fm.title}" och har en fråga.`}
        />
      </Container>

      <Container width="content" className="mt-10">
        <div className="rounded-xl border border-sand-300 bg-white p-6 sm:p-8">
          <p className="font-display text-xl text-ink-900">
            {strings.newsletter.title}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
            {strings.newsletter.body}
          </p>
          <div className="mt-5">
            <NewsletterForm tone="default" />
          </div>
        </div>
      </Container>

      {related.length > 0 ? (
        <Section>
          <h2 className="text-display-sm">{strings.guides.relatedTitle}</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} guide={item} />
            ))}
          </div>
        </Section>
      ) : (
        <div className="h-16" />
      )}

      <JsonLd schema={articleSchema} />
      {fm.faq.length > 0 ? <JsonLd schema={faqSchema(fm.faq)} /> : null}
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: strings.guides.indexTitle, path: "/guider" },
          { name: fm.title, path: `/guider/${guide.slug}` },
        ])}
      />
    </>
  );
}
