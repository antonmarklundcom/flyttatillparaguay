import { Section } from "@/components/blocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Villkor",
  description: "Villkor för tjänsterna som säljs via flyttatillparaguay.se.",
  path: "/villkor",
});

export default function VillkorPage() {
  return (
    <Section>
      <div className="container-prose prose-editorial">
        <h1 className="text-4xl">Villkor</h1>
        <p>
          Platshållartext — de slutliga villkoren skrivs i fas opus-2 tillsammans med
          paketstrukturen.
        </p>
        <h2>Tjänsten</h2>
        <p>Vägledning och praktisk hjälp genom residencyprocessen i Paraguay.</p>
        <h2>Ansvarsbegränsning</h2>
        <p>
          Innehållet på sajten är information, inte juridisk eller skattemässig rådgivning.
          Myndighetsbeslut ligger utanför min kontroll.
        </p>
      </div>
    </Section>
  );
}
