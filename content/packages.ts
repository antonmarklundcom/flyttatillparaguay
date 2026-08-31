/**
 * Tjänstepaket (plan §2). Strukturen är fastställd i opus-1.
 * Priser är platshållare tills Anton sätter riktiga (plan §7) — TODO-ANTON.
 */

export type Package = {
  id: string;
  name: string;
  tagline: string;
  priceEur: number;
  includes: string[];
  excludes: string[];
  popular?: boolean;
};

export const packages: Package[] = [
  {
    id: "start",
    name: "Start",
    tagline: "Du gör jobbet själv — jag ser till att du gör rätt.",
    priceEur: 690, // TODO-ANTON: riktigt pris
    includes: [
      "Genomgångssamtal om din situation",
      "Dokumentlista anpassad efter Sverige",
      "Checklista för apostille och översättning",
    ],
    excludes: ["Ombud på plats i Paraguay", "Myndighetsavgifter", "Resa och boende"],
  },
  {
    id: "komplett",
    name: "Komplett",
    tagline: "Hela residency-processen, från första samtal till cédula.",
    priceEur: 2450, // TODO-ANTON: riktigt pris
    includes: [
      "Allt i Start",
      "Lokal jurist och ombud i Asunción",
      "Bokade myndighetsbesök under din vecka här",
      "Hjälp med bankkonto och RUC",
      "Support på svenska genom hela processen",
    ],
    excludes: ["Myndighetsavgifter", "Resa och boende"],
    popular: true,
  },
  {
    id: "familj",
    name: "Familj",
    tagline: "Samma sak, men för hela hushållet.",
    priceEur: 3900, // TODO-ANTON: riktigt pris
    includes: [
      "Allt i Komplett för två vuxna",
      "Barn under 18 inkluderade",
      "Underlag för skola och sjukvård",
    ],
    excludes: ["Myndighetsavgifter", "Resa och boende", "Skolavgifter"],
  },
];
