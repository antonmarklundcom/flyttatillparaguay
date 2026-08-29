import type { ReactNode } from "react";

type Width = "site" | "content";

/** Horisontell layoutram. `content` = läsbredd för brödtext. */
export function Container({
  children,
  width = "site",
  className = "",
}: {
  children: ReactNode;
  width?: Width;
  className?: string;
}) {
  const max = width === "content" ? "max-w-[46rem]" : "max-w-[76rem]";
  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-8 ${className}`}>{children}</div>
  );
}
