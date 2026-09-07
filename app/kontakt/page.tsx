import Link from "next/link";
import { CtaBlock, Section, SectionHeading } from "@/components/blocks";
import { Card } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";
import { site, whatsappUrl } from "@/content/site";
import { strings } from "@/content/strings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Skriv på WhatsApp eller skicka en förfrågan om residency, tomter eller livet i Paraguay — jag svarar själv, normalt inom ett dygn.",
  path: "/kontakt",
});

const expectations = [
  {
    title: "Du får svar av mig",
    description:
      "Inte av en assistent och inte av ett formulärsvar. Jag läser varje förfrågan själv och svarar normalt inom ett dygn, ibland samma timme och ibland dagen efter om jag sitter hos en myndighet.",
  },
  {
    title: "Första samtalet är gratis",
    description:
      "30–45 minuter där vi går igenom din situation. Efteråt får du en skriftlig bedömning med tidslinje och total kostnad. Du binder dig inte till något genom att höra av dig.",
  },
  {
    title: "Jag säger nej när det är rätt svar",
    description:
      "Tror jag inte att Paraguay löser ditt problem säger jag det. Det är billigare för dig och lugnare för mig än ett ärende som aldrig borde ha startat.",
  },
];

export default function KontaktPage() {
  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Kontakt"
              title="Hör av dig — även om frågan är liten"
              description="Snabbaste vägen är WhatsApp; där svarar jag oftast inom några timmar under paraguayansk dagtid. Vill du hellre skriva utförligt om din situation, använd formuläret."
            />

            <div className="mt-8 grid gap-3 text-sm">
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
              <p className="text-(--color-text-muted)">
                Asunción, Paraguay · lokal tid ligger fyra till fem timmar efter Sverige beroende på
                årstid. Skriver du på kvällen svensk tid får du oftast svar samma kväll.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              {expectations.map((item) => (
                <Card key={item.title}>
                  <h2 className="text-base">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>

            <p className="mt-8 text-sm text-(--color-text-muted)">
              Gäller frågan tomt eller hus går det snabbare via{" "}
              <Link href="/fastigheter" className="font-semibold underline">
                fastighetsformuläret
              </Link>
              . Gäller den residency finns hela processen på{" "}
              <Link href="/residency" className="font-semibold underline">
                residencysidan
              </Link>
              .
            </p>
          </div>

          <div>
            <LeadForm formId="kontakt" />
          </div>
        </div>
      </Section>

      <Section>
        <CtaBlock
          title="Redo att sätta igång?"
          description="Residency-sidan har hela processen, kraven, paketen och det som inte ingår — läs den först så blir samtalet kortare och bättre."
          href="/residency"
          label="Till residency"
        />
      </Section>
    </>
  );
}
