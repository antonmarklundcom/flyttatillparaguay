import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/marketing/PageHero";
import { buildMetadata } from "@/lib/seo";
import { contactEmail } from "@/lib/site";

/** Legal-sida (plan.md §3A). Full text skrivs i fas opus-2. */

export const metadata = buildMetadata({
  title: "Integritetspolicy",
  description:
    "Hur uppgifterna du lämnar via formulär och nyhetsbrev behandlas, hur länge de sparas och vilka rättigheter du har.",
  path: "/integritetspolicy",
});

export default function IntegritetspolicyPage() {
  return (
    <>
      <PageHero
        width="content"
        eyebrow="Juridiskt"
        title="Integritetspolicy"
        lead="Platshållaringress: fullständig text skrivs i fas opus-2. Strukturen nedan är den som ska fyllas."
      />

      <Section width="content">
        <div className="prose">
          <h2>Vem som är personuppgiftsansvarig</h2>
          <p>Platshållartext.</p>

          <h2>Vilka uppgifter som samlas in</h2>
          <p>
            Platshållartext: namn, telefonnummer, e-postadress och det du skriver
            i meddelandefältet, samt teknisk trafikdata som besökets ursprung.
          </p>

          <h2>Varför de samlas in</h2>
          <p>
            Platshållartext: för att kunna svara på din förfrågan och för att
            skicka nyhetsbrevet om du bett om det.
          </p>

          <h2>Vem uppgifterna delas med</h2>
          <p>
            Platshållartext: kontaktuppgifter lagras i ett kundhanteringssystem
            (VenderCRM). De säljs aldrig vidare.
          </p>

          <h2>Hur länge de sparas</h2>
          <p>Platshållartext.</p>

          <h2>Dina rättigheter</h2>
          <p>
            Platshållartext: rätt till registerutdrag, rättelse och radering.
            Hör av dig till <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Platshållartext: sajten använder en cookie för att komma ihåg var en
            besökare först kom ifrån, så att jag vet vilka kanaler som fungerar.
          </p>
        </div>
      </Section>
    </>
  );
}
