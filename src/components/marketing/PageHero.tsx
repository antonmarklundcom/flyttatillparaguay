import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Enkel textbaserad hero för hubbar och stödsidor. */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  width = "site",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  width?: "site" | "content";
}) {
  return (
    <div className="border-b border-sand-300 bg-gradient-to-b from-sand-50 to-sand-100">
      <Container width={width} className="py-14 sm:py-20">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className={`text-display-lg ${eyebrow ? "mt-4" : ""} max-w-3xl`}>
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-lead text-ink-500">{lead}</p>
        ) : null}
        {actions ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {actions}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
