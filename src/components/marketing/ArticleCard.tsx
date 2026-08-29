import Link from "next/link";

import { strings } from "@content/strings";

import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Guide } from "@/lib/content";

/** Redaktionellt artikelkort (plan.md §3D). */
export function ArticleCard({
  guide,
  showImage = true,
}: {
  guide: Guide;
  showImage?: boolean;
}) {
  const { frontmatter: fm } = guide;

  return (
    <article className="group flex flex-col">
      {showImage ? (
        <ImageSlot
          src={fm.heroImage}
          alt={fm.title}
          brief={`${strings.placeholders.image}: ${fm.title}`}
          aspect="16 / 10"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="mb-5"
        />
      ) : null}

      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-600">
        {strings.clusters[fm.cluster]}
      </p>

      <h3 className="mt-2 text-xl">
        <Link
          href={`/guider/${guide.slug}`}
          className="transition-colors group-hover:text-forest-700"
        >
          <span className="absolute inset-0 hidden" aria-hidden="true" />
          {fm.title}
        </Link>
      </h3>

      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
        {fm.description}
      </p>

      <p className="mt-3 text-xs text-ink-400">
        {strings.guides.updatedPrefix} {fm.updatedAt} · {guide.readingMinutes}{" "}
        {strings.guides.readingSuffix}
        {fm.draft ? " · utkast" : ""}
      </p>
    </article>
  );
}
