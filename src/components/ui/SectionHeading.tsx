import type { ReactNode } from "react";

import { Eyebrow } from "./Eyebrow";

/** Standardhuvud för en sektion: etikett, rubrik, ingress. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "start",
  tone = "default",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  tone?: "default" | "onDark";
  as?: "h1" | "h2" | "h3";
}) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  const headingColor = tone === "onDark" ? "text-sand-50" : "";
  const leadColor = tone === "onDark" ? "text-sand-300" : "text-ink-500";

  return (
    <div className={alignment}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        className={`text-display-md ${eyebrow ? "mt-3" : ""} ${headingColor}`}
      >
        {title}
      </Heading>
      {lead ? (
        <p className={`mt-4 text-lead ${leadColor}`}>{lead}</p>
      ) : null}
    </div>
  );
}
