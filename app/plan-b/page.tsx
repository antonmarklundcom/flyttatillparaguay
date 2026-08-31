import { ArticleCard, CtaBlock, Section, SectionHeading, SplitHero } from "@/components/blocks";
import { Disclaimer } from "@/components/ui";
import { getGuidesByCluster } from "@/lib/content";
import { strings } from "@/content/strings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plan B — residency som försäkring",
  description:
    "Varför fler svenskar skaffar ett andra hem, hur Paraguay står sig mot Panama, Portugal och Dubai, och vad en Plan B faktiskt löser.",
  path: "/plan-b",
});

export default function PlanBPage() {
  const guides = getGuidesByCluster("planb").slice(0, 3);

  return (
    <>
      <SplitHero
        eyebrow="Frihetshubb"
        title="En Plan B är inte flykt. Det är valfrihet."
        description="Placeholder-ingress. Opus-2 skriver hubbtexten — möjlighetsorienterad ton, aldrig domedag (plan §1.6)."
        primary={{ href: "/residency", label: "Så fungerar residencyn" }}
      />

      <Section>
        <SectionHeading eyebrow="Jämförelse" title="Paraguay mot alternativen" description="Placeholder-tabell: Paraguay, Panama, Portugal, Dubai." />
        <Disclaimer>{strings.disclaimers.tax}</Disclaimer>
      </Section>

      {guides.length > 0 ? (
        <Section className="bg-cream-200/60">
          <SectionHeading eyebrow="Guider" title="Fördjupning" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {guides.map((guide) => (
              <ArticleCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <CtaBlock
          title="Vill du veta om det passar dig?"
          description="Ett kort samtal räcker för att avgöra om det här är rätt väg."
          cluster="planb"
        />
      </Section>
    </>
  );
}
