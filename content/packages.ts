/**
 * Tjänstepaket (plan.md §2).
 *
 * Fas opus-1 lägger typ + struktur och tre platshållarpaket så att
 * /residency kan renderas. Fas opus-2 skriver den riktiga paketcopyn och
 * sätter rimliga platshållarpriser; de RIKTIGA priserna är en §7-input
 * från Anton och är markerade TODO-ANTON tills dess.
 */

export type ServicePackage = {
  id: string;
  name: string;
  /** Kort löfte — vem paketet är för. */
  summary: string;
  /** Pris i EUR. `null` = "offert"/ej satt än. */
  priceEur: number | null;
  /** true tills Anton bekräftat priset (plan.md §7). */
  priceIsPlaceholder: boolean;
  includes: string[];
  excludes: string[];
  popular?: boolean;
};

export const packages: ServicePackage[] = [
  {
    id: "start",
    name: "Start",
    summary: "För dig som vill ha kartan innan du bestämmer dig.",
    priceEur: null,
    priceIsPlaceholder: true,
    includes: [
      "Genomgångssamtal om din situation",
      "Dokumentlista anpassad efter Sverige",
      "Tidsplan och budget för din ansökan",
    ],
    excludes: ["Myndighetsavgifter", "Apostille och översättningar", "Resa och boende"],
  },
  {
    id: "komplett",
    name: "Komplett",
    summary: "Hela residency-processen, från dokument till cedula.",
    priceEur: null,
    priceIsPlaceholder: true,
    includes: [
      "Allt i Start",
      "Förberedelse och kontroll av samtliga dokument",
      "Lokalt team på plats i Asunción",
      "Följe till myndigheter under besöket",
      "Uppföljning fram till beviljad residency",
    ],
    excludes: ["Myndighetsavgifter", "Apostille och översättningar", "Resa och boende"],
    popular: true,
  },
  {
    id: "familj",
    name: "Familj",
    summary: "Samma sak, men för hela hushållet på en gång.",
    priceEur: null,
    priceIsPlaceholder: true,
    includes: [
      "Allt i Komplett för samtliga familjemedlemmar",
      "Hantering av vigsel- och födelsebevis",
      "Vägledning kring skola och sjukvård",
    ],
    excludes: ["Myndighetsavgifter", "Apostille och översättningar", "Resa och boende"],
  },
];

export function getPackage(id: string): ServicePackage | undefined {
  return packages.find((p) => p.id === id);
}
