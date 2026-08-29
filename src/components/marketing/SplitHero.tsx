import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Split-hero med stort foto (plan.md §3D).
 *
 * Renderas ALDRIG inuti <Reveal> — det här är sidans LCP-element.
 */
export function SplitHero({
  eyebrow,
  title,
  lead,
  actions,
  aside,
  imageSrc,
  imageAlt,
  imageBrief,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  /** Liten faktarad eller förtroendemarkör under knapparna. */
  aside?: ReactNode;
  imageSrc?: string | null;
  imageAlt: string;
  imageBrief: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-sand-300 bg-gradient-to-b from-sand-50 to-sand-100">
      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className={`text-display-xl ${eyebrow ? "mt-4" : ""}`}>{title}</h1>
            <p className="mt-6 max-w-xl text-lead text-ink-500">{lead}</p>
            {actions ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {actions}
              </div>
            ) : null}
            {aside ? <div className="mt-6">{aside}</div> : null}
          </div>

          <ImageSlot
            src={imageSrc}
            alt={imageAlt}
            brief={imageBrief}
            priority
            aspect="4 / 5"
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="lg:justify-self-end lg:max-w-[30rem]"
          />
        </div>
      </Container>
    </div>
  );
}
