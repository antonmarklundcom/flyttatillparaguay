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
 * Startsidan: löfte → varför Paraguay → process → paket → Anton → guider → FAQ → CTA.
 * All copy skriven i fas opus-2 (plan §5.2). Bildslottar fylls i sonnet-4.
 */

const whyParaguay = [
  {
    stat: "10 %",
    title: "En skattemodell du förstår på en eftermiddag",
    description:
      "10 % bolagsskatt, 10 % inkomstskatt, 10 % moms — och beskattning bara på det du tjänar inne i landet. Det är inte en lucka någon hittat, det är hela systemet. Att däremot bli utskriven ur Sverige är en egen fråga, och den avgör Skatteverket.",
    wide: true,
  },
  {
    stat: "≈ 40 %",
    title: "Lägre kostnadsläge",
    description:
      "Hyra, mat, bil, tandläkare, hushållshjälp. Min egen månadsbudget här ligger runt 40 procent under vad samma liv kostade mig i Sverige — och jag lever bättre, inte sämre.",
  },
  {
    title: "Residency som faktiskt håller",
    description:
      "Du börjar med tvåårig residency, går sedan vidare till permanent. Cédulan är ett riktigt id-kort: bankkonto, bilköp, hyreskontrakt, sjukvård. Inget som måste förnyas var nittonde dag.",
  },
  {
    title: "Klimat, natur och plats",
    description:
      "Subtropiskt. Långa varma somrar, milda vintrar, gröna slätter och röd jord. Tomtpriserna är fortfarande på en nivå där en vanlig svensk kan äga mark på riktigt.",
  },
  {
    title: "Närmare Sverige än du tror",
    description:
      "En flygdag hemåt via Madrid eller São Paulo. De flesta jag hjälper är hemma två gånger om året och tycker att avståndet är mindre i praktiken än det ser ut på kartan.",
    wide: true,
  },
];

const steps = [
  {
    title: "Samtal",
    description:
      "Vi går igenom din faktiska situation: inkomst, familj, bolag, hur mycket tid du kan lägga. Passar Paraguay inte dig säger jag det direkt.",
  },
  {
    title: "Dokument",
    description:
      "Du hämtar underlagen i Sverige. Jag ger listan, ordningen och exakt hur apostille och auktoriserad översättning ska se ut för att inte bli underkända.",
  },
  {
    title: "Veckan här",
    description:
      "Du kommer hit. Möten hos migrationsmyndigheten, biometri, hälsokontroll och bank ligger bokade — du behöver inte lista ut något själv.",
  },
  {
    title: "Cédula",
    description:
      "Residencyn beviljas och du får ditt paraguayanska id-kort. Sedan går vi igenom vad som gäller för att behålla den och för steget till permanent.",
  },
];

const stats = [
  { value: "10 %", label: "Inkomstskatt i Paraguay", note: strings.disclaimers.estimate },
  { value: "≈ 7 dagar", label: "Tid du behöver vara här", note: "Första resan" },
  { value: "2 år", label: "Tillfällig innan permanent", note: strings.disclaimers.estimate },
  { value: "0", label: "Språkkrav", note: "Inget spanskprov" },
];

