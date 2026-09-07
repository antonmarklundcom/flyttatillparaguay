/**
 * Tjänstepaket (plan §2). Strukturen är fastställd i opus-1, copyn skriven i opus-2.
 * Priserna är rimliga platshållare tills Anton sätter riktiga (plan §7) — TODO-ANTON.
 * De visas som riktmärken; kunden får alltid en skriftlig offert innan köp.
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
    priceEur: 690, // TODO-ANTON: riktigt pris innan lansering
    includes: [
      "Genomgångssamtal om din situation, 45 minuter",
      "Skriftlig bedömning med tidslinje och total kostnad",
      "Dokumentlista anpassad efter svenska myndigheter, i rätt ordning",
      "Checklista för apostille och auktoriserad översättning",
      "En avstämning per e-post när du samlat ihop dina handlingar",
    ],
    excludes: [
      "Ombud och jurist på plats i Paraguay",
      "Bokning av myndighetsbesök",
      "Myndighetsavgifter",
      "Resa och boende",
    ],
  },
  {
    id: "komplett",
    name: "Komplett",
    tagline: "Hela residencyprocessen, från första samtalet till cédula.",
    priceEur: 2450, // TODO-ANTON: riktigt pris innan lansering
    includes: [
      "Allt i Start",
      "Lokal jurist och ombud i Asunción som företräder dig",
      "Bokade myndighetsbesök under din vecka här — i rätt ordning",
      "Jag eller ombudet med i rummet som tolk",
      "Hjälp med bankkonto och RUC",
      "Hantering av eventuell komplettering utan extra arvode",
      "Support på svenska genom hela processen",
    ],
    excludes: ["Myndighetsavgifter", "Apostiller och översättningar i Sverige", "Resa och boende"],
    popular: true,
  },
  {
    id: "familj",
    name: "Familj",
    tagline: "Samma sak, men för hela hushållet — och samordnat till en resa.",
    priceEur: 3900, // TODO-ANTON: riktigt pris innan lansering
    includes: [
      "Allt i Komplett för två vuxna",
      "Barn under 18 inkluderade i ansökan",
      "Extra familjehandlingar: vigselbevis, födelsebevis, samtycken",
      "Alla ansökningar samordnade till samma vecka på plats",
      "Underlag och kontakter för skola och sjukvård",
    ],
    excludes: [
      "Myndighetsavgifter",
      "Apostiller och översättningar i Sverige",
      "Resa och boende",
      "Skolavgifter",
    ],
  },
];
