/**
 * Sajtkonfiguration. Allt som en senare fas eller Anton kan behöva byta ut
 * på ETT ställe — bas-URL, kontaktvägar, huvudnavigation.
 *
 * WhatsApp-numret är en dokumenterad platshållare tills Anton levererar det
 * riktiga (plan.md §7). Sätt NEXT_PUBLIC_WHATSAPP_NUMBER i miljön så slår
 * det igenom överallt utan kodändring.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://flyttatillparaguay.se"
).replace(/\/$/, "");

/** Källa som skickas med varje lead till VenderCRM (plan.md §2). */
export const leadSource = "flyttatillparaguay.se";

/** TODO-ANTON (§7): ersätt med riktigt nummer i internationellt format. */
export const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "595000000000";

export const whatsappIsPlaceholder = !process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function whatsappUrl(message?: string): string {
  const digits = whatsappNumber.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hej@flyttatillparaguay.se";

export type NavItem = {
  href: string;
  label: string;
  description?: string;
};

/** Huvudnavigation. Dejting/hälsa hör aldrig hemma här (plan.md §1.6). */
export const mainNav: NavItem[] = [
  {
    href: "/residency",
    label: "Residency",
    description: "Hela processen, steg för steg — och vad det kostar.",
  },
  {
    href: "/fastigheter",
    label: "Fastigheter",
    description: "Tomter och hus: hur köp fungerar som utlänning.",
  },
  {
    href: "/livet-i-paraguay",
    label: "Livet i Paraguay",
    description: "Kostnader, säkerhet, mat, sjukvård och städerna.",
  },
  {
    href: "/plan-b",
    label: "Plan B",
    description: "Residency som försäkring — och hur Paraguay står sig.",
  },
  {
    href: "/guider",
    label: "Guider",
    description: "Alla artiklar, sorterade per ämne.",
  },
  {
    href: "/om",
    label: "Om Anton",
    description: "Vem som står bakom sajten och varför.",
  },
];

export const footerLegalNav: NavItem[] = [
  { href: "/integritetspolicy", label: "Integritetspolicy" },
  { href: "/villkor", label: "Villkor" },
];
