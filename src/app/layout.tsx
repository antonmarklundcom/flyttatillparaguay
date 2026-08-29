import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";

import { strings } from "@content/strings";

import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

/**
 * Typografi enligt plan.md §3D: serif display för redaktionell tyngd,
 * ren sans för brödtext. next/font self-hostar filerna vid bygget, så
 * inget anrop går till Google i drift och det blir ingen layout-shift.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${strings.brand.name} — ${strings.brand.tagline}`,
    template: `%s · ${strings.brand.name}`,
  },
  description:
    "Residency, fastigheter och livet i Paraguay — på svenska, av någon som faktiskt bor här.",
  applicationName: strings.brand.name,
  authors: [{ name: "Anton Marklund" }],
  creator: "Anton Marklund",
  formatDetection: { telephone: false },
};

/**
 * First-touch-attribution (skillen vendercrm-lead-capture, regel 6).
 * Laddas bara när CRM-URL:en är konfigurerad — utan den finns inget skript
 * att hämta, och en 404 i varje sidladdning hjälper ingen.
 */
const attributionSrc = process.env.VENDERCRM_URL
  ? `${process.env.VENDERCRM_URL.replace(/\/$/, "")}/vc-attribution.js`
  : null;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sv"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-sand-50"
        >
          {strings.nav.skipToContent}
        </a>

        <noscript>
          {/* Se .fp-reveal i globals.css — scroll-avslöjandet kräver JS. */}
          <style>{".fp-reveal{opacity:1!important;animation:none!important}"}</style>
        </noscript>

        <SiteHeader />
        <main id="innehall" className="flex-1">
          {children}
        </main>
        <SiteFooter />

        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />

        {attributionSrc ? (
          <Script src={attributionSrc} strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
