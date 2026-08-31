/**
 * Sajtkonfiguration. En sanning för domän, kontaktvägar och navigation.
 * URL:er är svenska (plan §1.2) — ändra dem aldrig i senare faser (§4.7).
 */

export const site = {
  name: "Flytta till Paraguay",
  domain: "flyttatillparaguay.se",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://flyttatillparaguay.se").replace(/\/$/, ""),
  locale: "sv_SE",
  lang: "sv",
  /** TODO-ANTON: riktigt WhatsApp-nummer (plan §7). */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "595000000000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hej@flyttatillparaguay.se",
  author: {
    name: "Anton Marklund",
    role: "Grundare",
  },
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/residency", label: "Residency" },
  { href: "/fastigheter", label: "Fastigheter" },
  { href: "/livet-i-paraguay", label: "Livet i Paraguay" },
  { href: "/plan-b", label: "Plan B" },
  { href: "/guider", label: "Guider" },
  { href: "/om", label: "Om Anton" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Tjänster",
    items: [
      { href: "/residency", label: "Residency i Paraguay" },
      { href: "/fastigheter", label: "Tomter & hus" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Läs mer",
    items: [
      { href: "/livet-i-paraguay", label: "Livet i Paraguay" },
      { href: "/plan-b", label: "Plan B" },
      { href: "/guider", label: "Alla guider" },
      { href: "/om", label: "Om Anton" },
    ],
  },
  {
    title: "Juridiskt",
    items: [
      { href: "/integritetspolicy", label: "Integritetspolicy" },
      { href: "/villkor", label: "Villkor" },
    ],
  },
];
