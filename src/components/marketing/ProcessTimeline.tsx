/**
 * Numrerad processtidslinje (plan.md §3D) — används för residency-processen
 * i fyra steg på hemsidan och i full längd på /residency.
 */

export type ProcessStep = {
  title: string;
  body: string;
  /** T.ex. "1–2 veckor". */
  duration?: string;
};

export function ProcessTimeline({
  steps,
  tone = "default",
}: {
  steps: ProcessStep[];
  tone?: "default" | "onDark";
}) {
  const line = tone === "onDark" ? "bg-sand-100/15" : "bg-sand-300";
  const badge =
    tone === "onDark"
      ? "border-sand-100/25 bg-forest-900 text-sand-200"
      : "border-sand-300 bg-white text-forest-800";
  const heading = tone === "onDark" ? "text-sand-50" : "";
  const body = tone === "onDark" ? "text-sand-300" : "text-ink-500";
  const duration = tone === "onDark" ? "text-sand-400" : "text-clay-600";

  return (
    <ol className="relative">
      <span
        aria-hidden="true"
        className={`absolute left-[1.4375rem] top-4 bottom-8 w-px ${line}`}
      />
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
          <span
            aria-hidden="true"
            className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-display text-lg ${badge}`}
          >
            {index + 1}
          </span>
          <div className="pt-2">
            <h3 className={`text-xl ${heading}`}>{step.title}</h3>
            {step.duration ? (
              <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.14em] ${duration}`}>
                {step.duration}
              </p>
            ) : null}
            <p className={`mt-2 max-w-xl text-[0.9375rem] leading-relaxed ${body}`}>
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
