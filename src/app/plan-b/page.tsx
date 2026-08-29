import { Section } from "@/components/layout/Section";
import { ArticleCard } from "@/components/marketing/ArticleCard";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { PageHero } from "@/components/marketing/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGuidesByCluster } from "@/lib/mdx";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

/**
 * Frihetshubb (plan.md §3A). Tonen är möjlighetsorienterad, aldrig
 * domedagsbetonad eller politiskt aggressiv (§1.6).
 */

export const metadata = buildMetadata({
  title: "Plan B — residency som försäkring",
  description:
    "Varför en Plan B är värd att ha, hur residency fungerar som försäkring och hur Paraguay står sig mot Panama, Portugal och Dubai.",
  path: "/plan-b",
});

const comparison = [
  {
    country: "Paraguay",
    speed: "Snabb",
    cost: "Låg",
    residence: "Ingen vistelseplikt i praktiken",
    note: "Platshållartext",
  },
  {
    country: "Panama",
    speed: "Medel",
    cost: "Medel",
    residence: "Regelbundna besök",
    note: "Platshållartext",
  },
  {
    country: "Portugal",
    speed: "Långsam",
    cost: "Hög",
    residence: "Faktisk vistelse krävs",
    note: "Platshållartext",
  },
  {
    country: "Dubai",
    speed: "Snabb",
    cost: "Hög",
    residence: "Besök var sjätte månad",
    note: "Platshållartext",
  },
];

export default function PlanBPage() {
  const guides = getGuidesByCluster("planb").slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Plan B"
        title="En andra dörr, innan du behöver den"
        lead="Platshållaringress: en Plan B handlar inte om att fly något — det handlar om att ha fler val än ett. Här går jag igenom vad residency faktiskt ger dig och vad den inte löser."
        actions={
          <ButtonLink href="/residency" variant="accent" size="lg">
            Så fungerar residency
          </ButtonLink>
        }
      />

      <Section width="content">
        <div className="prose">
          <h2>Varför en Plan B</h2>
          <p>
            Platshållartext: resonemanget skrivs i fas opus-2, i Antons röst och
            med den positiva, konkreta tonen från plan.md §1.6.
          </p>
          <h2>Residency som försäkring</h2>
          <p>Platshållartext.</p>
          <h2>Skatteperspektivet</h2>
          <p>Platshållartext.</p>
        </div>

        <aside className="mt-10 rounded-lg border-l-4 border-clay-400 bg-clay-50 py-4 pl-5 pr-5 text-[0.9375rem] leading-relaxed text-ink-700">
          Det här är allmän information och personliga erfarenheter — inte
          skatterådgivning. Prata alltid med en kvalificerad rådgivare och med
          Skatteverket innan du fattar beslut som påverkar din skattesituation.
        </aside>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Jämförelse"
          title="Paraguay mot alternativen"
          lead="Platshållaringress: en grov översikt. Detaljerna finns i guiden."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-[0.9375rem]">
            <thead>
              <tr className="border-b border-sand-400 text-left">
                <th className="py-3 pr-4 font-display text-base font-medium text-ink-900">Land</th>
                <th className="py-3 pr-4 font-display text-base font-medium text-ink-900">Tempo</th>
                <th className="py-3 pr-4 font-display text-base font-medium text-ink-900">Kostnad</th>
                <th className="py-3 font-display text-base font-medium text-ink-900">Vistelsekrav</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.country} className="border-b border-sand-300">
                  <td className="py-3.5 pr-4 font-medium text-ink-800">{row.country}</td>
                  <td className="py-3.5 pr-4 text-ink-500">{row.speed}</td>
                  <td className="py-3.5 pr-4 text-ink-500">{row.cost}</td>
                  <td className="py-3.5 text-ink-500">{row.residence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {guides.length > 0 ? (
        <Section>
          <SectionHeading eyebrow="Guider" title="Läs vidare" />
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <ArticleCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone={guides.length > 0 ? "muted" : "default"}>
        <CtaBlock
          formId="kontakt"
          eyebrow="Nästa steg"
          title="Är Paraguay rätt Plan B för dig?"
          body="Platshållartext: berätta kort om din situation så säger jag rakt ut om det är värt att gå vidare."
          whatsappMessage="Hej Anton! Jag funderar på Paraguay som Plan B."
        />
      </Section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Plan B", path: "/plan-b" },
        ])}
      />
    </>
  );
}
