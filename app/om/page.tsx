import Link from "next/link";
import { CtaBlock, ImageSlot, Section, SectionHeading, StatRow } from "@/components/blocks";
import { Card } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Om Anton",
  description:
    "34-årig svensk som flyttade till Paraguay, gick genom hela residencyprocessen själv och hjälper nu andra att göra samma sak — utan att sälja in ett paradis.",
  path: "/om",
});

const principles = [
  {
    title: "Jag säljer inte in ett paradis",
    description:
      "Paraguay är inte lösningen på allt. Byråkratin är långsam, sjukvården är ojämn utanför storstäderna och en del av det du saknar från Sverige kommer du fortsätta sakna. Den som vill höra motsatsen får leta någon annanstans.",
  },
  {
    title: "Jag tar bara det jag klarar",
    description:
      "Jag hjälper ett begränsat antal personer åt gången, eftersom jag följer varje ärende själv. Är kalendern full säger jag det i stället för att lämna dig i ett kösystem.",
  },
  {
    title: "Fast pris, inga påslag",
    description:
      "Du får en total innan vi börjar. Myndighetsavgifter betalas direkt till myndigheten och jag lägger aldrig marginal på dem. Blir något dyrare än beräknat får du veta det samma dag jag får veta det.",
  },
  {
    title: "Jag är inte jurist",
    description:
      "Jag är svensken som gjort resan och som kan processen. Det juridiska sköts av vår lokala jurist i Asunción. Skatterådgivning ger jag inte alls — den frågan tillhör din rådgivare och Skatteverket.",
  },
];

const stats = [
  { value: "2022", label: "Första resan hit" },
  { value: "34 år", label: "Ålder idag" },
  { value: "Asunción", label: "Bor här" },
  { value: "Svenska", label: "Hela vägen" },
];

export default function OmPage() {
  return (
    <>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Om mig"
              title="Jag gjorde det själv först — med alla misstag som hörde till"
              description="Jag heter Anton Marklund, är 34 år och bor i Asunción. Det här är hela historien: varför jag åkte, varför jag blev kvar och varför jag numera hjälper andra svenskar genom exakt samma process."
            />
          </div>
          <div className="relative aspect-4/5 overflow-hidden rounded-(--radius-xl) border border-(--color-line)">
            <ImageSlot label="Porträtt Anton — riktigt foto, plan §7" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-prose prose-editorial">
          <h2>Hur jag hamnade i Paraguay</h2>
          <p>
            Jag kom hit första gången utan någon plan alls. Jag hade läst mig till namnet i en tråd
            om länder där man fortfarande kan äga mark utan att ha ärvt den, och tänkte att jag
            skulle stanna några veckor. Det jag hittade var inte det tropiska vykortet — det var
            röd jord, långa varma eftermiddagar, folk som satt utanför sina hus när solen gick ner
            och priser som fick mig att räkna om två gånger.
          </p>
          <p>
            Det som fick mig att stanna var inte kostnadsläget. Det var att jag för första gången
            på flera år kände att jag hade tid. I Sverige hade allt jag ville göra ett steg före
            sig: ett tillstånd, en kö, en kalkyl som ändå inte gick ihop. Här kunde jag bestämma
            något på måndagen och ha börjat på onsdagen.
          </p>

          <h2>Residencyn — den långsamma vägen</h2>
          <p>
            Jag gjorde min egen residency på det dummaste sättet som finns: på egen hand, utan att
            kunna spanska, med dokument hämtade i fel ordning. Jag beställde papper hemma i Sverige
            månader innan de skulle användas, apostillerade fel handling, missade att en översättning
            måste vara gjord av auktoriserad översättare och stod till slut i fel kö på fel våning
            med en handläggare som mycket vänligt förklarade att jag fick komma tillbaka.
          </p>
          <p>
            Det kostade mig en extra resa och ungefär fyra månader. Det gav mig också, i efterhand,
            hela affärsidén. För allt jag gjorde fel gick att undvika med en lista och någon som
            varit i rummet förut.
          </p>

          <h2>Flickvännen, familjen och att bli kvar på riktigt</h2>
          <p>
            Ungefär samtidigt träffade jag min flickvän. Hon är paraguayanska, född och uppvuxen
            här, och det är genom henne jag har lärt mig det som inte står i någon guide: hur man
            faktiskt pratar med en myndighetsperson, varför söndagens asado inte är ett kalas utan
            en institution, och att familj här betyder ungefär trettio personer och inte fyra.
          </p>
          <p>
            Det är också hon som gjort att jag slutade se det här som ett projekt och började se det
            som ett liv. Jag är inte en digital nomad som råkar vara i Paraguay. Jag bor här, betalar
            hyra här, står i samma köer som alla andra.
          </p>

          <h2>Varför jag hjälper andra</h2>
          <p>
            Efter att jag skrivit ner min egen process började folk höra av sig. Först några
            svenskar som läst en kommentar jag lämnat i ett forum, sedan deras vänner. Ganska snabbt
            insåg jag två saker: att informationen på svenska var i princip obefintlig, och att den
            engelskspråkiga informationen ofta såldes av personer som aldrig satt sin fot i landet.
          </p>
          <p>
            Så jag byggde det jag själv hade velat köpa: en tjänst där någon som bor här tar
            svenskarnas process från första frågan till cédulan i handen, med en jurist på plats och
            allting på svenska. Och en sajt full av det jag hade velat läsa innan jag åkte — även de
            delar som inte är säljande.
          </p>

          <h2>Vad jag inte är</h2>
          <p>
            Jag är inte jurist, inte skatterådgivare och inte mäklare. Det juridiska hanteras av vår
            lokala jurist, skattefrågor hör hemma hos din rådgivare och Skatteverket, och när det
            gäller mark och hus förmedlar jag kontakter och egna listningar snarare än att spela
            expert på något jag inte är. Jag är svensken som gjort resan, bor kvar och vet i vilken
            ordning sakerna ska göras.
          </p>
        </div>
      </Section>

      <Section className="bg-cream-200/60">
        <StatRow stats={stats} />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Så jobbar jag"
          title="Fyra principer jag inte tummar på"
          description="De är delvis skrivna av misstag jag själv gjort, och delvis av hur jag hade velat bli bemött när jag stod där utan aning."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {principles.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-(--color-text-muted)">
          Vill du se hur jag skriver om det praktiska? Börja med{" "}
          <Link href="/guider" className="font-semibold underline">
            guiderna
          </Link>{" "}
          eller gå direkt till{" "}
          <Link href="/residency" className="font-semibold underline">
            residencyprocessen
          </Link>
          .
        </p>
      </Section>

      <Section>
        <CtaBlock
          title="Vill du prata med mig direkt?"
          description="Jag tar samtalen själv — inget callcenter, ingen säljare, inget uppföljningsmejl var tredje dag. Skriv en rad så hörs vi."
        />
      </Section>
    </>
  );
}
