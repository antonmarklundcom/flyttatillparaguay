import Link from "next/link";
import {
  CtaBlock,
  Faq,
  ProcessTimeline,
  Section,
  SectionHeading,
  SplitHero,
  StatRow,
  StickyMobileCta,
} from "@/components/blocks";
import { Card, Disclaimer, JsonLd, ButtonLink } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";
import { packages } from "@/content/packages";
import { strings } from "@/content/strings";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Residency i Paraguay — process, krav och priser",
  description:
    "Steg för steg: dokumenten du behöver från Sverige, tiden på plats, kostnaderna, vad som ingår i varje paket — och vad som inte gör det.",
  path: "/residency",
});

const steps = [
  {
    title: "Samtal",
    description:
      "Ett samtal på 30–45 minuter där vi går igenom din inkomst, familjesituation, eventuellt bolag och tidsplan. Efteråt får du en skriftlig bedömning: realistisk tidslinje, total kostnad och vilket paket som passar.",
  },
  {
    title: "Dokument från Sverige",
    description:
      "Du hämtar underlagen hemma medan jag förbereder här. Personbevis, utdrag ur belastningsregistret, födelsebevis och i förekommande fall vigselbevis — alla apostillerade hos Notarius Publicus och sedan översatta av auktoriserad översättare.",
  },
  {
    title: "Veckan i Asunción",
    description:
      "Du kommer hit i ungefär en vecka. Hälsokontroll, biometri, inlämning hos migrationsmyndigheten och bankärenden ligger bokade i rätt ordning. Jag eller vårt ombud är med i rummet och tolkar.",
  },
  {
    title: "Beslut, cédula och efter",
    description:
      "Beslutet kommer efter handläggning. Då hämtas cédulan, och vi går igenom vad som krävs för att behålla residencyn och för att senare gå vidare till permanent status.",
  },
];

const stats = [
  { value: "3–6 mån", label: "Handläggningstid", note: strings.disclaimers.estimate },
  { value: "≈ 7 dagar", label: "Tid på plats i Paraguay" },
  { value: "18 år", label: "Egen ansökan från" },
  { value: "0", label: "Språkkrav", note: "Inget spanskprov" },
];

const documents = [
  {
    title: "Födelsebevis",
    description:
      "Beställs från Skatteverket, apostilleras och översätts. Får inte vara äldre än vad myndigheten accepterar när det lämnas in — därför hämtar vi det i rätt ordning, inte först.",
  },
  {
    title: "Utdrag ur belastningsregistret",
    description:
      "Polisens utdrag för utlandsändamål. Apostille krävs. Ett rent register är i praktiken ett krav; har du något i ditt, säg det i samtalet så bedömer vi det innan du lägger en krona.",
  },
  {
    title: "Pass med god giltighet",
    description:
      "Räkna med att passet ska gälla väl förbi processen. Är ditt på väg att gå ut förnyar du det före allt annat, eftersom passnumret följer med genom hela ärendet.",
  },
  {
    title: "Underlag för försörjning",
    description:
      "Du ska kunna visa att du klarar dig ekonomiskt: lön, pension, kapital eller inkomst från eget bolag. Formen varierar, och exakt vad som accepteras stämmer vi av innan du beställer något.",
  },
  {
    title: "Vigsel- och familjebevis",
    description:
      "Gäller om partner eller barn ska ansöka. Vigselbevis, barnens födelsebevis och vid behov samtycke från andra vårdnadshavare — samma krav på apostille och översättning.",
  },
  {
    title: "Foton och lokala intyg",
    description:
      "Passfoton enligt paraguayanskt format, hälsokontroll och lokalt bakgrundsutdrag ordnas här på plats under din vecka. Du behöver inte förbereda något av det hemifrån.",
  },
];

const notIncluded = [
  "Myndighetsavgifter i Paraguay — de betalas till myndigheten, jag lägger aldrig påslag på dem.",
  "Apostiller, översättningar och beställningsavgifter i Sverige.",
  "Din resa hit och ditt boende under veckan på plats.",
  "Svensk skatterådgivning och utskrivning ur Sverige — det är en fråga för Skatteverket och din egen rådgivare.",
  "Garanti för beslutet. Beslutet fattas av paraguayansk myndighet, inte av mig. Jag garanterar processen, inte utfallet.",
  "Företagsbildning, RUC-registrering och bokföring utöver den hjälp som anges i paketet.",
];

