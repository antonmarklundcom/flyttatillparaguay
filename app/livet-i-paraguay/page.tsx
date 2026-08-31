import Link from "next/link";
import { ArticleCard, CtaBlock, Section, SectionHeading, SplitHero, BentoGrid } from "@/components/blocks";
import { Card } from "@/components/ui";
import { getCities, getGuidesByCluster } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Livet i Paraguay",
  description:
    "Levnadskostnader, säkerhet, klimat, mat, sjukvård och vardagen — så är det att faktiskt bo i Paraguay som svensk.",
  path: "/livet-i-paraguay",
});

const themes = [
  { title: "Levnadskostnader", description: "Placeholder: vad en månad faktiskt kostar.", wide: true },
  { title: "Säkerhet", description: "Placeholder: ärligt om vad man ska tänka på." },
  { title: "Mat och kött", description: "Placeholder: asadokulturen och närproducerat." },
  { title: "Sjukvård", description: "Placeholder: privat vård och försäkring." },
  { title: "Relationer och familjeliv", description: "Placeholder: mitt perspektiv, smakfullt hållet.", wide: true },
];

export default function LivetPage() {
  const cities = getCities();
  const guides = getGuidesByCluster("livsstil").slice(0, 3);

  return (
    <>
      <SplitHero
        eyebrow="Livsstilshubb"
        title="Livet i Paraguay, som det faktiskt ser ut"
        description="Placeholder-ingress. Opus-2 skriver hubbtexten; sonnet-3 fyller guiderna."
        primary={{ href: "/guider?cluster=livsstil", label: "Alla livsstilsguider" }}
      />

      <Section>
        <SectionHeading eyebrow="Teman" title="Det folk faktiskt frågar om" />
        <div className="mt-10">
          <BentoGrid items={themes} />
        </div>
      </Section>

      <Section className="bg-cream-200/60">
        <SectionHeading eyebrow="Orter" title="Var man bor" description="Fem orter, fem helt olika liv." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.length === 0 ? (
            <p className="text-sm text-(--color-text-muted)">Ortsprofiler skapas i fas opus-2.</p>
          ) : (
            cities.map((city) => (
              <Card key={city.slug}>
                <h3 className="text-lg">
                  <Link href={`/livet-i-paraguay/${city.slug}`}>{city.frontmatter.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-(--color-text-muted)">{city.frontmatter.description}</p>
              </Card>
            ))
          )}
        </div>
      </Section>

      {guides.length > 0 ? (
        <Section>
          <SectionHeading eyebrow="Guider" title="Läs vidare" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {guides.map((guide) => (
              <ArticleCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <CtaBlock
          title="Undrar du något om vardagen här?"
          description="Fråga rakt ut — jag svarar hellre på det konkreta än det allmänna."
          cluster="livsstil"
        />
      </Section>
    </>
  );
}
