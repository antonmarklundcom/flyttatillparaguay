import Link from "next/link";
import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Disclaimer } from "@/components/ui";
import { StatRow, CtaBlock, Faq } from "@/components/blocks";

/**
 * Komponenter som är tillgängliga inne i MDX. Senare faser får ANVÄNDA dem
 * men inte ändra kontraktet (autonomiprotokoll §4.7).
 */
const components = {
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} rel="noopener" {...props} />,
  Disclaimer,
  StatRow,
  CtaBlock,
  Faq,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-editorial">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
