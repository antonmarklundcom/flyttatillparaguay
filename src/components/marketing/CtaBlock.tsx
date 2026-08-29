import { strings } from "@content/strings";

import { LeadForm } from "@/components/forms/LeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { LeadFormId } from "@/lib/lead";
import { whatsappUrl } from "@/lib/site";

/**
 * CTA-block: WhatsApp primärt, formulär sekundärt (plan.md §3C).
 * Varje hubb och varje guide slutar i ett sådant här block.
 */
export function CtaBlock({
  formId,
  eyebrow,
  title,
  body,
  whatsappMessage,
  hidden,
  variant = "full",
}: {
  formId: LeadFormId;
  eyebrow?: string;
  title: string;
  body: string;
  whatsappMessage?: string;
  hidden?: Partial<Record<"paket" | "ort" | "amne", string>>;
  /** `compact` = bara WhatsApp + länk, för artikelslut. */
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <aside className="rounded-xl border border-forest-200 bg-forest-50 p-6 sm:p-8">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className={`text-display-sm ${eyebrow ? "mt-3" : ""}`}>{title}</h2>
        <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-500">
          {body}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappUrl(whatsappMessage)} external variant="accent" size="lg">
            {strings.cta.whatsapp}
          </ButtonLink>
          <ButtonLink href="/kontakt" variant="outline" size="lg">
            {strings.cta.form}
          </ButtonLink>
        </div>
      </aside>
    );
  }

  return (
    <div className="grid gap-10 rounded-2xl border border-sand-300 bg-white p-6 shadow-card sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className={`text-display-md ${eyebrow ? "mt-3" : ""}`}>{title}</h2>
        <p className="mt-4 text-lead text-ink-500">{body}</p>

        <div className="mt-8">
          <ButtonLink
            href={whatsappUrl(whatsappMessage)}
            external
            variant="accent"
            size="lg"
          >
            {strings.cta.whatsapp}
          </ButtonLink>
          <p className="mt-2.5 text-sm text-ink-400">{strings.cta.whatsappHint}</p>
        </div>
      </div>

      <div className="border-t border-sand-300 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        <p className="text-sm text-ink-400">{strings.cta.formHint}</p>
        <div className="mt-5">
          <LeadForm formId={formId} hidden={hidden} />
        </div>
      </div>
    </div>
  );
}
