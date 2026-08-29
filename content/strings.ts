/**
 * Central strängfil för UI-copy (plan.md §1.2).
 *
 * ALL text som inte ligger i MDX ska hämtas härifrån — då kan en engelsk
 * version läggas till senare genom att duplicera objektet, utan att röra
 * en enda komponent.
 *
 * Fas opus-1 lägger platshållar-/strukturcopy. Fas opus-2 skriver den
 * riktiga säljande texten i Antons röst (plan.md §5.2).
 */

export const strings = {
  brand: {
    name: "Flytta till Paraguay",
    wordmark: "flyttatillparaguay",
    tagline: "Residency i Paraguay — hela vägen, på svenska",
  },

  nav: {
    openMenu: "Öppna meny",
    closeMenu: "Stäng meny",
    skipToContent: "Hoppa till innehåll",
    primaryCta: "Boka samtal",
  },

  cta: {
    whatsapp: "Skriv på WhatsApp",
    whatsappHint: "Snabbast svar — oftast samma dag.",
    form: "Skicka en förfrågan",
    formHint: "Föredrar du formulär? Jag hör av mig inom ett dygn.",
    readMore: "Läs mer",
    seeAllGuides: "Se alla guider",
    backToGuides: "Alla guider",
    stickyLabel: "Fri första kontakt",
    stickyAction: "WhatsApp",
  },

  form: {
    name: "Namn",
    phone: "Telefon",
    phoneHelp: "Med landsnummer, t.ex. +46 70 123 45 67",
    email: "E-post",
    emailOptional: "E-post (valfritt)",
    message: "Vad vill du veta?",
    submit: "Skicka",
    submitting: "Skickar …",
    required: "Obligatoriskt",
    honeypotLabel: "Lämna detta fält tomt",
    errorPhone: "Fyll i ett telefonnummer så att jag kan höra av mig.",
    errorGeneric:
      "Något gick fel när formuläret skickades. Skriv på WhatsApp så löser vi det direkt.",
    successTitle: "Tack — meddelandet är framme.",
    successBody:
      "Jag hör av mig så snart jag kan, oftast inom ett dygn. Vill du ha svar snabbare: skriv på WhatsApp.",
  },

  newsletter: {
    title: "Paraguay-brevet",
    body: "Ett brev då och då om residency, kostnader och livet här. Inget spam, avregistrera när du vill.",
    submit: "Prenumerera",
    successTitle: "Du är med.",
    successBody: "Nästa brev landar hos dig när det finns något värt att skicka.",
  },

  guides: {
    indexTitle: "Guider",
    indexIntro:
      "Allt jag hade velat läsa innan jag flyttade — residency, ekonomi, livsstil, Plan B och fastigheter.",
    allClusters: "Alla",
    empty: "Inga guider i den här kategorin än.",
    updatedPrefix: "Uppdaterad",
    readingSuffix: "min läsning",
    faqTitle: "Vanliga frågor",
    relatedTitle: "Läs vidare",
  },

  clusters: {
    residency: "Residency",
    ekonomi: "Ekonomi",
    livsstil: "Livsstil",
    planb: "Plan B",
    fastigheter: "Fastigheter",
  },

  cities: {
    indexTitle: "Städer och orter",
    indexIntro: "Fem platser som svenskar oftast landar i — och vad som skiljer dem åt.",
  },

  footer: {
    about:
      "Jag heter Anton, är 34 år, svensk och bor i Paraguay. Sajten finns för att göra flytten begriplig för fler.",
    navTitle: "Sajten",
    contactTitle: "Kontakt",
    legalTitle: "Juridiskt",
    disclaimer:
      "Innehållet på sajten är allmän information och personliga erfarenheter — inte juridisk, skatte- eller investeringsrådgivning.",
    rights: "Alla rättigheter förbehållna.",
  },

  notFound: {
    title: "Sidan finns inte",
    body: "Länken kan vara gammal eller feltajpad. Prova guiderna, eller hör av dig så pekar jag dig rätt.",
    action: "Till startsidan",
  },

  /** Platshållarnotis som syns i utvecklingsläge när en §7-input saknas. */
  placeholders: {
    image: "Bildslot — fylls i fas sonnet-4",
    copy: "Platshållartext — skrivs i fas opus-2",
  },
} as const;

export type Strings = typeof strings;
