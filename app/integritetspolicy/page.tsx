import Link from "next/link";
import { Section } from "@/components/blocks";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Integritetspolicy",
  description:
    "Hur uppgifterna du lämnar på flyttatillparaguay.se samlas in, används, sparas och raderas — och vilka rättigheter du har enligt GDPR.",
  path: "/integritetspolicy",
});

/** Senast ändrad — uppdatera när policyn faktiskt ändras. */
const updated = "2026-09-07";

export default function IntegritetspolicyPage() {
  return (
    <Section>
      <div className="container-prose prose-editorial">
        <h1 className="text-4xl">Integritetspolicy</h1>
        <p>
          Den här policyn beskriver hur personuppgifter hanteras när du använder
          flyttatillparaguay.se, skickar in ett formulär eller prenumererar på nyhetsbrevet.
          Senast uppdaterad {updated}.
        </p>

        <h2>Personuppgiftsansvarig</h2>
        <p>
          {site.author.name}, {site.email}. Verksamheten drivs från Asunción, Paraguay, och riktar
          sig till besökare i Sverige. Har du frågor om hur dina uppgifter hanteras räcker det att
          mejla adressen ovan.
        </p>

        <h2>Vilka uppgifter samlas in</h2>
        <p>
          <strong>Uppgifter du själv lämnar.</strong> När du fyller i ett formulär samlas namn,
          telefonnummer, e-postadress och det du skriver i meddelandefältet in. På vissa formulär
          tillkommer uppgifter du väljer själv, till exempel vilket paket du är intresserad av,
          ungefärlig budget eller önskat område.
        </p>
        <p>
          <strong>Teknisk information om ditt besök.</strong> Vilken sida du fyllde i formuläret på,
          varifrån du kom till sajten och eventuella kampanjparametrar i länken (så kallade
          UTM-parametrar samt <code>gclid</code> och <code>fbclid</code>). Dessa sparas i en cookie
          i din webbläsare och följer med när du skickar in ett formulär, så att jag kan se vilken
          kanal en förfrågan kom från.
        </p>
        <p>
          <strong>Uppgifter jag inte samlar in.</strong> Sajten har ingen inloggning, ingen
          betalning och ingen profilering. Inga känsliga personuppgifter efterfrågas — lämna aldrig
          uppgifter om hälsa, etnicitet eller politisk uppfattning i formulärfälten.
        </p>

        <h2>Varför uppgifterna behandlas och med vilken rättslig grund</h2>
        <ul>
          <li>
            <strong>För att besvara din förfrågan och leverera tjänsten.</strong> Rättslig grund:
            fullgörande av avtal eller åtgärder inför avtal.
          </li>
          <li>
            <strong>För att skicka nyhetsbrevet</strong> när du själv anmält dig. Rättslig grund:
            samtycke, som du kan återkalla när som helst.
          </li>
          <li>
            <strong>För att förstå vilka kanaler som ger förfrågningar.</strong> Rättslig grund:
            berättigat intresse av att kunna driva och utvärdera verksamheten.
          </li>
          <li>
            <strong>För bokföring och att kunna styrka avtal.</strong> Rättslig grund: rättslig
            förpliktelse.
          </li>
        </ul>

        <h2>Vem får ta del av uppgifterna</h2>
        <p>
          Uppgifterna lagras i mitt kundhanteringssystem (VenderCRM) och behandlas av mig. Blir du
          kund delas de uppgifter som krävs för ditt ärende med den lokala jurist och det ombud som
          företräder dig i Paraguay, samt med paraguayanska myndigheter i den utsträckning ansökan
          kräver det. Uppgifter säljs aldrig vidare och används aldrig för tredjeparts
          marknadsföring.
        </p>
        <p>
          Eftersom verksamheten drivs från Paraguay behandlas uppgifter utanför EU/EES. Paraguay
          omfattas inte av ett beslut om adekvat skyddsnivå, och överföringen sker därför med stöd
          av att den är nödvändig för att fullgöra avtalet med dig eller för åtgärder inför ett
          sådant avtal. Vill du inte att dina uppgifter behandlas utanför EU kan tjänsten inte
          levereras.
        </p>

        <h2>Hur länge uppgifterna sparas</h2>
        <ul>
          <li>Förfrågningar som inte leder till uppdrag: som längst 24 månader, sedan raderas de.</li>
          <li>Kundärenden: under uppdraget och därefter så länge bokföringslagen kräver.</li>
          <li>Nyhetsbrevet: tills du avanmäler dig, vilket du kan göra i varje utskick.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Sajten sätter en cookie för att komma ihåg varifrån du först kom hit
          (<code>vc_attr</code>, som längst 90 dagar). Den innehåller ingen information om vem du är
          och används inte för annonsering. Nödvändiga tekniska cookies kan förekomma för att sidan
          ska fungera. Du kan blockera och radera cookies i din webbläsare; sajten fungerar ändå.
        </p>

        <h2>Dina rättigheter</h2>
        <p>
          Du har rätt att begära ett utdrag över de uppgifter jag har om dig, att få felaktiga
          uppgifter rättade, att få uppgifter raderade, att invända mot behandling som sker med stöd
          av berättigat intresse, att begära begränsning av behandlingen och att få ut dina
          uppgifter i ett maskinläsbart format. Mejla {site.email} så hanterar jag det, normalt inom
          en månad.
        </p>
        <p>
          Är du inte nöjd med hur dina uppgifter hanteras har du rätt att klaga till
          Integritetsskyddsmyndigheten (IMY) i Sverige.
        </p>

        <h2>Ändringar i policyn</h2>
        <p>
          Ändras behandlingen uppdateras den här sidan och datumet högst upp. Vid väsentliga
          ändringar som rör dig som kund informeras du direkt.
        </p>

        <p>
          Se även{" "}
          <Link href="/villkor">villkoren</Link> för vad tjänsten omfattar och inte omfattar.
        </p>
      </div>
    </Section>
  );
}
