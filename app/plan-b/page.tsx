import Link from "next/link";
import { ArticleCard, CtaBlock, Section, SectionHeading, SplitHero } from "@/components/blocks";
import { Card, Disclaimer } from "@/components/ui";
import { getGuidesByCluster } from "@/lib/content";
import { strings } from "@/content/strings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plan B — residency som valfrihet",
  description:
    "Varför fler svenskar skaffar ett andra hem, hur Paraguay står sig mot Panama, Portugal och Dubai, och vad en Plan B faktiskt löser — och inte löser.",
  path: "/plan-b",
});

const reasons = [
  {
    title: "Fler dörrar, inte färre",
    description:
      "En andra residency är ett tillägg, inte ett avsked. Du behåller allt du har i Sverige och lägger till möjligheten att bo, jobba och äga någon annanstans. Det är samma logik som att lära sig ett språk till.",
  },
  {
    title: "Något att bygga på",
    description:
      "De flesta jag hjälper har ett konkret projekt: ett hus på egen mark, ett bolag med lägre fasta kostnader, eller helt enkelt fler vintrar i värme. Plan B blir intressant först när den innehåller något du faktiskt vill göra.",
  },
  {
    title: "Bättre beslut när du har val",
    description:
      "Det märkligaste med att skaffa residency var att det gjorde mig lugnare i Sverige, inte argare. När du inte känner dig fast slutar små saker att kännas som stora.",
  },
  {
    title: "Tid, inte panik",
    description:
      "Residency, bankkonto och kontakter tar månader att bygga och minuter att önska att man hade. Det är därför det är ett projekt man gör i lugn och ro, långt innan man tror sig behöva det.",
  },
];

type Row = {
  land: string;
  vag: string;
  skatt: string;
  tid: string;
  kostnad: string;
  passar: string;
};

const comparison: Row[] = [
  {
    land: "Paraguay",
    vag: "Tillfällig residency i två år, sedan permanent. Ingen investering krävs, försörjning ska visas.",
    skatt: "Territoriell beskattning, 10 % inkomstskatt på inhemsk inkomst.",
    tid: "≈ 1 vecka på plats, 3–6 mån handläggning.",
    kostnad: "Lägst av de fyra, både i avgifter och i levnadskostnad.",
    passar: "Dig som vill ha låg tröskel, låg kostnad och möjlighet att äga mark.",
  },
  {
    land: "Panama",
    vag: "Flera program, ofta via bolag, anställning eller insättning.",
    skatt: "Territoriell beskattning, men fler formella krav på struktur.",
    tid: "Kort tid på plats, men mer pappersarbete och högre krav på ombud.",
    kostnad: "Klart högre arvoden och levnadskostnad, särskilt i Panama City.",
    passar: "Dig som redan har bolagsstruktur och prioriterar finansiell infrastruktur.",
  },
  {
    land: "Portugal",
    vag: "EU-land, uppehållsvägar för icke-EU-medborgare; som svensk har du redan fri rörlighet.",
    skatt: "Vanlig europeisk beskattning, tidigare specialregimer har stramats åt.",
    tid: "Enkelt att flytta som EU-medborgare, ingen residencyprocess i samma mening.",
    kostnad: "Betydligt högre boendekostnad, särskilt i Lissabon och Porto.",
    passar: "Dig som vill vara kvar inom EU och prioriterar närhet till Sverige.",
  },
  {
    land: "Dubai",
    vag: "Uppehållstillstånd via företag, anställning eller fastighetsinvestering.",
    skatt: "Ingen personlig inkomstskatt, men bolagsskatt sedan några år.",
    tid: "Snabb process, men tillståndet hänger på att strukturen underhålls.",
    kostnad: "Hög — både bolagskostnad och levnadsstandard är dyra.",
    passar: "Dig med hög rörlig inkomst som vill ha snabbhet och accepterar kostnaden.",
  },
];