const risks = [
  {
    title: "Det tar längre tid än du vill",
    description:
      "Handläggningstider varierar med säsong och belastning. Planerar du flytt, jobbslut eller husförsäljning efter ett exakt datum blir du besviken — bygg in marginal.",
  },
  {
    title: "Fel ordning på dokumenten kostar en extra resa",
    description:
      "Det vanligaste dyra misstaget: någon hämtar allt hemma i fel ordning, ett dokument hinner bli för gammalt och ansökan får kompletteras. Då blir det en resa till.",
  },
  {
    title: "Residency är inte samma sak som skattehemvist",
    description:
      "Att ha cédula betyder inte att Sverige släpper dig. Väsentlig anknytning avgörs av svenska regler. Den som blandar ihop de två får en obehaglig överraskning flera år senare.",
  },
  {
    title: "Vardagen är på spanska",
    description:
      "Du klarar processen utan spanska eftersom jag är med. Livet efteråt går betydligt trögare utan. Börja plugga innan du flyttar, inte efter.",
  },
];

const faq = [
  {
    question: "Vad krävs egentligen av mig i Sverige?",
    answer:
      "Att du hämtar rätt dokument i rätt ordning och apostillerar dem. Det är hela din del: födelsebevis, utdrag ur belastningsregistret, giltigt pass, underlag för försörjning och eventuella familjehandlingar. Du får en checklista med exakt vilken myndighet, vilken blankett och i vilken ordning.",
  },
  {
    question: "Vad kostar myndighetsavgifterna?",
    answer:
      "Avgifterna sätts av paraguayanska myndigheter och ändras över tid, så jag lovar aldrig en siffra på en webbsida. Du får en aktuell total i den skriftliga bedömningen efter samtalet, och du betalar dem direkt till myndigheten — jag tar inget påslag. Uppskattning 2026.",
  },
  {
    question: "Vad ingår inte?",
    answer:
      "Myndighetsavgifter, svenska apostiller och översättningar, din resa och ditt boende, samt svensk skatterådgivning. Jag garanterar inte heller själva beslutet — det fattas av paraguayansk myndighet. Hela listan finns i avsnittet ovan.",
  },
  {
    question: "Måste jag flytta hit på riktigt?",
    answer:
      "Nej, men du måste ha verklig anknytning: en adress, besök, en cédula som används. Många av mina kunder pendlar mellan Sverige och Paraguay de första åren. Den som ansöker och sedan aldrig återvänder riskerar däremot att residencyn ifrågasätts.",
  },
  {
    question: "Kan jag ta med hund eller katt?",
    answer:
      "Ja. Det kräver veterinärintyg, mikrochip och vaccinationer enligt paraguayanska regler, och flygbolagens rutiner styr mer än myndigheterna. Det ingår inte i paketen, men jag säger vad du ska göra och när.",
  },
  {
    question: "Får jag jobba i Paraguay med residency?",
    answer:
      "Ja, residency ger dig rätt att arbeta och driva verksamhet här. Med cédula och RUC kan du fakturera lokalt. Vad det innebär skattemässigt för dig beror på var du är skattskyldig — det är en fråga för din rådgivare.",
  },
  {
    question: "Vad händer om ansökan avslås?",
    answer:
      "Det är ovanligt när underlaget är rätt från början, vilket är hela poängen med förarbetet. Vid komplettering hanterar jag den utan extra arvode. Vid avslag går vi igenom orsaken och vad som krävs för en ny ansökan — men avgifter som redan betalats till myndigheten går inte att få tillbaka.",
  },
  {
    question: "Hur betalar jag dig?",
    answer:
      "Faktura, delad i en del vid start och en del när ansökan lämnats in. Du binder dig inte förrän efter samtalet och den skriftliga bedömningen — den kostar dig ingenting.",
  },
];

