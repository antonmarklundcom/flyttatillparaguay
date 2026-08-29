import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/marketing/PageHero";
import { buildMetadata } from "@/lib/seo";

/** Legal-sida (plan.md §3A). Full text skrivs i fas opus-2. */

export const metadata = buildMetadata({
  title: "Villkor",
  description:
    "Villkoren för tjänsterna på flyttatillparaguay.se: vad som ingår, vad som inte ingår, betalning och ansvarsbegränsning.",
  path: "/villkor",
});

export default function VillkorPage() {
  return (
    <>
      <PageHero
        width="content"
        eyebrow="Juridiskt"
        title="Villkor"
        lead="Platshållaringress: fullständig text skrivs i fas opus-2."
      />

      <Section width="content">
        <div className="prose">
          <h2>Vad tjänsten är</h2>
          <p>
            Platshållartext: vägledning och praktisk hjälp genom en
            ansökningsprocess — inte juridisk, skatte- eller
            investeringsrådgivning.
          </p>

          <h2>Vad som ingår och inte ingår</h2>
          <p>Platshållartext: hänvisar till paketen på residency-sidan.</p>

          <h2>Priser och betalning</h2>
          <p>Platshållartext: betalningsflödet är en öppen affärsfråga (plan.md §8).</p>

          <h2>Avbokning och återbetalning</h2>
          <p>Platshållartext.</p>

          <h2>Ansvarsbegränsning</h2>
          <p>
            Platshållartext: myndigheternas handläggning och beslut ligger utanför
            min kontroll, och regler kan ändras.
          </p>

          <h2>Tillämplig lag</h2>
          <p>Platshållartext.</p>
        </div>
      </Section>
    </>
  );
}
