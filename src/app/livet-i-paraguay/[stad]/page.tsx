import Link from "next/link";
import { notFound } from "next/navigation";

import { strings } from "@content/strings";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CtaBlock } from "@/components/marketing/CtaBlock";
import { MdxContent } from "@/components/mdx/MdxContent";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { JsonLd } from "@/components/ui/JsonLd";
import { getCities, getCity } from "@/lib/mdx";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

/** Ortsprofil (plan.md §2). Innehållet skrivs i fas sonnet-3. */

export function generateStaticParams() {
  return getCities().map((city) => ({ stad: city.slug }));
}

export async function generateMetadata({ params }: PageProps<"/livet-i-paraguay/[stad]">) {
  const { stad } = await params;
  const city = getCity(stad);
  if (!city) return {};

  return buildMetadata({
    title: `${city.frontmatter.title} — livet, kostnader och läge`,
    description: city.frontmatter.description,
    path: `/livet-i-paraguay/${city.slug}`,
    noIndex: city.frontmatter.draft,
  });
}

export default async function CityPage({ params }: PageProps<"/livet-i-paraguay/[stad]">) {
  const { stad } = await params;
  const city = getCity(stad);
  if (!city) notFound();

  return (
    <>
      <Container width="content" className="pt-10 sm:pt-14">
        <Link
          href="/livet-i-paraguay"
          className="text-sm font-medium text-forest-800 underline decoration-forest-300 underline-offset-4"
        >
          ← Livet i Paraguay
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-clay-600">
          {city.frontmatter.region}
        </p>
        <h1 className="mt-3 text-display-lg">{city.frontmatter.title}</h1>
        <p className="mt-5 text-lead text-ink-500">{city.frontmatter.description}</p>
      </Container>

      <Container width="content" className="mt-10">
        <ImageSlot
          src={city.frontmatter.heroImage}
          alt={city.frontmatter.title}
          brief={`${strings.placeholders.image}: ${city.frontmatter.title}`}
          aspect="16 / 9"
          sizes="(min-width: 768px) 46rem, 100vw"
        />
      </Container>

      <Container width="content" className="mt-12">
        <div className="prose">
          <MdxContent source={city.body} />
        </div>
      </Container>

      <Section width="content">
        <CtaBlock
          formId="kontakt"
          variant="compact"
          title={`Funderar du på ${city.frontmatter.title}?`}
          body="Platshållartext: hör av dig så berättar jag hur det är att bo där i praktiken."
          whatsappMessage={`Hej Anton! Jag är nyfiken på ${city.frontmatter.title}.`}
        />
      </Section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Livet i Paraguay", path: "/livet-i-paraguay" },
          { name: city.frontmatter.title, path: `/livet-i-paraguay/${city.slug}` },
        ])}
      />
    </>
  );
}
