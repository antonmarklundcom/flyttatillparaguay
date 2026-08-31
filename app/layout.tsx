import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/ui";
import { site } from "@/content/site";
import { strings } from "@/content/strings";
import { organizationSchema } from "@/lib/seo";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Flytta till Paraguay — residency, hela vägen, på svenska",
    template: "%s | Flytta till Paraguay",
  },
  description:
    "Residency i Paraguay för svenskar: process, dokument, kostnader och livet här. Guidat av Anton Marklund, som gjort resan själv.",
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#234634",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-(--radius-sm) focus:bg-(--color-brand) focus:px-4 focus:py-2 focus:text-cream-50"
        >
          {strings.nav.skipToContent}
        </a>
        <SiteHeader />
        <main id="innehall" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
