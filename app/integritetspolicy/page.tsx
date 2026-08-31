import { Section } from "@/components/blocks";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Integritetspolicy",
  description: "Hur uppgifterna du lämnar på flyttatillparaguay.se hanteras.",
  path: "/integritetspolicy",
});

export default function IntegritetspolicyPage() {
  return (
    <Section>
      <div className="container-prose prose-editorial">
        <h1 className="text-4xl">Integritetspolicy</h1>
        <p>
          Platshållartext — den slutliga policyn skrivs i fas opus-2. Uppgifter du lämnar i
          formulären används endast för att svara på din förfrågan.
        </p>
        <h2>Personuppgiftsansvarig</h2>
        <p>
          {site.author.name}, {site.email}.
        </p>
        <h2>Vilka uppgifter samlas in</h2>
        <p>Namn, telefonnummer, e-post och det du skriver i meddelandefältet.</p>
        <h2>Dina rättigheter</h2>
        <p>Du kan när som helst begära utdrag eller radering genom att mejla adressen ovan.</p>
      </div>
    </Section>
  );
}
