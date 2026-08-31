import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { strings } from "@/content/strings";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-(--color-surface-deep) text-cream-100">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="font-(family-name:--font-display) text-xl">Flytta till Paraguay</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-300">
            {strings.footer.tagline}
          </p>
          <div className="mt-8 max-w-sm">
            <p className="font-(family-name:--font-display) text-lg">{strings.newsletter.title}</p>
            <p className="mt-2 text-sm text-cream-300">{strings.newsletter.description}</p>
            <NewsletterForm className="mt-4" />
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-300">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-cream-200 hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-cream-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {strings.footer.rights}
          </p>
          <p>{site.email}</p>
        </div>
      </div>
    </footer>
  );
}
