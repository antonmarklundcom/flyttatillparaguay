import { CtaBlock, ImageSlot, Section, SectionHeading } from "@/components/blocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Om Anton",
  description:
    "34-årig svensk som flyttade till Paraguay, gick genom hela residencyprocessen själv och hjälper nu andra att göra samma sak.",
  path: "/om",
});

export default function OmPage() {
  return (
    <>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Om mig"
              title="Jag gjorde det själv först"
              description="Placeholder-story. Opus-2 skriver den riktiga: flytten, flickvännen, vardagen och varför jag hjälper andra."
            />
          </div>
          <div className="relative aspect-4/5 overflow-hidden rounded-(--radius-xl) border border-(--color-line)">
            <ImageSlot label="Porträtt Anton — riktigt foto, plan §7" />
          </div>
        </div>
      </Section>

      <Section>
        <CtaBlock
          title="Vill du prata med mig direkt?"
          description="Jag tar samtalen själv — inget callcenter, ingen säljare."
        />
      </Section>
    </>
  );
}
