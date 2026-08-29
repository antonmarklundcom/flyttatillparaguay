import { Section } from "@/components/layout/Section";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { SplitHero } from "@/components/marketing/SplitHero";
import { StatRow } from "@/components/marketing/StatRow";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";

/** Förtroendesidan (plan.md §3A). Full copy skrivs i opus-2. */

export const metadata = buildMetadata({
  title: "Om Anton — svensken bakom sajten",
  description:
    "Jag heter Anton, är 34 år och flyttade från Sverige till Paraguay. Här är historien bakom sajten och varför jag hjälper andra med samma sak.",
  path: "/om",
});

const facts = [
  { value: "34", label: "År" },
  { value: "Sverige", label: "Uppvuxen" },
  { value: "Paraguay", label: "Bor sedan" },
  { value: "Svenska", label: "Språket vi pratar" },
];

export default function OmPage() {
  return (
    <>
      <SplitHero
        eyebrow="Om mig"
        title="Jag gjorde flytten själv först"
        lead="Platshållaringress: kort om vem jag är, hur jag hamnade i Paraguay, min paraguayanska flickvän och varför jag började hjälpa andra svenskar genom samma process."
        actions={
          <ButtonLink href={whatsappUrl("Hej Anton!")} external variant="accent" size="lg">
            Säg hej på WhatsApp
          </ButtonLink>
        }
        imageAlt="Porträtt av Anton"
        imageBrief="PORTRÄTTSLOT — riktigt foto på Anton är en §7-input från honom själv. AI-porträtt av Anton får aldrig genereras (plan.md §3D)."
      />

      <Section width="content">
        <StatRow stats={facts} />
      </Section>

      <Section width="content" className="!pt-0">
        <div className="prose">
          <h2>Hur det började</h2>
          <p>Platshållartext — skrivs i fas opus-2 i Antons egen röst.</p>
          <h2>Varför jag hjälper andra</h2>
          <p>Platshållartext.</p>
          <h2>Vad jag inte är</h2>
          <p>
            Platshållartext: här står rakt ut att jag inte är advokat, revisor
            eller skatterådgivare — och vad jag i stället faktiskt gör.
          </p>
        </div>
      </Section>

      <Section tone="muted">
        <CtaBlock
          formId="kontakt"
          eyebrow="Hör av dig"
          title="Fråga mig vad du vill"
          body="Platshållartext: jag läser allt själv och svarar oftast inom ett dygn."
          whatsappMessage="Hej Anton! Jag läste din historia och har en fråga."
        />
      </Section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Om Anton", path: "/om" },
        ])}
      />
    </>
  );
}
