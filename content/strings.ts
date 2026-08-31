/**
 * Central strängfil för UI-copy (plan §1.2).
 * All text som INTE är artikelinnehåll bor här, så att en engelsk version
 * senare bara behöver en parallell fil. Rör inte nycklarna — bara värdena.
 */

export const strings = {
  nav: {
    skipToContent: "Hoppa till innehåll",
    menu: "Meny",
    close: "Stäng",
    cta: "Boka samtal",
  },
  cta: {
    whatsapp: "Skriv på WhatsApp",
    whatsappMessage:
      "Hej Anton! Jag är intresserad av residency i Paraguay och vill veta mer.",
    form: "Skicka en förfrågan",
    readMore: "Läs mer",
    seeAll: "Se alla",
    backToGuides: "Tillbaka till guiderna",
  },
  form: {
    name: "Namn",
    phone: "Telefon (helst med WhatsApp)",
    phonePlaceholder: "+46 70 123 45 67",
    email: "E-post",
    message: "Din fråga",
    messagePlaceholder: "Berätta kort var du står idag.",
    submit: "Skicka",
    submitting: "Skickar …",
    success: "Tack! Jag hör av mig inom ett dygn.",
    error: "Något gick fel. Skriv till mig på WhatsApp så löser vi det direkt.",
    requiredPhone: "Fyll i ett telefonnummer så jag kan nå dig.",
    consent:
      "Genom att skicka godkänner du att jag kontaktar dig om din förfrågan. Se integritetspolicyn.",
  },
  newsletter: {
    title: "Paraguay-brevet",
    description:
      "Ett brev i månaden om residency, kostnadsläge och livet här. Inget spam, avsluta när du vill.",
    submit: "Prenumerera",
  },
  guides: {
    indexTitle: "Guider",
    allClusters: "Alla",
    empty: "Inga guider i den här kategorin ännu.",
    updated: "Uppdaterad",
    published: "Publicerad",
    faqTitle: "Vanliga frågor",
    relatedTitle: "Läs vidare",
    readingTime: "min läsning",
    draftBadge: "Utkast",
  },
  clusters: {
    residency: "Residency",
    ekonomi: "Ekonomi & skatt",
    livsstil: "Livsstil",
    planb: "Plan B",
    fastigheter: "Fastigheter",
  },
  disclaimers: {
    tax: "Det här är inte skatterådgivning. Din situation avgörs av Skatteverket och paraguayansk lag — stäm alltid av med en rådgivare innan du fattar beslut.",
    estimate: "Uppskattning 2026.",
  },
  footer: {
    tagline: "Residency i Paraguay — hela vägen, på svenska.",
    rights: "Alla rättigheter förbehållna.",
  },
  notFound: {
    title: "Sidan finns inte",
    description: "Länken är fel eller så har sidan flyttat — precis som du planerar att göra.",
    cta: "Till startsidan",
  },
  thanks: {
    title: "Tack — jag har fått din förfrågan",
    description:
      "Jag läser allt själv och svarar normalt inom ett dygn. Vill du gå snabbare, skriv direkt på WhatsApp.",
  },
} as const;
