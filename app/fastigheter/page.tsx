import Link from "next/link";
import {
  CtaBlock,
  ProcessTimeline,
  Section,
  SectionHeading,
  SplitHero,
  StatRow,
  StickyMobileCta,
} from "@/components/blocks";
import { Card, Disclaimer } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";
import { strings } from "@/content/strings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tomter och hus i Paraguay",
  description:
    "Hur mark- och husköp fungerar för utlänningar i Paraguay, vad det kostar, hur processen ser ut och hur du undviker de dyra fallgroparna.",
  path: "/fastigheter",
});

const stats = [
  { value: "100 %", label: "Utländskt ägande tillåtet", note: "Undantag nära gränsen" },
  { value: "Escritura", label: "Lagfart hos notarie" },
  { value: "1,5 %", label: "Överlåtelseskatt", note: strings.disclaimers.estimate },
  { value: "Alltid", label: "Egen jurist, aldrig säljarens" },
];

const why = [
  {
    title: "Mark du faktiskt har råd med",
    description:
      "Det som gjorde starkast intryck på mig första året var att en vanlig svensk lön räcker till riktig mark här. Inte en handpenning på en bostadsrätt — mark, med lagfart, i eget namn.",
  },
  {
    title: "Utlänningar äger på samma villkor",
    description:
      "Du behöver ingen lokal partner och inget bolagsupplägg för att äga fastighet i eget namn. Undantaget är mark nära landsgränserna, där särskilda regler gäller. Residency krävs inte för att köpa, men gör allt runtomkring enklare.",
  },
  {
    title: "Bygga är billigare än att köpa färdigt",
    description:
      "Arbetskraft och material kostar en bråkdel av svenska priser. De flesta som bygger här får mer hus för pengarna än de trodde — och en betydligt längre tidsplan än de trodde.",
  },
  {
    title: "Men det är inte riskfritt",
    description:
      "Oklara lagfarter, mark som säljs två gånger, mätningar som inte stämmer med papperet. Alla problem jag sett har varit möjliga att upptäcka i förväg — av någon som visste var man tittar.",
  },
];

const steps = [
  {
    title: "Vad du söker",
    description:
      "Tomt, hus eller lantbruk. Område, budget och syfte — eget boende, framtida bygge eller avkastning. Vi går igenom vad som faktiskt finns i den nivån.",
  },
  {
    title: "Urval och besök",
    description:
      "Du får objekt från mitt nätverk och från mina egna listningar. De som ser intressanta ut besöks — helst av dig, annars av mig med film och mätningar.",
  },
  {
    title: "Kontroll före handpenning",
    description:
      "Jurist kontrollerar lagfart, ägarhistorik, servitut, skulder och att gränserna på papperet är gränserna på marken. Det här steget hoppar man aldrig över.",
  },
  {
    title: "Köp och lagfart",
    description:
      "Köpekontrakt och escritura pública upprättas hos notarie, betalning sker enligt kontrakt och lagfarten registreras i ditt namn.",
  },
];

const example = [
  {
    title: "Tomt utanför Asunción",
    description:
      "Ett par i fyrtioårsåldern köpte 1 000 m² i ett växande område en dryg timme från centrum, för ungefär vad en begagnad bil kostar i Sverige. Planen är hus om två år; tills dess står marken och kostar dem nästan ingenting i årliga avgifter.",
  },
  {
    title: "Färdigt hus i San Bernardino",
    description:
      "En ensamstående man ville ha nyckelfärdigt och nära vatten. Vi lade tre veckor på juridisk kontroll av en fastighet som såg perfekt ut, hittade en oklarhet i ägarhistoriken och gick vidare till nästa. Det andra huset gick igenom kontrollen och är hans idag.",
  },
  {
    title: "Lantbruksmark i Itapúa",
    description:
      "Större areal med arrende till en lokal brukare. Avkastningen är blygsam jämfört med vad säljare brukar lova, men stabil — och marken har gått upp mer i värde än arrendet gav.",
  },
];

export default function FastigheterPage() {
  return (
    <>
      <SplitHero
        eyebrow="Fastigheter"
        title="Tomter och hus — utan att gå på minor"
        description="Mark i Paraguay är billig nog att svenskar reagerar med misstro. Det är också där de dyraste misstagen görs. Här är hur köp faktiskt går till som utlänning, vad du ska låta kontrollera innan du betalar en krona, och hur jag hjälper dig hitta rätt."
        bullets={[
          "Utlänningar får äga fastighet i eget namn — residency krävs inte",
          "Juridisk kontroll av lagfart och gränser innan handpenning, alltid",
          "Objekt från mitt nätverk och från mina egna listningar på propia.com.py",
        ]}
        primary={{ href: "#forfragan", label: "Berätta vad du söker" }}
        secondary={{ href: "/guider?cluster=fastigheter", label: "Läs fastighetsguiderna" }}
      />

      <Section>
        <SectionHeading eyebrow="Grunderna" title="Vad du behöver veta först" />
        <div className="mt-10">
          <StatRow stats={stats} />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {why.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
        <Disclaimer>
          Fastighetsköp är juridik, och juridiken sköts av en jurist — inte av mig och inte av
          säljarens ombud. Jag hjälper dig hitta objekt och ser till att kontrollerna görs i rätt
          ordning.
        </Disclaimer>
      </Section>

      <Section className="bg-cream-200/60">
        <SectionHeading
          eyebrow="Processen"
          title="Fyra steg från idé till lagfart"
          description="Det tredje steget är det enda som verkligen skiljer ett tryggt köp från ett dyrt. Det är också det som folk vill hoppa över när de blivit förälskade i en tomt."
        />
        <div className="mt-10">
          <ProcessTimeline steps={steps} />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Exempel"
          title="Tre köp, tre helt olika syften"
          description="Detaljer är avidentifierade, siffrorna avrundade. De är med för att visa spännvidden — inte som löften om vad du hittar."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {example.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-(--color-text-muted)">
          Läs vidare:{" "}
          <Link href="/guider/kopa-tomt-som-utlanning" className="font-semibold underline">
            köpa tomt som utlänning
          </Link>
          ,{" "}
          <Link href="/guider/fallgropar-vid-markkop" className="font-semibold underline">
            fallgropar vid markköp
          </Link>{" "}
          och{" "}
          <Link href="/guider/bygga-hus-kostnad-och-process" className="font-semibold underline">
            bygga hus
          </Link>
          .
        </p>
      </Section>

      <Section id="forfragan" className="bg-cream-200/60">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Förfrågan"
              title="Vad letar du efter?"
              description="Berätta typ, område och ungefärlig budget så matchar jag mot mitt nätverk och mina egna listningar. Har du ingen aning ännu är det också ett svar — då börjar vi där."
            />
            <p className="mt-6 text-sm text-(--color-text-muted)">
              Mina listningar ligger på{" "}
              <a
                href="https://propia.com.py"
                rel="noopener"
                className="font-semibold underline"
              >
                propia.com.py
              </a>
              . Ska du också skaffa residency går det oftast smidigast att göra det parallellt —
              se{" "}
              <Link href="/residency" className="font-semibold underline">
                residencysidan
              </Link>
              .
            </p>
          </div>
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
          description="Skriv på WhatsApp så skickar jag aktuella tomter och hus i din nivå — och säger rakt ut vilka jag själv skulle undvika."
          cluster="fastigheter"
        />
      </Section>

      <StickyMobileCta label="Förfrågan" href="#forfragan" />
    </>
  );
}
