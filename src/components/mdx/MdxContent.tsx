import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "./mdx-components";

/**
 * Kompilerar och renderar MDX vid byggtid (alla sidor är statiskt genererade).
 *
 * @mdx-js/mdx används direkt i stället för ett wrapper-bibliotek — färre
 * peer-beroenden att hålla i takt med Next/React-versioner, och pipelinen
 * blir explicit för de faser som bara lägger till innehåll.
 */
export async function MdxContent({ source }: { source: string }) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });

  const { default: Content } = await run(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return <Content components={mdxComponents} />;
}
