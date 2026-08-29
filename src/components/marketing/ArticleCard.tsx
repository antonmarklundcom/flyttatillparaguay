import Link from "next/link";

import { strings } from "@content/strings";

import { ImageSlot } from "@/components/ui/ImageSlot";
import type { GuideSummary } from "@/lib/content";

/**
 * Redaktionellt artikelkort (plan.md §3D).
 *
 * Tar en `GuideSummary`, inte en hel `Guide` — kortet behöver ingen brödtext,
 * och kan då renderas lika gärna från en klientkomponent utan att dra med sig
 * varje artikels MDX-body i payloaden.
 */
export function ArticleCard({
  guide,
  showImage = true,
}: {
  guide: GuideSummary;
  showImage?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      {showImage ? (
        <ImageSlot
          src={guide.heroImage}
          alt={guide.title}
          brief={`${strings.placeholders.image}: ${guide.title}`}
          aspect="16 / 10"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="mb-5"
        />
      ) : null}

      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-600">
        {strings.clusters[guide.cluster]}
      </p>

      <h3 className="mt-2 text-xl">
        <Link
          href={`/guider/${guide.slug}`}
          className="transition-colors group-hover:text-forest-700"
        >
          {guide.title}
        </Link>
      </h3>

      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
        {guide.description}
      </p>

      <p className="mt-3 text-xs text-ink-400">
        {strings.guides.updatedPrefix} {guide.updatedAt} · {guide.readingMinutes}{" "}
        {strings.guides.readingSuffix}
        {guide.draft ? " · utkast" : ""}
      </p>
    </article>
  );
}
