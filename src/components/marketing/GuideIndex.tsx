"use client";

import { useMemo, useState } from "react";

import { strings } from "@content/strings";

import { ArticleCard } from "@/components/marketing/ArticleCard";
import { CLUSTERS, type Cluster, type Guide } from "@/lib/content";

/**
 * Guideindex med clusterfilter (plan.md §3C).
 *
 * Filtret körs i klienten på en redan serverrenderad lista — alla artiklar
 * finns i HTML:en, så indexet är fullt indexerbart och fungerar utan JS.
 */
export function GuideIndex({ guides }: { guides: Guide[] }) {
  const [active, setActive] = useState<Cluster | "alla">("alla");

  const available = useMemo(() => {
    const used = new Set(guides.map((guide) => guide.frontmatter.cluster));
    return CLUSTERS.filter((cluster) => used.has(cluster));
  }, [guides]);

  const visible =
    active === "alla"
      ? guides
      : guides.filter((guide) => guide.frontmatter.cluster === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrera guider">
        {(["alla", ...available] as const).map((cluster) => {
          const isActive = active === cluster;
          return (
            <button
              key={cluster}
              type="button"
              onClick={() => setActive(cluster)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-forest-800 bg-forest-800 text-sand-50"
                  : "border-sand-400 text-ink-700 hover:border-forest-600 hover:text-forest-800"
              }`}
            >
              {cluster === "alla" ? strings.guides.allClusters : strings.clusters[cluster]}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((guide) => (
            <ArticleCard key={guide.slug} guide={guide} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-ink-400">{strings.guides.empty}</p>
      )}
    </div>
  );
}
