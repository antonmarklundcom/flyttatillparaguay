import type { ReactNode } from "react";

/**
 * Bento-grid för "varför Paraguay" (plan.md §3D).
 * Mobil: en kolumn i arrayordning. Desktop: första kortet är brett.
 */

export type BentoItem = {
  title: string;
  body: string;
  /** Valfri sifferaccent, t.ex. "10 %". */
  figure?: string;
  icon?: ReactNode;
};

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.title}
          className={`flex flex-col rounded-xl border border-sand-300 bg-white p-6 shadow-card ${
            index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
          }`}
        >
          {item.figure ? (
            <p className="font-display text-display-sm text-clay-500">{item.figure}</p>
          ) : null}
          <h3
            className={`text-xl ${item.figure ? "mt-2" : ""} ${
              index === 0 ? "sm:text-2xl" : ""
            }`}
          >
            {item.title}
          </h3>
          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">
            {item.body}
          </p>
        </article>
      ))}
    </div>
  );
}
