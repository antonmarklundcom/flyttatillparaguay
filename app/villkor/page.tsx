import Link from "next/link";
import { Section } from "@/components/blocks";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Villkor",
  description:
    "Villkor för tjänsterna som säljs via flyttatillparaguay.se: vad som ingår, vad som inte ingår, betalning, ångerrätt och ansvarsbegränsning.",
  path: "/villkor",
});

/** Senast ändrad — uppdatera när villkoren faktiskt ändras. */
const updated = "2026-09-07";

export default function VillkorPage() {
  return (
    <Section>
      <div className="container-prose prose-editorial">
        <h1 className="text-4xl">Villkor</h1>
        <p>
          Villkoren gäller mellan dig som kund och {site.author.name} när du köper vägledning och
          praktisk hjälp genom residencyprocessen i Paraguay eller annan tjänst som säljs via
          flyttatillparaguay.se. Senast uppdaterad {updated}.
        </p>

        <h2>1. Tjänsten</h2>
        <p>
          Tjänsten består av rådgivning om processen, en anpassad dokumentlista, samordning med
          lokalt ombud och jurist i Paraguay, bokning av myndighetsbesök samt löpande support på
          svenska. Exakt omfattning framgår av det paket du valt och av den skriftliga bedömning du
          får efter det inledande samtalet. Bedömningen gäller före allmänna beskrivningar på sajten.
        </p>

        <h2>2. Vad tjänsten inte omfattar</h2>
        <ul>
          <li>Myndighetsavgifter i Paraguay. De betalas av dig direkt till myndigheten, utan påslag.</li>
          <li>Apostiller, översättningar och beställningsavgifter i Sverige.</li>
          <li>Resa, boende och uppehälle under din tid i Paraguay.</li>
          <li>
            Juridisk rådgivning i egen regi. Det juridiska utförs av anlitad jurist i Paraguay, som
            ansvarar för sitt eget arbete.
          </li>
          <li>
            Skatterådgivning, deklaration eller bedömning av din skattskyldighet i Sverige. Innehåll
            om skatt på sajten är allmän information, inte rådgivning.
          </li>
          <li>Garanti för myndighetsbeslut, handläggningstid eller framtida regeländringar.</li>
        </ul>

        <h2>3. Ditt ansvar</h2>
        <p>
          Du ansvarar för att lämna korrekta uppgifter, att hämta och apostillera dina dokument
          inom överenskommen tid och att närvara vid bokade möten. Uppgifter som visar sig felaktiga
          eller dokument som saknas kan medföra försening, omprövning eller extra resa, och sådana
          kostnader bärs av dig. Du ansvarar också för att ditt pass är giltigt genom hela processen.
        </p>

        <h2>4. Priser och betalning</h2>
        <p>
          Priser anges i euro. Betalning sker mot faktura, normalt delad i en del vid uppstart och en
          del när ansökan lämnas in, om inget annat avtalats. Priser på sajten är riktmärken tills du
          fått en skriftlig offert; det är offerten som gäller. Tredjepartskostnader vidarefaktureras
          utan påslag eller betalas av dig direkt.
        </p>

        <h2>5. Avbokning och ångerrätt</h2>
        <p>
          Som konsument har du normalt 14 dagars ångerrätt från det att avtalet ingicks. Begär du att
          arbetet påbörjas inom ångerfristen och tjänsten därefter fullgörs, upphör ångerrätten;
          avbryter du under tiden betalar du för det arbete som utförts fram till dess. Avbokar du
          efter att ombud, jurist eller myndighetstider bokats kan de kostnaderna inte återbetalas.
          Avgifter som redan betalats till myndighet återbetalas aldrig av mig.
        </p>

        <h2>6. Ansvarsbegränsning</h2>
        <p>
          Innehållet på sajten är allmän information och inte juridisk eller skattemässig rådgivning.
          Regler, avgifter och handläggningstider i Paraguay ändras och tolkas av myndigheten i varje
          enskilt fall. Mitt ansvar är begränsat till det arvode du betalat för uppdraget och
          omfattar inte indirekt skada, såsom utebliven vinst, förlorad arbetsinkomst eller kostnader
          för resa och boende. Ingenting i villkoren begränsar ansvar vid uppsåt eller grov
          vårdslöshet, eller ansvar som enligt tvingande lag inte får begränsas.
        </p>

        <h2>7. Behandling av personuppgifter</h2>
        <p>
          Uppgifter du lämnar behandlas enligt <Link href="/integritetspolicy">integritetspolicyn</Link>.
          För att kunna leverera tjänsten delas nödvändiga uppgifter med ombud, jurist och myndighet
          i Paraguay.
        </p>

        <h2>8. Immateriella rättigheter</h2>
        <p>
          Texter, guider, checklistor och bilder på sajten och i levererat material tillhör mig och
          får användas för ditt eget ärende, men inte publiceras, säljas vidare eller användas i egen
          verksamhet utan skriftligt medgivande.
        </p>

        <h2>9. Tvist och tillämplig lag</h2>
        <p>
          Svensk lag tillämpas på avtalet i den mån tvingande konsumentskyddsregler i ditt hemland
          inte säger annat. Tvist försöker vi i första hand lösa direkt. Som konsument kan du vända
          dig till Allmänna reklamationsnämnden (ARN) eller till allmän domstol.
        </p>

        <h2>10. Kontakt</h2>
        <p>
          {site.author.name}, {site.email}. Frågor om villkoren besvaras innan du beställer — hör av
          dig via <Link href="/kontakt">kontaktsidan</Link>.
        </p>
      </div>
    </Section>
  );
}
