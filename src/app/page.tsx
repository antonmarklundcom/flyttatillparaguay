import Link from "next/link";

import { strings } from "@content/strings";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArticleCard } from "@/components/marketing/ArticleCard";
import { BentoGrid } from "@/components/marketing/BentoGrid";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { PackageGrid } from "@/components/marketing/PackageGrid";
import { ProcessTimeline } from "@/components/marketing/ProcessTimeline";
import { SplitHero } from "@/components/marketing/SplitHero";
import { StatRow } from "@/components/marketing/StatRow";
import { ButtonLink } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGuides } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";

/**
 * Hemsidans skelett (plan.md §3A) — och samtidigt fasens levande demo av
 * design-tokens och hela komponentbiblioteket från §5.1.
 *
 * Copyn här är platshållare med rätt struktur och längd. Fas opus-2 skriver
 * den riktiga texten i Antons röst.
 */

export const metadata = buildMetadata({
  title: `${strings.brand.name} — ${strings.brand.tagline}`,
  description:
    "Residency, fastigheter och livet i Paraguay — på svenska, av någon som faktiskt bor här. Jag hjälper dig hela vägen från dokument till cedula.",
  path: "/",
});

const stats = [
  { value: "10 %", label: "Bolagsskatt", note: "10/10/10-systemet, uppskattning 2026" },
  { value: "~3 mån", label: "Normal handläggningstid", note: "från komplett ansökan" },
  { value: "183", label: "Dagar för skattehemvist", note: "tumregel — läs guiden" },
  { value: "2", label: "Resor till Paraguay", note: "i de flesta fall" },
];

const whyItems = [
  {
    figure: "10 %",
    title: "Ett skattesystem du kan förstå på en eftermiddag",
    body: "Platshållartext: här förklaras 10/10/10 kort och begripligt, med en tydlig markering om att det inte är skatterådgivning och en länk vidare till ekonomiguiden.",
  },
  {
    title: "Kostnadsläge som ger marginal",
    body: "Platshållartext: konkreta siffror på hyra, mat och sjukvård jämfört med Sverige.",
  },
  {
    title: "Residency som håller",
    body: "Platshållartext: permanent residency och vad den faktiskt ger dig över tid.",
  },
  {
    title: "Klimat och årstider",
    body: "Platshållartext: subtropiskt, varmt — och hur svenskar brukar uppleva första sommaren.",
  },
  {
    title: "Nära till mat och natur",
    body: "Platshållartext: kött, närodlat, marknader — kryddan i livsstilsinnehållet.",
  },
];

const steps = [
  {
    title: "Vi pratar igenom din situation",
    duration: "Vecka 1",
    body: "Platshållartext: ett samtal där vi går igenom familj, ekonomi och tidsplan, och avgör om Paraguay faktiskt passar dig.",
  },
  {
    title: "Dokumenten ordnas i Sverige",
    duration: "Vecka 2–6",
    body: "Platshållartext: utdrag, apostille och översättningar — exakt vilka papper som behövs och i vilken ordning.",
  },
  {
    title: "Resan och ansökan i Asunción",
    duration: "Ca 1 vecka på plats",
    body: "Platshållartext: vad som händer under besöket, vilka myndigheter du besöker och vem som följer med.",
  },
  {
    title: "Beviljad residency och cedula",
    duration: "Därefter",
    body: "Platshållartext: vad du får, vad som gäller sedan och vilka steg som är kvar.",
  },
];

const faq = [
  {
    question: "Hur lång tid tar hela processen?",
    answer:
      "Platshållarsvar: normalt runt tre månader från att dokumenten är kompletta, men det varierar. Den fulla tidslinjen finns på residency-sidan.",
  },
  {
    question: "Måste jag bo i Paraguay på heltid?",
    answer:
      "Platshållarsvar: nej — men skattehemvist och residency är två olika saker, och skillnaden är värd att förstå innan du bestämmer dig.",
  },
  {
    question: "Kan jag ta med familjen?",
    answer:
      "Platshållarsvar: ja, och det är oftast enklare att göra det samtidigt än i efterhand.",
  },
];

