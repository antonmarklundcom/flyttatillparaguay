/**
 * Stat-rad / faktarad (plan.md §3D) — 10 % skatt, kostnadsjämförelser.
 * Siffrorna är innehåll, inte design: senare faser byter värdena här.
 */

export type Stat = {
  value: string;
  label: string;
  /** Kort brödtext, t.ex. "uppskattning 2026". */
  note?: string;
};

export function StatRow({
  stats,
  tone = "default",
}: {
  stats: Stat[];
  tone?: "default" | "onDark";
}) {
  const divider = tone === "onDark" ? "divide-sand-100/15" : "divide-sand-300";
  const border = tone === "onDark" ? "border-sand-100/15" : "border-sand-300";
  const value = tone === "onDark" ? "text-sand-50" : "text-forest-800";
  const label = tone === "onDark" ? "text-sand-200" : "text-ink-800";
  const note = tone === "onDark" ? "text-sand-400" : "text-ink-400";

  return (
    <dl
      className={`grid divide-y border-y sm:grid-cols-2 sm:divide-x lg:grid-cols-4 ${divider} ${border} sm:divide-y-0`}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="px-1 py-6 sm:px-6 sm:first:pl-0">
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <p className={`font-display text-display-sm ${value}`}>{stat.value}</p>
            <p className={`mt-1.5 text-[0.9375rem] font-medium ${label}`}>
              {stat.label}
            </p>
            {stat.note ? (
              <p className={`mt-1 text-xs ${note}`}>{stat.note}</p>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
