"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { strings } from "@content/strings";

import { ButtonLink } from "@/components/ui/Button";
import { mainNav, whatsappUrl } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();

  // Menyn är öppen bara för den sida den öppnades på. Att härleda det ur
  // pathname i stället för att nollställa i en effekt gör att menyn stängs
  // vid navigering utan en extra renderomgång.
  const [openedFor, setOpenedFor] = useState<string | null>(null);
  const open = openedFor === pathname;
  const toggle = () => setOpenedFor(open ? null : pathname);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-300/70 bg-sand-100/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg leading-none tracking-tight text-forest-900"
        >
          {strings.brand.wordmark}
          <span className="text-clay-500">.se</span>
        </Link>

        <nav aria-label="Huvudmeny" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-md px-3 py-2 text-[0.9375rem] transition-colors ${
                      active
                        ? "text-forest-900"
                        : "text-ink-700 hover:text-forest-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrappern gör döljningen — `hidden` på knappen själv förlorar mot
              basklassen `inline-flex`, eftersom Tailwind sorterar
              display-utilities efter varandra och inte efter attributordning. */}
          <div className="hidden sm:block">
            <ButtonLink href={whatsappUrl()} external variant="accent">
              {strings.cta.whatsapp}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="mobil-meny"
            className="-mr-2 rounded-md p-2 text-forest-900 lg:hidden"
          >
            <span className="sr-only">
              {open ? strings.nav.closeMenu : strings.nav.openMenu}
            </span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  fill="none"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobil-meny"
          className="border-t border-sand-300 bg-sand-100 lg:hidden"
        >
          <nav aria-label="Meny" className="mx-auto max-w-[76rem] px-5 py-4 sm:px-8">
            <ul className="divide-y divide-sand-300">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block py-3.5">
                    <span className="font-display text-lg text-forest-900">
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="mt-0.5 block text-sm text-ink-500">
                        {item.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink
              href={whatsappUrl()}
              external
              variant="accent"
              size="lg"
              className="mt-5 w-full"
            >
              {strings.cta.whatsapp}
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
