import { packages, type ServicePackage } from "@content/packages";

import { ButtonLink } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/site";

/**
 * Paketkort för /residency och paket-teasern på hemsidan.
 *
 * Priser saknas medvetet i opus-1; opus-2 sätter platshållarpriser och Anton
 * de riktiga (plan.md §7). Tills dess visas "Offert" i stället för ett tal —
 * ett påhittat pris på en säljsida är värre än inget pris alls.
 */

function Price({ pkg }: { pkg: ServicePackage }) {
  if (pkg.priceEur === null) {
    return (
      <p className="font-display text-display-sm text-forest-800">Offert</p>
    );
  }
  return (
    <p className="font-display text-display-sm text-forest-800">
      {pkg.priceEur.toLocaleString("sv-SE")} €
      {pkg.priceIsPlaceholder ? (
        <span className="ml-2 align-middle text-xs font-sans font-semibold uppercase tracking-[0.14em] text-clay-600">
          preliminärt
        </span>
      ) : null}
    </p>
  );
}

export function PackageGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {packages.map((pkg) => (
        <article
          key={pkg.id}
          className={`flex flex-col rounded-xl border bg-white p-6 sm:p-7 ${
            pkg.popular
              ? "border-forest-300 shadow-lift ring-1 ring-forest-200"
              : "border-sand-300 shadow-card"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-2xl">{pkg.name}</h3>
            {pkg.popular ? (
              <span className="shrink-0 rounded-full bg-clay-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-clay-700">
                Vanligast
              </span>
            ) : null}
          </div>

          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
            {pkg.summary}
          </p>

          <div className="mt-5">
            <Price pkg={pkg} />
          </div>

          {!compact ? (
            <>
              <ul className="mt-6 space-y-2 text-[0.9375rem] text-ink-700">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                Ingår inte
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-400">
                {pkg.excludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-auto pt-7">
            <ButtonLink
              href={whatsappUrl(`Hej Anton! Jag är intresserad av paketet ${pkg.name}.`)}
              external
              variant={pkg.popular ? "accent" : "outline"}
              className="w-full"
            >
              Fråga om {pkg.name}
            </ButtonLink>
          </div>
        </article>
      ))}
    </div>
  );
}
