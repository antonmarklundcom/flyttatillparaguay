import Link from "next/link";

import { strings } from "@content/strings";

import { Section } from "@/components/layout/Section";
import { ArticleCard } from "@/components/marketing/ArticleCard";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { PageHero } from "@/components/marketing/PageHero";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { toGuideSummary } from "@/lib/content";
import { getCities, getGuidesByCluster } from "@/lib/mdx";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

/** Livsstilshubb (plan.md §3A). Länkar samtliga ortsprofiler. */

export const metadata = buildMetadata({
  title: "Livet i Paraguay — kostnader, säkerhet, mat och vardag",
  description:
    "Levnadskostnader, säkerhet, klimat, mat, sjukvård och vardagsliv i Paraguay — sett från en svensk som bor här.",
  path: "/livet-i-paraguay",
});

const topics = [
  { title: "Levnadskostnader", body: "Vad saker faktiskt kostar, med siffror." },
  { title: "Säkerhet", body: "Ärligt om vad som gäller, utan skräckpropaganda." },
  { title: "Klimat och årstider", body: "Hur en svensk kropp reagerar på första sommaren." },
  { title: "Mat, kött och närodlat", body: "Asadokulturen och matkvaliteten." },
  { title: "Sjukvård och försäkring", body: "Privat vård, kostnader och vad som är värt att ha." },
  { title: "Relationer och familjeliv", body: "Mitt perspektiv som svensk med paraguayansk flickvän." },
];

export default function LivetIParaguayPage() {
  const cities = getCities();
  const guides = getGuidesByCluster("livsstil").slice(0, 3).map(toGuideSummary);

  return (
    <>
      <PageHero
        eyebrow="Livsstil"
        title="Livet i Paraguay, som det faktiskt ser ut"
        lead="Platshållaringress: vardagen, kostnaderna, maten, sjukvården och människorna — det som avgör om du trivs långsiktigt, inte bara om pappren går igenom."
      />

      <Section>
        <SectionHeading
          eyebrow="Vad du hittar här"
          title="Sex ämnen som avgör om du trivs"
          lead="Platshållaringress."
        />
        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div key={topic.title} className="border-t border-sand-300 pt-5">
              <h3 className="text-xl">{topic.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
                {topic.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Städer"
          title={strings.cities.indexTitle}
          lead={strings.cities.indexIntro}
        />
        {cities.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <article key={city.slug} className="group">
                <ImageSlot
                  src={city.frontmatter.heroImage}
                  alt={city.frontmatter.title}
                  brief={`${strings.placeholders.image}: ${city.frontmatter.title}`}
                  aspect="16 / 10"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="mb-5"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-600">
                  {city.frontmatter.region}
                </p>
                <h3 className="mt-2 text-xl">
                  <Link
                    href={`/livet-i-paraguay/${city.slug}`}
                    className="transition-colors group-hover:text-forest-700"
                  >
                    {city.frontmatter.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
                  {city.frontmatter.description}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-ink-400">
            Ortsprofilerna skrivs i fas sonnet-3.
          </p>
        )}
      </Section>

      {guides.length > 0 ? (
        <Section>
          <SectionHeading eyebrow="Guider" title="Läs vidare om livsstil" />
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <ArticleCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="muted">
        <CtaBlock
          formId="kontakt"
          variant="compact"
          eyebrow="Undrar du något?"
          title="Fråga om vad som helst i vardagen"
          body="Platshållartext: säkerhet, skola, sjukvård, hundar, internet — det finns inga dumma frågor."
          whatsappMessage="Hej Anton! Jag har en fråga om livet i Paraguay."
        />
      </Section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Livet i Paraguay", path: "/livet-i-paraguay" },
        ])}
      />
    </>
  );
}
