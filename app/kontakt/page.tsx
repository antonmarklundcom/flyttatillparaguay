import { CtaBlock, Section, SectionHeading } from "@/components/blocks";
import { LeadForm } from "@/components/lead-form";
import { site, whatsappUrl } from "@/content/site";
import { strings } from "@/content/strings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontakt",
  description: "Skriv på WhatsApp eller skicka en förfrågan — jag svarar själv, normalt inom ett dygn.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Kontakt"
              title="Hör av dig"
              description="Snabbast är WhatsApp. Vill du hellre skriva utförligt, använd formuläret."
            />
            <div className="mt-8 space-y-3 text-sm">
              <p>
                <a
                  href={whatsappUrl(strings.cta.whatsappMessage)}
                  rel="noopener"
                  className="font-semibold text-(--color-brand) underline"
                >
                  {strings.cta.whatsapp}
                </a>
              </p>
              <p className="text-(--color-text-muted)">{site.email}</p>
            </div>
          </div>
          <LeadForm formId="kontakt" />
        </div>
      </Section>

      <Section>
        <CtaBlock
          title="Redo att sätta igång?"
          description="Residency-sidan har hela processen och paketen."
          href="/residency"
          label="Till residency"
        />
      </Section>
    </>
  );
}
