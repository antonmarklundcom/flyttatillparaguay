import Link from "next/link";

import { strings } from "@content/strings";

import { NewsletterForm } from "@/components/forms/NewsletterForm";
import {
  contactEmail,
  footerLegalNav,
  mainNav,
  whatsappUrl,
} from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-forest-950 text-sand-300">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-md">
            <p className="font-display text-xl text-sand-50">
              {strings.newsletter.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{strings.newsletter.body}</p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Sidfotsmeny">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
              {strings.footer.navTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-sand-50">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
              {strings.footer.contactTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sand-50"
                >
                  {strings.cta.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:text-sand-50">
                  {contactEmail}
                </a>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-sand-50">
                  Kontaktsidan
                </Link>
              </li>
            </ul>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
              {strings.footer.legalTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {footerLegalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-sand-50">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-sand-100/10 pt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-sand-400">
            {strings.footer.about}
          </p>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-sand-500">
            {strings.footer.disclaimer}
          </p>
          <p className="mt-6 text-xs text-sand-500">
            © {year} {strings.brand.name}. {strings.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
