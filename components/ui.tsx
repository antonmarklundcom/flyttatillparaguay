import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-sm) px-5 py-3 text-sm font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-(--color-accent) text-white hover:bg-terracotta-600",
  secondary:
    "bg-(--color-brand) text-cream-50 hover:bg-forest-800",
  ghost:
    "border border-(--color-line) bg-transparent text-(--color-text) hover:bg-cream-200",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button className={`${buttonBase} ${buttonVariants[variant]} ${className}`} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={`${buttonBase} ${buttonVariants[variant]} ${className}`} {...props} />;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-accent)">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className="text-3xl leading-tight md:text-4xl">{title}</Tag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-(--color-text-muted) md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-(--radius-lg) border border-(--color-line) bg-(--color-surface-raised) p-6 shadow-(--shadow-card) ${className}`}
    >
      {children}
    </div>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 rounded-(--radius-sm) border-l-2 border-(--color-accent) bg-cream-200/60 px-4 py-3 text-sm text-(--color-text-muted)">
      {children}
    </p>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
