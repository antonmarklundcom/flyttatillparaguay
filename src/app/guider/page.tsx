import { strings } from "@content/strings";

import { Section } from "@/components/layout/Section";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { GuideIndex } from "@/components/marketing/GuideIndex";
import { PageHero } from "@/components/marketing/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { toGuideSummary } from "@/lib/content";
import { getGuides } from "@/lib/mdx";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: strings.guides.indexTitle,
  description: strings.guides.indexIntro,
  path: "/guider",
});

export default function GuiderPage() {
  const guides = getGuides().map(toGuideSummary);

  return (
    <>
      <PageHero
        eyebrow="Kunskapsbank"
        title={strings.guides.indexTitle}
        lead={strings.guides.indexIntro}
      />

      <Section>
        <GuideIndex guides={guides} />
      </Section>

      <Section tone="muted">
        <CtaBlock
          formId="kontakt"
          variant="compact"
          title="Hittar du inte svaret?"
          body="Platshållartext: skriv så svarar jag — och blir frågan vanlig nog skriver jag en guide om den."
          whatsappMessage="Hej Anton! Jag har en fråga jag inte hittade svar på."
        />
      </Section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: strings.guides.indexTitle, path: "/guider" },
        ])}
      />
    </>
  );
}