export default function HomePage() {
  const latestGuides = getGuides().slice(0, 3);

  return (
    <>
      <SplitHero
        eyebrow="Residency · Fastigheter · Livet här"
        title={
          <>
            Residency i Paraguay — <span className="text-clay-500">hela vägen</span>, på
            svenska
          </>
        }
        lead="Jag heter Anton, är 34 år och flyttade från Sverige till Paraguay. Här samlar jag allt jag hade velat veta i förväg — och hjälper dig genom processen från dokument till cedula."
        actions={
          <>
            <ButtonLink href={whatsappUrl()} external variant="accent" size="lg">
              {strings.cta.whatsapp}
            </ButtonLink>
            <ButtonLink href="/residency" variant="outline" size="lg">
              Så går det till
            </ButtonLink>
          </>
        }
        aside={
          <p className="text-sm text-ink-400">
            Fri första kontakt. Du får ett rakt svar på om det är värt det för dig.
          </p>
        }
        imageAlt="Anton på en veranda i Paraguay i eftermiddagsljus"
        imageBrief="Hero: svensk man i 30-årsåldern på en veranda utanför Asunción, golden hour, varma jordtoner, dokumentärt foto — genereras i fas sonnet-4. Riktigt porträtt är en §7-input."
      />

      <Container className="py-4">
        <StatRow stats={stats} />
      </Container>

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Varför Paraguay"
            title="Fem skäl som håller när nyhetsglansen lagt sig"
            lead="Platshållaringress: kort om vad som faktiskt gör landet intressant för en svensk — och vad som inte gör det."
          />
        </Reveal>
        <Reveal className="mt-10" delay={80}>
          <BentoGrid items={whyItems} />
        </Reveal>
      </Section>

      <Section tone="forest">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            tone="onDark"
            eyebrow="Processen"
            title="Fyra steg från fundering till cedula"
            lead="Platshållaringress: en översikt av hela resan. Varje steg beskrivs i detalj på residency-sidan."
          />
          <ProcessTimeline steps={steps} tone="onDark" />
        </div>
        <div className="mt-12">
          <ButtonLink href="/residency" variant="onDark" size="lg">
            Läs hela processen
          </ButtonLink>
        </div>
      </Section>

      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow="Paket"
            title="Välj hur mycket hjälp du vill ha"
            lead="Platshållaringress: tre nivåer, från kartläggning till att någon går bredvid dig hela vägen."
          />
        </Reveal>
        <Reveal className="mt-10" delay={80}>
          <PackageGrid compact />
        </Reveal>
        <div className="mt-8">
          <ButtonLink href="/residency" variant="outline">
            Se vad som ingår
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ImageSlot
            alt="Anton och hans flickvän på en marknad i Asunción"
            brief="Story-teaser: dokumentärt par-porträtt på en marknad, varmt eftermiddagsljus — fas sonnet-4. Riktiga foton på Anton är en §7-input."
            aspect="3 / 2"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <Reveal>
            <SectionHeading
              eyebrow="Om mig"
              title="Jag gjorde det här själv först"
              lead="Platshållaringress: kort om flytten, min paraguayanska flickvän och varför jag började hjälpa andra svenskar med samma sak."
            />
            <div className="mt-8">
              <ButtonLink href="/om" variant="outline">
                Läs hela historien
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Förtroende"
          title="Vad andra säger"
          lead="Platshållaryta: riktiga kundcase och omdömen läggs in när de finns (plan.md §10)."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <blockquote
              key={index}
              className="rounded-xl border border-dashed border-sand-400 bg-white/60 p-6"
            >
              <p className="font-display text-lg leading-relaxed text-ink-500">
                ”Platshållarcitat {index} — ersätts av ett riktigt omdöme.”
              </p>
              <footer className="mt-4 text-sm text-ink-400">Namn, ort</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {latestGuides.length > 0 ? (
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Guider"
              title="Läs på innan du bestämmer dig"
              lead={strings.guides.indexIntro}
            />
            <Link
              href="/guider"
              className="text-[0.9375rem] font-medium text-forest-800 underline decoration-forest-300 underline-offset-4 hover:decoration-forest-600"
            >
              {strings.cta.seeAllGuides}
            </Link>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {latestGuides.map((guide) => (
              <ArticleCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="muted" width="content">
        <SectionHeading eyebrow="Frågor" title={strings.guides.faqTitle} />
        <div className="mt-8">
          <FaqAccordion items={faq} />
        </div>
      </Section>

      <Section>
        <CtaBlock
          formId="kontakt"
          eyebrow="Nästa steg"
          title="Berätta var du är just nu"
          body="Platshållartext: skriv några rader om din situation så säger jag rakt ut om Paraguay är värt att titta vidare på för dig."
          whatsappMessage="Hej Anton! Jag har läst på flyttatillparaguay.se och har några frågor."
        />
      </Section>
    </>
  );
}
