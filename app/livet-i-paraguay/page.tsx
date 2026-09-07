import Link from "next/link";
import { ArticleCard, CtaBlock, Section, SectionHeading, SplitHero, BentoGrid } from "@/components/blocks";
import { Card } from "@/components/ui";
import { getCities, getGuidesByCluster } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Livet i Paraguay",
  description:
    "Levnadskostnader, säkerhet, klimat, mat, sjukvård och vardag — så är det att faktiskt bo i Paraguay som svensk, skrivet av någon som gör det.",
  path: "/livet-i-paraguay",
});

const themes = [
  {
    stat: "≈ 40 %",
    title: "Levnadskostnader",
    description:
      "Hyra, mat, transport, tandläkare och hushållshjälp ligger långt under svenska nivåer. Importerad elektronik och bilar gör inte det. Din faktiska besparing beror helt på hur svenskt du väljer att leva.",
    wide: true,
  },
  {
    title: "Säkerhet, ärligt",
    description:
      "Asunción är lugnare än sitt rykte och otryggare än Sverige. Man vänjer sig vid grindar, man visar inte upp värdesaker och man väljer område med omsorg. Sedan lever man helt normalt.",
  },
  {
    title: "Mat och kött",
    description:
      "Asado är inte en måltid utan en söndag. Köttet är bättre och billigare än hemma, grönsakerna kommer från gårdar en timme bort och ingen tycker att det är märkvärdigt.",
  },
  {
    title: "Sjukvård",
    description:
      "Privat vård i Asunción är snabb, billig och håller god standard. Privat försäkring kostar en bråkdel av vad man tror. Utanför storstäderna blir bilden ojämnare — det ska man planera för.",
  },
  {
    title: "Relationer och familjeliv",
    description:
      "Min flickvän är paraguayanska, och det har format hela min bild av landet. Familjen är stor, sammanhållningen självklar och tempot ett annat. Mer om det — utan klichéer — i livsstilsguiderna.",
    wide: true,
  },
];

const rhythm = [
  {
    title: "Dagen börjar tidigt",
    description:
      "Klockan sju är staden vaken och luften fortfarande sval. Mellan tolv och tre gör man inte mer än nödvändigt när sommaren står som högst — och sedan lever kvällen länge.",
  },
  {
    title: "Spanska räcker, guaraní öppnar",
    description:
      "Allt praktiskt fungerar på spanska. Men de flesta växlar mellan spanska och guaraní, och de orden du lär dig på guaraní ger dig fler leenden än något annat du kan göra.",
  },
  {
    title: "Byråkrati tar tid, folk har tålamod",
    description:
      "Saker tar längre tid än i Sverige, och ingen blir upprörd över det. Det är den kulturskillnad som frustrerar nyanlända mest — och den som de flesta tycker bäst om efter ett år.",
  },
];

export default function LivetPage() {
  const cities = getCities();
  const guides = getGuidesByCluster("livsstil").slice(0, 3);

  return (
    <>
      <SplitHero
        eyebrow="Livsstilshubb"
        title="Livet i Paraguay, som det faktiskt ser ut"
        description="Det här är inte vykortsversionen. Det är vad en månad kostar, hur säkerheten känns i praktiken, hur sjukvården fungerar när du blir sjuk på riktigt, och vad som är svårt — plus allt det som gjorde att jag blev kvar."
        bullets={[
          "Riktiga kostnadsnivåer i stället för avrundade drömsiffror",
          "Säkerhet, sjukvård och byråkrati utan skönmålning",
          "Fem orter med helt olika liv — välj rätt från början",
        ]}
        primary={{ href: "/guider?cluster=livsstil", label: "Alla livsstilsguider" }}
        secondary={{ href: "/kontakt", label: "Fråga mig något" }}
      />

      <Section>
        <SectionHeading
          eyebrow="Teman"
          title="Det folk faktiskt frågar om"
          description="Nästan ingen frågar om sevärdheter. Nästan alla frågar om kostnader, säkerhet, sjukvård och hur man får en vardag att fungera."
        />
        <div className="mt-10">
          <BentoGrid items={themes} />
        </div>
      </Section>

      <Section className="bg-cream-200/60">
        <SectionHeading
          eyebrow="Vardagen"
          title="Tre saker som förvånar de flesta svenskar"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {rhythm.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Orter"
          title="Var man bor"
          description="Fem orter, fem helt olika liv. Valet mellan dem påverkar din vardag mer än nästan något annat beslut du fattar."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Card key={city.slug}>
              <h3 className="text-lg">
                <Link href={`/livet-i-paraguay/${city.slug}`}>{city.frontmatter.title}</Link>
              </h3>
              {city.frontmatter.region ? (
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">
                  {city.frontmatter.region}
                </p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                {city.frontmatter.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {guides.length > 0 ? (
        <Section className="bg-cream-200/60">
          <SectionHeading eyebrow="Guider" title="Läs vidare" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {guides.map((guide) => (
              <ArticleCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <CtaBlock
          title="Undrar du något om vardagen här?"
          description="Fråga rakt ut — jag svarar hellre på det konkreta än det allmänna. Och funderar du på residency finns hela processen på residencysidan."
          cluster="livsstil"
        />
      </Section>
    </>
  );
}
