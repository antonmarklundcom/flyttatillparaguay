import { CtaBlock, Faq, ProcessTimeline, Section, SectionHeading, SplitHero, StatRow, StickyMobileCta } from "@/components/blocks";
import { Card, Disclaimer, JsonLd, ButtonLink } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";
import { packages } from "@/content/packages";
import { strings } from "@/content/strings";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Residency i Paraguay — process, krav och priser",
  description:
    "Steg för steg: dokumenten du behöver från Sverige, tiden på plats, kostnaderna och vad som ingår i varje paket.",
  path: "/residency",
});

const steps = [
  { title: "Samtal", description: "Placeholder — opus-2 skriver processtexten." },
  { title: "Dokument från Sverige", description: "Placeholder: apostille, personbevis, belastningsregister." },
  { title: "Veckan i Asunción", description: "Placeholder: myndighetsbesök, biometri, bank." },
  { title: "Cédula och efter", description: "Placeholder: vad du gör efter beviljad residency." },
];

const stats = [
  { value: "3–6 mån", label: "Handläggningstid", note: strings.disclaimers.estimate },
  { value: "≈ 7 dagar", label: "Tid på plats" },
  { value: "18 år", label: "Åldersgräns" },
  { value: "Permanent", label: "Residencytyp" },
];

const faq = [
  { question: "Vad krävs av mig i Sverige?", answer: "Placeholder-svar." },
  { question: "Vad kostar myndighetsavgifterna?", answer: "Placeholder-svar." },
  { question: "Vad ingår inte?", answer: "Placeholder-svar — riskavsnittet skrivs i opus-2." },
];

export default function ResidencyPage() {
  return (
    <>
      <SplitHero
        eyebrow="Huvudtjänsten"
        title="Residency i Paraguay, från första frågan till cédula"
        description="Placeholder-ingress. Här skriver opus-2 hela money page-copyn: process, krav, tidslinje, paket, risker."
        primary={{ href: "#paket", label: "Se paket och priser" }}
        secondary={{ href: "#forfragan", label: "Skicka en förfrågan" }}
      />

      <Section>
        <SectionHeading eyebrow="Processen" title="Så går det till" />
        <div className="mt-10">
          <ProcessTimeline steps={steps} />
        </div>
        <div className="mt-12">
          <StatRow stats={stats} />
        </div>
        <Disclaimer>{strings.disclaimers.tax}</Disclaimer>
      </Section>

      <Section id="paket" className="bg-cream-200/60">
        <SectionHeading
          eyebrow="Paket"
          title="Tre sätt att göra det"
          description="Priser är platshållare tills de fastställts."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {packages.map((pack) => (
            <Card key={pack.id} className={pack.popular ? "ring-2 ring-(--color-accent)" : ""}>
              <h3 className="text-xl">{pack.name}</h3>
              <p className="mt-2 text-sm text-(--color-text-muted)">{pack.tagline}</p>
              <p className="mt-5 font-(family-name:--font-display) text-3xl text-(--color-brand)">
                {pack.priceEur.toLocaleString("sv-SE")} €
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {pack.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-(--color-accent)">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-text-muted)">
                Ingår inte
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-(--color-text-muted)">
                {pack.excludes.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
              <ButtonLink href="#forfragan" className="mt-6 w-full">
                Välj {pack.name}
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>

      <Section id="forfragan">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Nästa steg"
            title="Skicka en förfrågan"
            description="Berätta kort var du står. Jag svarar själv, normalt inom ett dygn."
          />
          <LeadForm
            formId="residency"
            submitLabel="Skicka förfrågan"
            extraFields={[
              { name: "paket", label: "Paket", type: "select", options: packages.map((p) => p.name) },
              { name: "tidsplan", label: "När vill du flytta?" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <CtaBlock
          title="Hellre en snabb fråga?"
          description="WhatsApp är snabbaste vägen — skriv så återkommer jag."
          cluster="residency"
        />
      </Section>

      <StickyMobileCta label="Förfrågan" href="#forfragan" />
      <JsonLd data={faqSchema(faq)} />
    </>
  );
}
