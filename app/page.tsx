import Link from "next/link";
import {
  BentoGrid,
  CtaBlock,
  Faq,
  ProcessTimeline,
  Section,
  SectionHeading,
  SplitHero,
  StatRow,
  ArticleCard,
  ImageSlot,
} from "@/components/blocks";
import { Card, ButtonLink, Disclaimer, JsonLd } from "@/components/ui";
import { packages } from "@/content/packages";
import { getGuides } from "@/lib/content";
import { faqSchema } from "@/lib/seo";
import { strings } from "@/content/strings";

/**
 * Startsidan är också designsystemets skyltfönster: varje komponent från
 * plan §5.1 demonstreras här. Placeholder-copy — opus-2 skriver den riktiga.
 */

const whyParaguay = [
  {
    stat: "10 %",
    title: "Enkel skattemodell",
    description:
      "10 % bolagsskatt, 10 % inkomstskatt, 10 % moms — och territoriell beskattning. Platshållartext, skrivs i opus-2.",
    wide: true,
  },
  {
    stat: "≈ 40 %",
    title: "Lägre kostnadsläge",
    description: "Placeholder: verkliga jämförelsesiffror kommer i ekonomiklustret.",
  },
  {
    title: "Residency som håller",
    description: "Placeholder: permanent residency, cédula och vad den faktiskt ger dig.",
  },
  {
    title: "Klimat och natur",
    description: "Placeholder: subtropiskt, gröna somrar, milda vintrar.",
  },
  {
    title: "Nära Sverige i praktiken",
    description: "Placeholder: hur ofta man realistiskt reser hem.",
    wide: true,
  },
];

const steps = [
  { title: "Samtal", description: "Vi går igenom din situation och vad du faktiskt behöver." },
  { title: "Dokument", description: "Du samlar underlag i Sverige, jag ger listan och ordningen." },
  { title: "Veckan här", description: "Bokade myndighetsbesök under ditt besök i Asunción." },
  { title: "Cédula", description: "Residency beviljad och id-kort i handen." },
];

const stats = [
  { value: "10 %", label: "Skattesats", note: strings.disclaimers.estimate },
  { value: "1 vecka", label: "På plats i Paraguay", note: "Typisk vistelse" },
  { value: "3–6 mån", label: "Handläggning", note: strings.disclaimers.estimate },
  { value: "0", label: "Krav på språktest", note: "Inget spanskaprov" },
];

const faq = [
  {
    question: "Måste jag bo i Paraguay för att behålla min residency?",
    answer: "Placeholder-svar. Skrivs i opus-2 tillsammans med resten av money page-copyn.",
  },
  {
    question: "Hur lång tid tar processen?",
    answer: "Placeholder-svar med riktiga tidsintervall och 2026-markering.",
  },
  {
    question: "Kan familjen komma med?",
    answer: "Placeholder-svar om familjepaketet.",
  },
];

export default function HomePage() {
  const latest = getGuides().slice(0, 3);

  return (
    <>
      <SplitHero
        eyebrow="För svenskar som menar allvar"
        title="Residency i Paraguay — hela vägen, på svenska"
        description="Jag heter Anton, jag är 34 och gjorde flytten själv. Nu tar jag svenskar genom exakt samma process: dokumenten, myndigheterna, banken och veckan på plats."
        bullets={[
          "Placeholder: hela processen på svenska, ombud på plats",
          "Placeholder: fast pris, inga överraskningar",
          "Placeholder: du behöver vara här ungefär en vecka",
        ]}
        primary={{ href: "/residency", label: "Så går det till" }}
        secondary={{ href: "/kontakt", label: "Boka ett samtal" }}
      />

      <Section>
        <SectionHeading
          eyebrow="Varför Paraguay"
          title="Fem skäl som faktiskt håller"
          description="Placeholder-ingress. Opus-2 skriver den riktiga texten i Antons röst."
        />
        <div className="mt-10">
          <BentoGrid items={whyParaguay} />
        </div>
      </Section>

      <Section className="bg-cream-200/60">
        <SectionHeading eyebrow="Processen" title="Fyra steg från fråga till cédula" />
        <div className="mt-10">
          <ProcessTimeline steps={steps} />
        </div>
        <div className="mt-12">
          <StatRow stats={stats} />
        </div>
        <Disclaimer>{strings.disclaimers.tax}</Disclaimer>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Paket"
          title="Välj hur mycket du vill göra själv"
          description="Priserna nedan är platshållare tills de sätts slutgiltigt."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {packages.map((pack) => (
            <Card key={pack.id} className={pack.popular ? "ring-2 ring-(--color-accent)" : ""}>
              {pack.popular ? (
                <p className="mb-3 inline-block rounded-full bg-terracotta-100 px-3 py-1 text-xs font-semibold text-terracotta-700">
                  Vanligast
                </p>
              ) : null}
              <h3 className="text-xl">{pack.name}</h3>
              <p className="mt-2 text-sm text-(--color-text-muted)">{pack.tagline}</p>
              <p className="mt-5 font-(family-name:--font-display) text-3xl text-(--color-brand)">
                {pack.priceEur.toLocaleString("sv-SE")} €
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {pack.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-(--color-accent)">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/residency" variant="ghost" className="mt-6 w-full">
                Läs vad som ingår
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-cream-200/60">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-xl) border border-(--color-line)">
            <ImageSlot label="Porträtt Anton — riktigt foto, plan §7" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Om mig"
              title="Jag bor här. Det är hela poängen."
              description="Placeholder-story. Opus-2 skriver den riktiga versionen: flytten, flickvännen, varför jag hjälper andra."
            />
            <ButtonLink href="/om" variant="ghost" className="mt-6">
              Läs hela historien
            </ButtonLink>
          </div>
        </div>
      </Section>

      {latest.length > 0 ? (
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Guider" title="Läs på innan du bestämmer dig" />
            <Link href="/guider" className="text-sm font-semibold text-(--color-brand) underline">
              {strings.cta.seeAll}
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latest.map((guide) => (
              <ArticleCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="mx-auto max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>

      <Section>
        <CtaBlock
          title="Berätta var du står idag"
          description="Skriv en rad på WhatsApp eller fyll i formuläret — jag svarar själv, normalt inom ett dygn."
        />
      </Section>

      <JsonLd data={faqSchema(faq)} />
    </>
  );
}
