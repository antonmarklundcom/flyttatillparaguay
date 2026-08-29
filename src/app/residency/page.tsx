import { Section } from "@/components/layout/Section";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { PackageGrid } from "@/components/marketing/PackageGrid";
import { PageHero } from "@/components/marketing/PageHero";
import { ProcessTimeline } from "@/components/marketing/ProcessTimeline";
import { StatRow } from "@/components/marketing/StatRow";
import { StickyMobileCta } from "@/components/marketing/StickyMobileCta";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";

/**
 * Money page (plan.md §3A). Skelett i opus-1 — opus-2 skriver full copy,
 * sätter paketpriser och lägger till Article-/FAQPage-schema per avsnitt.
 */

export const metadata = buildMetadata({
  title: "Residency i Paraguay — process, krav och kostnad",
  description:
    "Steg för steg genom paraguaysk residency: krav, dokument, tidslinje, vad det kostar och vad som inte ingår.",
  path: "/residency",
});

const stats = [
  { value: "~3 mån", label: "Från komplett ansökan", note: "uppskattning 2026" },
  { value: "2", label: "Resor i normalfallet" },
  { value: "10 %", label: "Bolags- och inkomstskatt", note: "ej skatterådgivning" },
  { value: "Permanent", label: "Vanligaste residencytypen" },
];

const steps = [
  {
    title: "Kartläggning",
    duration: "Vecka 1",
    body: "Platshållartext: vi går igenom din situation, din familj och din tidsplan och bestämmer vilken väg som passar.",
  },
  {
    title: "Dokument i Sverige",
    duration: "Vecka 2–6",
    body: "Platshållartext: personbevis, belastningsregisterutdrag, födelsebevis — apostille och auktoriserad översättning.",
  },
  {
    title: "Ansökan i Paraguay",
    duration: "Ca 1 vecka på plats",
    body: "Platshållartext: inlämning, biometri och myndighetsbesök tillsammans med det lokala teamet.",
  },
  {
    title: "Beslut",
    duration: "Handläggning",
    body: "Platshållartext: vad som händer medan du väntar och vad du kan göra under tiden.",
  },
  {
    title: "Cedula och nästa steg",
    duration: "Efter beslut",
    body: "Platshållartext: id-kort, bankkonto och de praktiska sakerna som blir möjliga först nu.",
  },
];

const requirements = [
  "Giltigt pass med god marginal",
  "Födelsebevis med apostille",
  "Utdrag ur belastningsregistret med apostille",
  "Auktoriserad översättning till spanska",
  "Vigselbevis om du ansöker med partner",
];

const faq = [
  {
    question: "Vad kostar hela processen?",
    answer:
      "Platshållarsvar: myndighetsavgifter, apostille, översättningar och resa tillkommer utöver paketet. Exakta siffror sätts i nästa fas.",
  },
  {
    question: "Måste jag kunna spanska?",
    answer:
      "Platshållarsvar: nej, men det underlättar. Det lokala teamet tolkar under myndighetsbesöken.",
  },
  {
    question: "Vad ingår INTE?",
    answer:
      "Platshållarsvar: myndighetsavgifter, apostille, översättningar, flyg och boende — allt sådant redovisas öppet innan du bestämmer dig.",
  },
];

export default function ResidencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Huvudtjänsten"
        title="Residency i Paraguay, från första frågan till cedula"
        lead="Platshållaringress: vad residency faktiskt innebär, vad som krävs av dig, hur lång tid det tar och vad det kostar — utan skönmålning."
        actions={
          <>
            <ButtonLink href={whatsappUrl("Hej Anton! Jag vill veta mer om residency.")} external variant="accent" size="lg">
              Skriv på WhatsApp
            </ButtonLink>
            <ButtonLink href="#paket" variant="outline" size="lg">
              Se paket och priser
            </ButtonLink>
          </>
        }
      />

      <Section className="!py-0">
        <StatRow stats={stats} />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Processen"
          title="Så går det till, steg för steg"
          lead="Platshållaringress: hela kedjan i kronologisk ordning, med realistiska tidsangivelser."
        />
        <div className="mt-10 max-w-3xl">
          <ProcessTimeline steps={steps} />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Krav"
              title="Dokumenten du behöver"
              lead="Platshållaringress: listan nedan är utgångsläget — den slutliga listan beror på din situation."
            />
            <ul className="mt-8 space-y-3 text-[0.9375rem] text-ink-700">
              {requirements.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border-l-4 border-clay-400 bg-white p-6 sm:p-8">
            <h2 className="text-display-sm">Vad som inte ingår</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500">
              Platshållartext: riskavsnittet enligt plan.md §3A. Här står rakt ut
              vad paketet inte täcker, vad som kan gå fel och vad som ligger
              utanför min kontroll — myndigheternas handläggningstider,
              regeländringar och dina egna dokument.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              Innehållet på sidan är allmän information, inte juridisk eller
              skatterådgivning.
            </p>
          </div>
        </div>
      </Section>

      <Section id="paket">
        <SectionHeading
          eyebrow="Paket"
          title="Tre nivåer av hjälp"
          lead="Platshållaringress: välj själv hur mycket du vill göra på egen hand."
        />
        <div className="mt-10">
          <PackageGrid />
        </div>
      </Section>

      <Section tone="muted" width="content">
        <SectionHeading eyebrow="Frågor" title="Vanliga frågor om residency" />
        <div className="mt-8">
          <FaqAccordion items={faq} />
        </div>
      </Section>

      <Section>
        <CtaBlock
          formId="residency"
          eyebrow="Kom igång"
          title="Berätta om din situation"
          body="Platshållartext: skriv några rader om dig, din familj och din tidsplan så återkommer jag med vad som gäller i just ditt fall."
          whatsappMessage="Hej Anton! Jag vill veta mer om residency i Paraguay."
        />
      </Section>

      <StickyMobileCta
        label="Frågor om residency?"
        message="Hej Anton! Jag vill veta mer om residency i Paraguay."
      />

      <JsonLd schema={faqSchema(faq)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Residency", path: "/residency" },
        ])}
      />
    </>
  );
}
