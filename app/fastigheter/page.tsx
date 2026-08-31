import { CtaBlock, Section, SectionHeading, SplitHero, StatRow, StickyMobileCta } from "@/components/blocks";
import { LeadForm } from "@/components/lead-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tomter och hus i Paraguay",
  description:
    "Hur mark- och husköp fungerar för utlänningar i Paraguay, vad det kostar och hur du undviker fallgroparna.",
  path: "/fastigheter",
});

const stats = [
  { value: "100 %", label: "Utländskt ägande tillåtet" },
  { value: "Lagfart", label: "Escritura pública" },
  { value: "1,5 %", label: "Överlåtelseskatt", note: "Uppskattning 2026." },
  { value: "Lokalt", label: "Alltid egen jurist" },
];

export default function FastigheterPage() {
  return (
    <>
      <SplitHero
        eyebrow="Sekundär tjänst"
        title="Tomter och hus — utan att gå på minor"
        description="Placeholder-ingress. Opus-2 skriver copyn: varför mark, hur köp fungerar som utlänning, exempel-case och hänvisning till propia.com.py."
        primary={{ href: "#forfragan", label: "Berätta vad du söker" }}
      />

      <Section>
        <SectionHeading eyebrow="Grunderna" title="Vad du behöver veta först" />
        <div className="mt-10">
          <StatRow stats={stats} />
        </div>
      </Section>

      <Section id="forfragan" className="bg-cream-200/60">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Förfrågan"
            title="Vad letar du efter?"
            description="Jag matchar mot mitt nätverk och mina egna listningar på propia.com.py."
          />
          <LeadForm
            formId="fastigheter"
            submitLabel="Skicka förfrågan"
            extraFields={[
              { name: "objekttyp", label: "Typ", type: "select", options: ["Tomt", "Hus", "Lantbruk", "Vet ej ännu"] },
              { name: "budget", label: "Ungefärlig budget (EUR)" },
              { name: "omrade", label: "Område" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <CtaBlock
          title="Vill du se objekt direkt?"
          description="Skriv på WhatsApp så skickar jag aktuella tomter och hus."
          cluster="fastigheter"
        />
      </Section>

      <StickyMobileCta label="Förfrågan" href="#forfragan" />
    </>
  );
}
