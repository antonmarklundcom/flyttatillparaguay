import { strings } from "@content/strings";

import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";

/** Tacksida för formulärinskick utan JavaScript. Indexeras inte. */

export const metadata = buildMetadata({
  title: strings.thanks.title,
  description: strings.thanks.body,
  path: "/tack",
  noIndex: true,
});

export default function TackPage() {
  return (
    <Section width="content" className="py-24 sm:py-32">
      <h1 className="text-display-lg">{strings.thanks.title}</h1>
      <p className="mt-6 text-lead text-ink-500">{strings.thanks.body}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={whatsappUrl()} external variant="accent" size="lg">
          {strings.cta.whatsapp}
        </ButtonLink>
        <ButtonLink href="/" variant="outline" size="lg">
          {strings.thanks.action}
        </ButtonLink>
      </div>
    </Section>
  );
}
