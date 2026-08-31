import { ButtonLink } from "@/components/ui";
import { Section, SectionHeading } from "@/components/blocks";
import { strings } from "@/content/strings";

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-xl py-16 text-center">
        <SectionHeading as="h1" align="center" eyebrow="404" title={strings.notFound.title} description={strings.notFound.description} />
        <ButtonLink href="/" className="mt-8">
          {strings.notFound.cta}
        </ButtonLink>
      </div>
    </Section>
  );
}
