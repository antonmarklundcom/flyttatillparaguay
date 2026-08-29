import { strings } from "@content/strings";

import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section width="content" className="py-24 sm:py-32">
      <p className="font-display text-display-xl text-clay-300">404</p>
      <h1 className="mt-4 text-display-lg">{strings.notFound.title}</h1>
      <p className="mt-6 text-lead text-ink-500">{strings.notFound.body}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="accent" size="lg">
          {strings.notFound.action}
        </ButtonLink>
        <ButtonLink href="/guider" variant="outline" size="lg">
          {strings.cta.seeAllGuides}
        </ButtonLink>
      </div>
    </Section>
  );
}
