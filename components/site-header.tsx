"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, whatsappUrl } from "@/content/site";
import { strings } from "@/content/strings";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-line) bg-(--color-surface)/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-(family-name:--font-display) text-lg font-semibold tracking-tight">
          Flytta till <span className="text-(--color-brand)">Paraguay</span>
        </Link>

        <nav aria-label="Huvudmeny" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-(--radius-xs) px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-(--color-brand)"
                    : "text-(--color-text-muted) hover:text-(--color-text)"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(strings.cta.whatsappMessage)}
            className="hidden rounded-(--radius-sm) bg-(--color-accent) px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-600 sm:inline-flex"
            rel="noopener"
          >
            {strings.cta.whatsapp}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? strings.nav.close : strings.nav.menu}
            onClick={() => setOpen((value) => !value)}
            className="rounded-(--radius-xs) border border-(--color-line) p-2 lg:hidden"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobilmeny" className="border-t border-(--color-line) lg:hidden">
          <ul className="container-page flex flex-col py-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-3 text-base font-medium">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/kontakt" className="block py-3 text-base font-medium text-(--color-brand)">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
