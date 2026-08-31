import { ButtonLink } from "@/components/ui";
import { Section, SectionHeading } from "@/components/blocks";
import { strings } from "@/content/strings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: strings.thanks.title,
  description: strings.thanks.description,
  path: "/tack",
  noindex: true,
});

export default function TackPage() {
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <SectionHeading as="h1" align="center" title={strings.thanks.title} description={strings.thanks.description} />
        <ButtonLink href="/guider" className="mt-8">
          Läs guiderna under tiden
        </ButtonLink>
      </div>
    </Section>
  );
}
