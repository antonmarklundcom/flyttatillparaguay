import type { FaqItem } from "@/lib/content";

/**
 * FAQ-accordion byggd på <details>/<summary> — noll JavaScript, fungerar
 * med tangentbord och skärmläsare, och kostar ingenting på LCP.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-sand-300 border-y border-sand-300">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-lg text-ink-900">{item.question}</span>
            <span
              aria-hidden="true"
              className="mt-1.5 shrink-0 text-clay-500 transition-transform duration-200 group-open:rotate-45"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4">
                <path
                  d="M10 4v12M4 10h12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-500">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
