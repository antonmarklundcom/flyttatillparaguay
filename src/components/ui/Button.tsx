import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "accent" | "primary" | "outline" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  accent: "bg-clay-500 text-white hover:bg-clay-600",
  primary: "bg-forest-800 text-sand-50 hover:bg-forest-700",
  outline:
    "border border-forest-800/25 bg-transparent text-forest-800 hover:border-forest-800/50 hover:bg-forest-50",
  ghost: "text-forest-800 hover:bg-forest-50",
  onDark: "border border-sand-200/35 text-sand-100 hover:bg-sand-100/10",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-[0.9375rem]",
  lg: "px-6 py-3.5 text-base",
};

function classes(variant: Variant, size: Size, className: string) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "accent",
  size = "md",
  className = "",
  external,
  children,
  ...props
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >) {
  const cls = classes(variant, size, className);
  if (external) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "accent",
  size = "md",
  className = "",
  children,
  ...props
}: CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
