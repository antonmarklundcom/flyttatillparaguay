import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, CtaBlock, Faq, Section } from "@/components/blocks";
import { JsonLd } from "@/components/ui";
import { Mdx } from "@/components/mdx";
import { formatDate, getGuide, getGuides } from "@/lib/content";
import { strings } from "@/content/strings";
import { articleSchema, faqSchema, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    path: `/guider/${guide.slug}`,
    image: guide.frontmatter.heroImage,
    noindex: guide.frontmatter.draft,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const { frontmatter } = guide;
  const related = frontmatter.relatedSlugs?.length
    ? frontmatter.relatedSlugs.map((related) => getGuide(related)).filter((doc) => doc !== null)
    : getGuides()
        .filter((doc) => doc.slug !== guide.slug && doc.frontmatter.cluster === frontmatter.cluster)
        .slice(0, 3);

  return (
    <>
      <article className="section">
        <div className="container-prose">
          <Link href="/guider" className="text-sm font-semibold text-(--color-brand) underline">
            ← {strings.cta.backToGuides}
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-accent)">
            {strings.clusters[frontmatter.cluster]}
          </p>
          <h1 className="mt-2 text-4xl leading-tight">{frontmatter.title}</h1>
          <p className="mt-4 text-lg text-(--color-text-muted)">{frontmatter.description}</p>
          <p className="mt-4 text-sm text-(--color-text-muted)">
            {frontmatter.updatedAt ? strings.guides.updated : strings.guides.published}{" "}
            {formatDate(frontmatter.updatedAt ?? frontmatter.publishedAt)} · {guide.readingMinutes}{" "}
            {strings.guides.readingTime}
          </p>

          <div className="mt-10">
            <Mdx source={guide.body} />
          </div>

          {frontmatter.faq?.length ? (
            <div className="mt-16">
              <Faq items={frontmatter.faq} />
            </div>
          ) : null}
        </div>
      </article>

      <Section>
        <CtaBlock
          title="Vill du gå från läsning till plan?"
          description="Ett samtal räcker för att veta om det här är rätt väg för dig."
          cluster={frontmatter.cluster}
        />
      </Section>

      {related.length > 0 ? (
        <Section>
          <h2 className="text-2xl md:text-3xl">{strings.guides.relatedTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.slice(0, 3).map((doc) => (
              <ArticleCard key={doc.slug} guide={doc} />
            ))}
          </div>
        </Section>
      ) : null}

      <JsonLd
        data={articleSchema({
          title: frontmatter.title,
          description: frontmatter.description,
          path: `/guider/${guide.slug}`,
          publishedAt: frontmatter.publishedAt,
          updatedAt: frontmatter.updatedAt,
          image: frontmatter.heroImage,
        })}
      />
      {frontmatter.faq?.length ? <JsonLd data={faqSchema(frontmatter.faq)} /> : null}
    </>
  );
}