const faq = [
  {
    question: "Måste jag bo i Paraguay för att behålla min residency?",
    answer:
      "Nej, du behöver inte bo här på heltid, men du kan inte försvinna helt heller. Myndigheten vill se att du har verklig anknytning till landet — att du kommer hit, har en adress och använder din cédula. Räkna med minst ett besök om året, och var noga om du planerar långa perioder utomlands. Exakta krav skiljer sig mellan tillfällig och permanent residency, och vi går igenom din plan i samtalet.",
  },
  {
    question: "Hur lång tid tar hela processen?",
    answer:
      "Från att dina svenska dokument är apostillerade till att du har cédulan i handen brukar det ta tre till sex månader, varav ungefär en vecka på plats i Paraguay. Handläggningstiderna varierar och det som oftast försenar är dokument som hämtats i fel ordning i Sverige. Uppskattning 2026.",
  },
  {
    question: "Kan min familj följa med?",
    answer:
      "Ja. Partner och barn under 18 ansöker parallellt med dig och behöver egna dokument — vigselbevis, födelsebevis och samtycken, alla apostillerade. Familjepaketet är byggt för exakt det, så att ni går genom myndigheterna samma vecka i stället för tre gånger om.",
  },
  {
    question: "Betyder paraguayansk residency att jag slipper svensk skatt?",
    answer:
      "Nej, inte automatiskt. Ett id-kort i en annan plånbok ändrar ingenting i sig — det är väsentlig anknytning till Sverige som avgör, och den prövas av Skatteverket. Många kombinerar residency med en verklig flytt, andra behåller full svensk skattskyldighet och skaffar residencyn av helt andra skäl. Jag hjälper dig med processen i Paraguay, inte med din svenska deklaration.",
  },
  {
    question: "Vad kostar det, allt inräknat?",
    answer:
      "Mitt arvode ser du på residencysidan. Utöver det tillkommer myndighetsavgifter, apostiller och översättningar i Sverige, samt din resa och ditt boende under veckan här. Jag lägger aldrig påslag på tredjepartskostnader och du får en total innan vi startar.",
  },
  {
    question: "Varför skulle jag anlita dig i stället för att göra det själv?",
    answer:
      "Du kan absolut göra det själv — Start-paketet finns just för det. Det du betalar för i de större paketen är att någon som gjort resan bokar rätt möten i rätt ordning, pratar spanska i rummet och vet vilket papper som stoppar allt om det saknas. De flesta som försöker helt på egen hand får åka hit två gånger.",
  },
];

export default function HomePage() {
  const latest = getGuides().slice(0, 3);

  return (
    <>
      <SplitHero
        eyebrow="För svenskar som menar allvar"
        title="Residency i Paraguay — hela vägen, på svenska"
        description="Jag heter Anton, är 34 år och flyttade hit från Sverige. Jag gick genom hela residencyprocessen själv, med alla misstag som hör till. Nu tar jag andra svenskar genom samma process — dokumenten hemma, myndigheterna här, banken och veckan på plats."
        bullets={[
          "Hela processen på svenska, med ombud och jurist på plats i Asunción",
          "Fast pris innan vi börjar — inga timdebiteringar, inga påslag på avgifter",
          "Du behöver vara här ungefär en vecka; resten sköts härifrån",
        ]}
        primary={{ href: "/residency", label: "Så går det till" }}
        secondary={{ href: "/kontakt", label: "Boka ett samtal" }}
      />

      <Section>
        <SectionHeading
          eyebrow="Varför Paraguay"
          title="Fem skäl som fortfarande håller när nyhetsglansen gått av"
          description="Jag har bott här tillräckligt länge för att sluta sälja vykort. Det här är det som faktiskt gör skillnad i vardagen — och längre ner säger jag också vad som inte gör det."
        />
        <div className="mt-10">
          <BentoGrid items={whyParaguay} />
        </div>
      </Section>

      <Section className="bg-cream-200/60">
        <SectionHeading
          eyebrow="Processen"
          title="Fyra steg från första frågan till cédula"
          description="Ingen del av det här är svår i sig. Det som gör folk galna är ordningen: vilket papper som måste hämtas före vilket, och vad som hinner bli för gammalt under tiden."
        />
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
          description="Tre nivåer, samma mål. Priserna nedan är riktmärken tills de fastställts slutgiltigt — du får alltid en total, inklusive myndighetsavgifter, innan något startar."
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
              <ButtonLink href="/residency#paket" variant="ghost" className="mt-6 w-full">
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
              description="Jag kom hit första gången utan plan, blev kvar, träffade min flickvän och skaffade residency på det långsamma sättet — genom att göra fel först. Allt jag lärde mig av det sitter nu i checklistorna mina kunder får."
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
            <SectionHeading
              eyebrow="Guider"
              title="Läs på innan du bestämmer dig"
              description="Jag skriver ner allt jag hade velat veta innan flytten. Kostnader, dokument, säkerhet, vardag — utan säljvinkel."
            />
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
          <Faq items={faq} title="Frågorna jag får varje vecka" />
        </div>
      </Section>

      <Section>
        <CtaBlock
          title="Berätta var du står idag"
          description="Skriv en rad på WhatsApp eller fyll i formuläret. Jag läser allt själv och svarar normalt inom ett dygn — även när svaret är att du borde vänta."
        />
      </Section>

      <JsonLd data={faqSchema(faq)} />
    </>
  );
}
