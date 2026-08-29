import { strings } from "@content/strings";

import { Section } from "@/components/layout/Section";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { PageHero } from "@/components/marketing/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { contactEmail, whatsappUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Kontakt",
  description:
    "Skriv på WhatsApp för snabbast svar, eller skicka en förfrågan via formuläret. Jag svarar oftast inom ett dygn.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Hör av dig — det kostar ingenting att fråga"
        lead="Platshållaringress: WhatsApp går snabbast. Föredrar du formulär eller mejl fungerar det lika bra, det tar bara lite längre."
      />

      <Section>
        <CtaBlock
          formId="kontakt"
          title="Skriv några rader"
          body="Platshållartext: berätta var du är i din process så återkommer jag med vad som är realistiskt i ditt fall."
          whatsappMessage="Hej Anton!"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="text-lg">WhatsApp</h2>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[0.9375rem] text-forest-800 underline decoration-forest-300 underline-offset-4"
            >
              {strings.cta.whatsapp}
            </a>
            <p className="mt-1 text-sm text-ink-400">{strings.cta.whatsappHint}</p>
          </div>
          <div>
            <h2 className="text-lg">E-post</h2>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-2 inline-block text-[0.9375rem] text-forest-800 underline decoration-forest-300 underline-offset-4"
            >
              {contactEmail}
            </a>
          </div>
          <div>
            <h2 className="text-lg">Var jag finns</h2>
            <p className="mt-2 text-[0.9375rem] text-ink-500">
              Asunción, Paraguay (UTC−3)
            </p>
          </div>
        </div>
      </Section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ])}
      />
    </>
  );
}
