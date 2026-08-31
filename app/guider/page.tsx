import Link from "next/link";
import { ArticleCard, CtaBlock, Section, SectionHeading } from "@/components/blocks";
import { CLUSTERS, getGuides, isCluster } from "@/lib/content";
import { strings } from "@/content/strings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guider om Paraguay",
  description:
    "Allt jag vet om residency, ekonomi, livsstil, Plan B och fastigheter i Paraguay — samlat och sorterat.",
  path: "/guider",
});

type Props = { searchParams: Promise<{ cluster?: string }> };

export default async function GuiderPage({ searchParams }: Props) {
  const { cluster } = await searchParams;
  const active = isCluster(cluster) ? cluster : null;
  const guides = getGuides().filter((guide) => !active || guide.frontmatter.cluster === active);

  return (
    <>
      <Section>
        <SectionHeading
          as="h1"
          eyebrow="Kunskapsbank"
          title={strings.guides.indexTitle}
          description="Filtrera på det du är nyfiken på. Alla guider uppdateras när verkligheten gör det."
        />

        <nav aria-label="Filtrera guider" className="mt-8 flex flex-wrap gap-2">
          <FilterLink href="/guider" label={strings.guides.allClusters} active={active === null} />
          {CLUSTERS.map((item) => (
            <FilterLink
              key={item}
              href={`/guider?cluster=${item}`}
              label={strings.clusters[item]}
              active={active === item}
            />
          ))}
        </nav>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <ArticleCard key={guide.slug} guide={guide} />
          ))}
        </div>

        {guides.length === 0 ? (
          <p className="mt-10 text-sm text-(--color-text-muted)">{strings.guides.empty}</p>
        ) : null}
      </Section>

      <Section>
        <CtaBlock
          title="Saknar du en guide?"
          description="Skriv vad du undrar över — det blir ofta nästa artikel."
        />
      </Section>
    </>
  );
}

function FilterLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-(--color-brand) bg-(--color-brand) text-cream-50"
          : "border-(--color-line) bg-(--color-surface-raised) text-(--color-text-muted) hover:text-(--color-text)"
      }`}
    >
      {label}
    </Link>
  );
}
