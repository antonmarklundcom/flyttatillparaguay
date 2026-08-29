import type { ReactNode } from "react";

import { Container } from "./Container";

type Tone = "default" | "muted" | "surface" | "forest";

const tones: Record<Tone, string> = {
  default: "",
  muted: "bg-sand-200",
  surface: "bg-white",
  forest: "bg-forest-900 text-sand-200",
};

/** Vertikal rytm för sidsektioner — håll allt på 8px-rutnätet. */
export function Section({
  children,
  tone = "default",
  width = "site",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  width?: "site" | "content";
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${tones[tone]} ${className}`}>
      <Container width={width}>{children}</Container>
    </section>
  );
}
