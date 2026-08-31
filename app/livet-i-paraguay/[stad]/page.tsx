import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaBlock, Section } from "@/components/blocks";
import { Mdx } from "@/components/mdx";
import { getCities, getCity } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ stad: string }> };

export function generateStaticParams() {
  return getCities().map((city) => ({ stad: city.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { stad } = await params;
  const city = getCity(stad);
  if (!city) return {};
  return pageMetadata({
    title: city.frontmatter.title,
    description: city.frontmatter.description,
    path: `/livet-i-paraguay/${city.slug}`,
    image: city.frontmatter.heroImage,
    noindex: city.frontmatter.draft,
  });
}

export default async function CityPage({ params }: Props) {
  const { stad } = await params;
  const city = getCity(stad);
  if (!city) notFound();

  return (
    <>
      <article className="section">
        <div className="container-prose">
          <Link href="/livet-i-paraguay" className="text-sm font-semibold text-(--color-brand) underline">
            ← Livet i Paraguay
          </Link>
          <h1 className="mt-6 text-4xl leading-tight">{city.frontmatter.title}</h1>
          <p className="mt-4 text-lg text-(--color-text-muted)">{city.frontmatter.description}</p>
          <div className="mt-10">
            <Mdx source={city.body} />
          </div>
        </div>
      </article>

      <Section>
        <CtaBlock
          title="Fundera inte i blindo"
          description="Berätta vad du söker så säger jag hur det ser ut på plats."
          cluster="livsstil"
        />
      </Section>
    </>
  );
}