const myths = [
  {
    title: "”Residency gör mig skattefri.”",
    description:
      "Nej. Din svenska skattskyldighet avgörs av väsentlig anknytning till Sverige — bostad, familj, verksamhet — inte av vilket id-kort du har. Många behåller full svensk skattskyldighet och skaffar residency ändå, för helt andra skäl.",
  },
  {
    title: "”Jag måste flytta för att det ska vara värt det.”",
    description:
      "Nej. Ett stort antal av dem jag hjälper pendlar de första åren: några månader här, resten hemma. Kravet är verklig anknytning till Paraguay, inte att du bränner broarna hemma.",
  },
  {
    title: "”En Plan B löser mina problem.”",
    description:
      "Den flyttar dem. Är du rastlös i Sverige blir du rastlös här, bara med varmare kvällar. Plan B är ett verktyg för den som redan vet vad hen vill använda det till.",
  },
];

export default function PlanBPage() {
  const guides = getGuidesByCluster("planb").slice(0, 3);

  return (
    <>
      <SplitHero
        eyebrow="Frihetshubb"
        title="En Plan B är inte flykt. Det är valfrihet."
        description="Jag träffar sällan någon som vill fly från Sverige. Jag träffar hela tiden folk som vill ha fler alternativ: mark de har råd med, ett andra hem i värmen, lägre fasta kostnader, en väg som är öppen även om planerna ändras. Det är vad en andra residency handlar om."
        bullets={[
          "Ett tillägg till ditt liv i Sverige, inte ett avsked",
          "Byggs i lugn och ro — månader, inte panikveckor",
          "Konkret: cédula, bankkonto, adress och mark du kan äga",
        ]}
        primary={{ href: "/residency", label: "Så fungerar residencyn" }}
        secondary={{ href: "/kontakt", label: "Prata med mig" }}
      />

      <Section>
        <SectionHeading
          eyebrow="Varför"
          title="Fyra skäl som håller i vardagen"
          description="Ingen av dem handlar om undergång. De handlar om att ha fler dörrar öppna än man behöver just idag."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reasons.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-cream-200/60">
        <SectionHeading
          eyebrow="Jämförelse"
          title="Paraguay mot alternativen"
          description="Jag jobbar med Paraguay, så läs tabellen med den vetskapen. Den är ändå ärlig: för en del av er är Portugal eller Dubai ett bättre val, och då säger jag det."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Jämförelse av residencyalternativ: Paraguay, Panama, Portugal och Dubai.
            </caption>
            <thead>
              <tr className="border-b border-(--color-line)">
                <th scope="col" className="py-3 pr-4 font-semibold">Land</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Väg in</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Skattelogik</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Tid</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Kostnadsnivå</th>
                <th scope="col" className="py-3 font-semibold">Passar</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.land} className="border-b border-(--color-line) align-top">
                  <th scope="row" className="py-4 pr-4 font-(family-name:--font-display) text-base text-(--color-brand)">
                    {row.land}
                  </th>
                  <td className="py-4 pr-4 text-(--color-text-muted)">{row.vag}</td>
                  <td className="py-4 pr-4 text-(--color-text-muted)">{row.skatt}</td>
                  <td className="py-4 pr-4 text-(--color-text-muted)">{row.tid}</td>
                  <td className="py-4 pr-4 text-(--color-text-muted)">{row.kostnad}</td>
                  <td className="py-4 text-(--color-text-muted)">{row.passar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-(--color-text-muted)">{strings.disclaimers.estimate}</p>
        <Disclaimer>{strings.disclaimers.tax}</Disclaimer>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Rätt förväntningar"
          title="Tre saker folk tror som inte stämmer"
          description="Den vanligaste anledningen till att en Plan B blir en besvikelse är att den fick fel jobb från början."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {myths.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-(--color-text-muted)">
          Fördjupning:{" "}
          <Link href="/guider/vad-du-inte-flyr-ifran" className="font-semibold underline">
            vad du inte flyr ifrån
          </Link>{" "}
          och{" "}
          <Link href="/guider/dubbelt-boende-sverige-paraguay" className="font-semibold underline">
            dubbelt boende Sverige–Paraguay
          </Link>
          .
        </p>
      </Section>

      {guides.length > 0 ? (
        <Section className="bg-cream-200/60">
          <SectionHeading eyebrow="Guider" title="Fördjupning" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {guides.map((guide) => (
              <ArticleCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <CtaBlock
          title="Vill du veta om det passar dig?"
          description="Ett kort samtal räcker för att avgöra om det här är rätt väg — eller om du ska lägga pengarna på något annat."
          cluster="planb"
        />
      </Section>
    </>
  );
}
