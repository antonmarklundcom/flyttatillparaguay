import { Section } from "@/components/layout/Section";
import { BentoGrid } from "@/components/marketing/BentoGrid";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { PageHero } from "@/components/marketing/PageHero";
import { ProcessTimeline } from "@/components/marketing/ProcessTimeline";
import { StickyMobileCta } from "@/components/marketing/StickyMobileCta";
import { ButtonLink } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";

/**
 * Fastigheter är leadförmedling, inte en listningsdatabas (plan.md §1.5).
 * Bygg ALDRIG listningsfunktionalitet här — det ligger i backloggen §10.
 */

export const metadata = buildMetadata({
  title: "Tomter och hus i Paraguay — så fungerar köp som utlänning",
  description:
    "Varför mark i Paraguay är intressant, hur ett köp går till för en utlänning, vanliga fallgropar och hur du hittar objekt.",
  path: "/fastigheter",
});

const why = [
  {
    title: "Mark är fortfarande överkomlig",
    body: "Platshållartext: prisbilden per region och vad som driver den.",
  },
  {
    title: "Utlänningar får äga",
    body: "Platshållartext: vad som gäller juridiskt och var undantagen finns.",
  },
  {
    title: "Bygga är ofta billigare än att köpa färdigt",
    body: "Platshållartext: grov kostnadsbild för att bygga hus.",
  },
];

const steps = [
  {
    title: "Bestäm region och syfte",
    body: "Platshållartext: boende, uthyrning eller ren markinvestering leder till olika val.",
  },
  {
    title: "Kontrollera lagfart och gränser",
    body: "Platshållartext: den viktigaste delen av hela affären — vad som ska granskas innan du betalar något.",
  },
  {
    title: "Avtal och betalning",
    body: "Platshållartext: hur betalningen struktureras och vem som håller pengarna.",
  },
  {
    title: "Registrering",
    body: "Platshållartext: vad som händer efter tillträdet och hur lång tid det tar.",
  },
];

export default function FastigheterPage() {
  return (
    <>
      <PageHero
        eyebrow="Fastigheter"
        title="Tomter och hus — hur köp faktiskt fungerar som utlänning"
        lead="Platshållaringress: jag säljer inga objekt själv. Jag hjälper dig förstå marknaden, undvika fallgroparna och kopplar dig vidare till rätt personer."
        actions={
          <ButtonLink
            href={whatsappUrl("Hej Anton! Jag är intresserad av tomt eller hus i Paraguay.")}
            external
            variant="accent"
            size="lg"
          >
            Skriv på WhatsApp
          </ButtonLink>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Varför mark här"
          title="Tre saker som gör Paraguay annorlunda"
          lead="Platshållaringress."
        />
        <div className="mt-10">
          <BentoGrid items={why} />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Processen"
              title="Från intresse till lagfart"
              lead="Platshållaringress."
            />
            <div className="mt-10">
              <ProcessTimeline steps={steps} />
            </div>
          </div>
          <ImageSlot
            alt="Tomtmark utanför Areguá i eftermiddagsljus"
            brief="Fastighetshero: öppen tomtmark med röd jord och gröna träd utanför Areguá, sent eftermiddagsljus — fas sonnet-4."
            aspect="3 / 4"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="lg:sticky lg:top-24"
          />
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-sand-300 bg-white p-6 shadow-card sm:p-10">
          <SectionHeading
            eyebrow="Objekt"
            title="Letar du efter något konkret?"
            lead="Platshållartext: aktuella objekt ligger hos mina kanaler och samarbetspartners — bland annat propia.com.py. Berätta vad du letar efter så pekar jag dig rätt."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="https://propia.com.py" external variant="outline" size="lg">
              Till propia.com.py
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <CtaBlock
          formId="fastigheter"
          eyebrow="Fastighetsförfrågan"
          title="Vad letar du efter?"
          body="Platshållartext: skriv region, budget och vad marken ska användas till, så återkommer jag med vad som är realistiskt."
          whatsappMessage="Hej Anton! Jag letar tomt/hus i Paraguay."
        />
      </Section>

      <StickyMobileCta
        label="Frågor om mark?"
        message="Hej Anton! Jag letar tomt/hus i Paraguay."
      />

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Fastigheter", path: "/fastigheter" },
        ])}
      />
    </>
  );
}
