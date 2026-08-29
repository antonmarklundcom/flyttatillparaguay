import type { ReactNode } from "react";

/** Liten överrubrik som ger sektionen en etikett utan att stjäla vikt. */
export function Eyebrow({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "onDark";
}) {
  const color = tone === "onDark" ? "text-sand-400" : "text-clay-600";
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${color}`}>
      {children}
    </p>
  );
}