export default function ResidencyPage() {
  return (
    <>
      <SplitHero
        eyebrow="Huvudtjänsten"
        title="Residency i Paraguay, från första frågan till cédula"
        description="Det här är hela tjänsten, utan reservationer: vad du behöver hämta i Sverige, vad som händer under veckan här, vad det kostar, hur lång tid det tar — och vad jag inte gör åt dig. Läs igenom, boka sedan ett samtal om det låter som din väg."
        bullets={[
          "Dokumentlista anpassad efter svenska myndigheter, i rätt ordning",
          "Jurist och ombud på plats i Asunción, möten bokade innan du landar",
          "Fast pris och en skriftlig bedömning innan du binder dig",
        ]}
        primary={{ href: "#paket", label: "Se paket och priser" }}
        secondary={{ href: "#forfragan", label: "Skicka en förfrågan" }}
      />

      <Section>
        <SectionHeading
          eyebrow="Processen"
          title="Så går det till"
          description="Fyra steg. Det första kostar dig ingenting, och om jag inte tror att Paraguay löser ditt problem säger jag det där i stället för att sälja ett paket."
        />
        <div className="mt-10">
          <ProcessTimeline steps={steps} />
        </div>
        <div className="mt-12">
          <StatRow stats={stats} />
        </div>
        <Disclaimer>{strings.disclaimers.tax}</Disclaimer>
      </Section>

      <Section id="dokument" className="bg-cream-200/60">
        <SectionHeading
          eyebrow="Krav och dokument"
          title="Det du behöver ha med dig"
          description="Kraven ändras över tid och tolkas av handläggaren framför dig. Därför är listan nedan en karta, inte ett kvitto — du får den slutliga, daterade versionen efter samtalet."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-(--color-text-muted)">
          Mer i detalj:{" "}
          <Link href="/guider/residency-krav-och-dokument" className="font-semibold underline">
            krav och dokument
          </Link>{" "}
          och{" "}
          <Link href="/guider/apostille-och-dokument-fran-sverige" className="font-semibold underline">
            apostille från Sverige
          </Link>
          .
        </p>
      </Section>

      <Section id="paket">
        <SectionHeading
          eyebrow="Paket"
          title="Tre sätt att göra det"
          description="Skillnaden mellan paketen är hur mycket du gör själv. Priserna är riktmärken tills de fastställts slutgiltigt — du får alltid en total, inklusive myndighetsavgifter, innan du bestämmer dig."
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
        <p className="mt-8 text-sm text-(--color-text-muted)">
          Priserna anges i euro och faktureras i euro. Myndighetsavgifter betalas i guaraní direkt
          till myndigheten. {strings.disclaimers.estimate}
        </p>
      </Section>

      <Section id="ingar-inte" className="bg-cream-200/60">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Ärligt"
              title="Det här ingår inte"
              description="Jag skriver hellre ut det här än att du upptäcker det efter att fakturan är betald."
            />
            <ul className="mt-8 space-y-3">
              {notIncluded.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent)" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              eyebrow="Risker"
              title="Fyra saker som faktiskt går fel"
              description="Alla fyra går att undvika. Ingen av dem går att undvika genom att låta bli att prata om dem."
            />
            <div className="mt-8 grid gap-4">
              {risks.map((risk) => (
                <Card key={risk.title}>
                  <h3 className="text-base">{risk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                    {risk.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>

      <Section id="forfragan">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Nästa steg"
              title="Skicka en förfrågan"
              description="Berätta kort var du står: familj, inkomst, ungefär när du vill flytta. Jag svarar själv, normalt inom ett dygn, och första samtalet kostar ingenting."
            />
            <p className="mt-6 text-sm text-(--color-text-muted)">
              Är du osäker på om residency är rätt steg? Läs{" "}
              <Link href="/plan-b" className="font-semibold underline">
                varför folk skaffar en Plan B
              </Link>{" "}
              eller{" "}
              <Link href="/livet-i-paraguay" className="font-semibold underline">
                hur vardagen här faktiskt ser ut
              </Link>{" "}
              först.
            </p>
          </div>
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
          description="WhatsApp är snabbaste vägen. Skriv en rad så återkommer jag — och räkna med ett rakt svar, även när det är nej."
          cluster="residency"
        />
      </Section>

      <StickyMobileCta label="Förfrågan" href="#forfragan" />
      <JsonLd data={faqSchema(faq)} />
    </>
  );
}
