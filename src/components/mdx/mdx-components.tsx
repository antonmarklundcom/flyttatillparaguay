import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Komponenter som är tillgängliga inuti MDX-guider.
 *
 * Brödtextens typografi kommer från `.prose` i globals.css — mappa därför
 * bara det som behöver bete sig annorlunda än ren HTML.
 */

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/** Faktaruta för siffror och snabba påståenden (plan.md §3D). */
function Fakta({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-lg border border-sand-300 bg-sand-200/70 p-5">
      {title ? (
        <p className="font-display text-lg text-ink-900">{title}</p>
      ) : null}
      <div className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700 [&>*+*]:mt-3">
        {children}
      </div>
    </aside>
  );
}

/** Disclaimer-ruta — används för skatt, juridik och säkerhet (plan.md §3A). */
function Notis({ children }: { children: ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-lg border-l-4 border-clay-400 bg-clay-50 py-4 pl-5 pr-5 text-[0.9375rem] leading-relaxed text-ink-700">
      {children}
    </aside>
  );
}

export const mdxComponents = {
  a: MdxLink,
  Fakta,
  Notis,
};
