# flyttatillparaguay.se — byggplan

Svensk innehålls- och leadgen-sajt som säljer **residency i Paraguay** (huvudtjänst), med real estate/tomter som sekundär intäkt och ett livsstils-/Plan B-innehållsuniversum som driver organisk trafik och förtroende. Drivs av Anton Marklund, 34, svensk med paraguayansk flickvän — sajtens röst är hans.

**Fastabell**

| Fas | Modell | Promptfil | Plan-sektioner |
|-----|--------|-----------|----------------|
| opus-1 | Opus | `prompts/opus-1-foundation.md` | §5.1 |
| opus-2 | Opus | `prompts/opus-2-corepages.md` | §5.2 |
| sonnet-3 | Sonnet | `prompts/sonnet-3-content.md` | §6.1 |
| sonnet-4 | Sonnet | `prompts/sonnet-4-imagery-deploy.md` | §6.2 |

---

## §1. Beslut som redan är fattade — omprövas ALDRIG av byggsessioner

1. **Affärsmodell:** Tjänsteförsäljning av residency-paket är primär intäkt. Real estate = leadförmedling (ej egen listningsdatabas i v1). Innehållet säljer förtroende, inte annonser.
2. **Språk:** Sajten är enbart svensk i v1. Alla UI-strängar via central strängfil (`content/strings.ts`) så engelska kan läggas till senare. Kod/identifierare på engelska, URL:er på svenska (`/residency`, `/fastigheter`, `/livet-i-paraguay`, `/plan-b`, `/guider`, `/om`, `/kontakt`).
3. **Stack:** Next.js (App Router) på Hostinger managed Node.js enligt `nextjs-deploy-hostinger`. **Ingen egen databas och ingen auth i v1** — innehåll ligger i MDX i repot, leads går till VenderCRM enligt `vendercrm-lead-capture`. (Avvikelse från standardstacken medveten: en contentsajt behöver ingen MySQL; DB införs först om backloggen kräver det.)
4. **Leads:** Alla formulär → VenderCRM tenant-endpoint, WhatsApp-first CTA överallt. Saknad API-nyckel blockerar aldrig: degradera till loggning + `.env.example`-dokumentation.
5. **Real estate:** Länka/hänvisa till Antons befintliga kanaler (propia.com.py) och samla leads via formulär — bygg INTE listningsfunktionalitet i v1 (backlogg).
6. **Ton:** Positiv, konkret, personlig ("jag gjorde det här"). Plan B/frihet-vinkeln är möjlighetsorienterad, inte politiskt aggressiv eller domedag. Dejting/relationer och hälsa/kött/närproducerat är kryddor i livsstilsinnehållet, aldrig egna tjänster och aldrig i huvudnavigationen.
7. **Design:** Redaktionell premium — inte "myndighetssajt", inte "krypto-landing". Se §3D.
8. **Modeller:** Endast Opus och Sonnet i faserna. Fable används aldrig i byggfaser (se §4.8).

## §2. Roller & objektmodell

Ingen DB, ingen auth, inga roller i v1. Objektmodellen är filbaserad:

- **Guide/artikel:** MDX i `content/guider/<slug>.mdx` med frontmatter `{title, description, cluster, publishedAt, updatedAt, heroImage, faq?}`. Cluster-enum: `residency | ekonomi | livsstil | planb | fastigheter`.
- **Tjänstepaket:** typad array i `content/packages.ts` `{id, name, priceEur, includes[], excludes[], popular?}`.
- **Lead:** postas till VenderCRM (`source: "flyttatillparaguay.se"`, `formId` per formulär: `residency`, `fastigheter`, `kontakt`, `nyhetsbrev`).
- **Stad/ort-profil:** MDX i `content/stader/<slug>.mdx` (Asunción, Encarnación, Ciudad del Este, Areguá, San Bernardino).

## §3. Innehålls- & designplan (scope)

### 3A. Sidträd

- `/` — Hem: hero (löfte: "Residency i Paraguay — hela vägen, på svenska"), varför Paraguay (skatt 10 %, kostnadsläge, klimat, stabil residency), tjänstepaket-teaser, Antons story-teaser, process i 4 steg, social proof-yta, FAQ-teaser, CTA (WhatsApp + formulär).
- `/residency` — **money page**: process steg-för-steg, krav/dokument, tidslinje, paket & priser, vanliga frågor, riskavsnitt ("vad ingår inte"), CTA.
- `/fastigheter` — tomter & hus: varför mark i Paraguay, hur köp fungerar som utlänning, exempel-case, lead-formulär, hänvisning till propia.
- `/livet-i-paraguay` — livsstilshubb: levnadskostnader, säkerhet, klimat, mat/kött/närproducerat, hälsa & sjukvård, relationer/dejting & familjeliv (smakfullt, via Antons perspektiv), städer (5 ortsprofiler).
- `/plan-b` — frihetshubb: varför en Plan B, residency som försäkring, skatteperspektiv (med tydlig "ej skatterådgivning"-disclaimer), jämförelse Paraguay vs Panama/Portugal/Dubai.
- `/guider` — artikelindex filtrerbart per cluster; varje artikel `/guider/<slug>`.
- `/om` — Antons story: 34-årig svensk, flytten, paraguayansk flickvän, varför han hjälper andra. Förtroendesidan.
- `/kontakt` — WhatsApp-first + formulär.
- Legal: `/integritetspolicy`, `/villkor`.

### 3B. Artikelkluster (~32 titlar; rubriker+beskrivningar planeras i opus-2, brödtext skrivs i sonnet-3)

- **Residency (10):** komplett guide 2026; krav & dokument; tidslinje & kostnad; permanent vs temporär; apostille/dokument från Sverige; cedula-processen; skattehemvist & 183-dagar; att flytta med familj; vanliga misstag; efter beviljad residency — nästa steg.
- **Ekonomi (5):** levnadskostnader (verkliga siffror); skattesystemet 10/10/10; öppna bankkonto; ta med pengar/växla; driva bolag från Paraguay.
- **Livsstil (8):** en vanlig dag; köttkultur & asado; närproducerat & matkvalitet; sjukvård & försäkring; säkerhet ärligt talat; dejting & relationer som svensk i Paraguay; lära sig spanska/guaraní; klimat & årstider.
- **Plan B (4):** därför behöver du en Plan B; Paraguay vs alternativen; vad du INTE flyr ifrån (förväntningar); dubbelt boende Sverige–Paraguay.
- **Fastigheter (5):** köpa tomt som utlänning; priser per region; bygga hus — kostnad & process; fallgropar vid markköp; arrende & avkastning.

### 3C. Konvertering

Primär CTA: WhatsApp. Sekundär: formulär → VenderCRM. Varje guide slutar i cluster-relevant CTA-block. Nyhetsbrevsfångst ("Paraguay-brevet") i footer + artikelslut → VenderCRM som kontakt med tagg. Sticky mobil-CTA på money pages.

### 3D. Designriktning

- **Känsla:** varm, redaktionell, premium-personlig. Solljus, jord, grönska — inte tropisk klyscha, inte konsult-korporativ.
- **Palett:** djup skogsgrön (primär), terracotta (accent/CTA), varm cream-bakgrund, mörkbrun text. Definieras som tokens i fas opus-1.
- **Typografi:** serif display för rubriker (redaktionell tyngd), ren sans för brödtext. Google Fonts, self-host-fallback per Hostinger-praxis.
- **Layoutmönster** (från `nextjs-national-lead-gen`-menyn): split-hero med stort foto, bento-grid för "varför Paraguay", numrerad processtidslinje, redaktionella artikelkort, faktarutor/stat-rader (10 % skatt, kostnadsjämförelser).
- **Bilder:** fotorealistiskt via `higgsfield-web-imagery` i fas sonnet-4 — golden hour, Paraguay-miljöer, en konsekvent stil-Element. Antons riktiga porträtt är human input (§7); AI-porträtt av honom görs aldrig.
- **Motion:** subtil (fade/parallax vid scroll), aldrig på bekostnad av LCP.

## §4. Autonomiprotokoll (gäller varje byggsession)

1. Arbeta tills fasens exit-kriterier passerar; fråga aldrig om lov för arbete som står i planen.
2. En PR per fas: branch `phase/<id>` från senaste main; skapa, bevaka och mergea PR:en grön. Röd build är alltid sessionens eget jobb. Starta aldrig ovanpå en omergad föregående fas.
3. Mindre icke-blockerande problem → `KNOWN-ISSUES.md`, fortsätt bygga.
4. Stanna och fråga ENDAST vid: saknad credential utan graceful fallback, eller ett foundationsbeslut (informationsarkitektur, lead-flöde, prissättningsstruktur) där fel gissning tvingar omskrivning. Allt annat: välj rimligt, logga i byggloggen, fortsätt.
5. Saknade env-värden blockerar aldrig: dokumentera i `.env.example`, degradera snyggt.
6. Varje fasprompt är omkörningsbar: kolla först vad som redan finns på branchen, fortsätt från första ouppfyllda exit-kriteriet.
7. Sonnet-fasernas hårda gränser: inga ändringar i layoutsystem, design-tokens, lead-API-route, MDX-pipeline eller URL-struktur. Workaround + backlogg-notis i stället.
8. **Modellkostnadsspärr:** Fable (`claude-fable-5`/Mythos) används ALDRIG för byggfaser, subagenter eller spawnade sessioner. Fastabellen nämner endast Opus och Sonnet. Tror en session att Fable behövs: stanna och fråga Anton med motivering.
9. **Fas-handoff, fyra grindar:** PR mergad grön; exit-checklistan passerad; pre-handoff-audit gjord (kör om build/verify, läs din egen mergade diff adversariellt, fixa fynd); bygglogg-post committad. Spawna sedan nästa fas som NY session via claude-code-remote `create_session`: ärv miljö och permission mode (aldrig `plan`), sätt `model` enligt fastabellen, `prompt` exakt `Read prompts/<nästa-fil>.md in this repo and execute it.` Avsluta med fasrapport. Saknas `create_session` (lokal CLI): fortsätt i samma fönster om samma modell; stanna och rapportera vid modellbyte.
10. **Bygglogg:** före merge, lägg en daterad 5–10-raders post i §9 — fas + PR, vad som nu finns, beslut/avvikelser, var nästa fas ska titta först. Nya sessioner orienterar sig ENBART från plan.md + §9 + KNOWN-ISSUES.md.

## §5. Opus-faser

### §5.1 opus-1 — Foundation & designsystem

Skills att ladda: `nodejs-mysql-hostinger-stack` (mönster, ej DB), `nextjs-deploy-hostinger`, `nextjs-national-lead-gen`, `vendercrm-lead-capture`.

- Scaffolda Next.js App Router (TypeScript, Tailwind), byggbart för Hostinger enligt deploy-skillen från commit 1.
- Design-tokens (§3D: palett, typografi, spacing, radius) + komponentbibliotek: header/nav, footer, split-hero, bento-grid, processtidslinje, stat-rad, artikelkort, FAQ-accordion, CTA-block (WhatsApp + formulär), sticky mobil-CTA.
- MDX-pipeline: `content/guider/` + `content/stader/` läses till statiska sidor med frontmatter enligt §2; cluster-enum typad.
- Lead-API-route enligt `vendercrm-lead-capture` med graceful degradering utan API-nyckel; `.env.example` komplett.
- Alla routes i §3A som skelett (rätt URL:er, layout, placeholderinnehåll), metadata-/OG-grund, sitemap/robots-generering.
- Central strängfil för UI-copy.

**Exit:** `npm run build` grön; alla §3A-routes svarar; en test-MDX-guide renderas med frontmatter, FAQ-block och CTA; lead-route returnerar ok i degraded mode utan nyckel och payload matchar VenderCRM-kontraktet; tokens/komponenter demonstrerade på hemsidans skelett; PR mergad.

### §5.2 opus-2 — Money pages & innehållsarkitektur

Skills: `nextjs-national-lead-gen`, `vendercrm-lead-capture`.

- Skriv FULLT innehåll (svensk copy, Antons röst enligt §1.6) för: hemsidan, `/residency` inkl. paketstruktur i `content/packages.ts` (3 paket; sätt rimliga platshållarpriser i EUR, markerade `TODO-ANTON` i §7), `/om`, `/kontakt`, `/plan-b`-hubbsidan, legal-sidorna.
- Definiera hela artikelarkitekturen: skapa alla ~32 MDX-filer från §3B med färdig frontmatter (titel, beskrivning, cluster, intern länkplan) men med kort utkast-stub som body, taggade `draft: true` så de inte indexeras förrän sonnet-3 skriver dem.
- Strukturerad data (Organization, FAQPage, Article-grund), interna länkregler hubb↔guide↔money page.
- Koppla alla formulär + nyhetsbrev till lead-routen med rätt `formId`.

**Exit:** build grön; money pages har komplett copy utan lorem; 32 MDX-stubbar med giltig frontmatter och draft-flagga; FAQPage/Organization-schema validerar; formulär postar med rätt formId; PR mergad. **Modellbyte:** nästa fas spawnas på Sonnet.

## §6. Sonnet-faser

Hårda gränser enligt §4.7: rör inte tokens, layoutsystem, lead-route, MDX-pipeline, URL-struktur, paketstruktur.

### §6.1 sonnet-3 — Innehållsproduktion

Skills: `nextjs-national-lead-gen` (SEO-delen).

- Skriv färdig brödtext för alla 32 guider + 5 ortsprofiler enligt frontmatter-planen: 800–1500 ord/guide, Antons röst, konkreta siffror med "uppskattning 2026"-markering, FAQ-block per guide, interna länkar enligt opus-2:s länkplan, cluster-CTA i slutet. Ta bort `draft: true` per färdig artikel.
- Känsliga ämnen (dejting/relationer, säkerhet, skatt): personligt, respektfullt, disclaimers där §3A kräver.
- `/guider`-index med clusterfilter fungerar med fullt innehåll; `/livet-i-paraguay` länkar alla ortsprofiler.

**Exit:** build grön; 0 kvarvarande draft-flaggor; ingen guide under 800 ord; alla interna länkar validerar (inga 404); sitemap innehåller alla artiklar; PR mergad.

### §6.2 sonnet-4 — Bilder, polish & deploy

Skills: `higgsfield-web-imagery`, `nextjs-deploy-hostinger`, `gbp-optimizer` (endast checklistan i slutrapporten).

- Generera och placera bildslottar via higgsfield-skillens pipeline: hero:er, hubbsidor, artikelbilder (stil-Element för konsekvens); Antons porträttslot lämnas som dokumenterad platshållare tills riktig bild finns (§7).
- OG-bilder, favicon, prestanda (LCP/CLS), tillgänglighetspass, 404-sida.
- Deploya till Hostinger enligt deploy-skillen; koppla domänen flyttatillparaguay.se om DNS-åtkomst finns, annars dokumentera exakta steg i slutrapporten.

**Exit:** build grön; inga tomma bildslottar (utom dokumenterade §7-beroenden); Lighthouse mobil ≥90 performance på hem + `/residency`; sajten live på Hostinger-URL; PR mergad. **STOPP:** sista fasen — skriv slutrapport (live-URL:er, §7-checklista med numrerade manuella steg, GBP-rekommendation), spawna ingen ny session.

## §7. Human inputs — endast Anton kan leverera

| Input | Behövs först i fas |
|---|---|
| Hostinger-konto/slot + SSH enligt deploy-skillen | sonnet-4 |
| DNS för flyttatillparaguay.se → Hostinger | sonnet-4 |
| VenderCRM tenant-API-nyckel | opus-1 (degraderar tills den finns) |
| WhatsApp-nummer för CTA | opus-2 (platshållare tills dess) |
| Riktiga paketpriser (ersätt TODO-ANTON) | opus-2 → före lansering |
| Porträttfoton på Anton (+ ev. parbilder) | sonnet-4 |
| Higgsfield-krediter tillgängliga | sonnet-4 |

## §8. Öppna affärsfrågor (parkerade — ej byggarbete)

- Exakt prissättning och vad som ingår per paket; betalningsflöde (faktura? förskott?).
- Juridisk partner i Paraguay att namnge, eller anonymt "vårt lokala team"?
- Ska dejting/relationer-innehållet expanderas eller tonas ned efter feedback?
- Engelsk (eller norsk/dansk/tysk) version — när?

## §9. Bygglogg & handoff

### 2026-08-31 — opus-1 (Foundation & designsystem)

- **Fas:** opus-1, branch `claude/steg-2-qtsqtc` (sessionens tilldelade branch i stället för `phase/opus-1`).
- **Vad finns nu:** Next.js 15 App Router + TypeScript + Tailwind v4, byggbart för Hostinger
  (`npm run build` / `npm start`). Designtokens (§3D) i `app/globals.css` som `@theme` —
  skogsgrön/terracotta/cream, Fraunces + Inter via `next/font`. Komponentbibliotek i
  `components/`: header/nav, footer, split-hero, bento-grid, processtidslinje, stat-rad,
  artikelkort, FAQ-accordion, CTA-block, sticky mobil-CTA, lead- och nyhetsbrevsformulär,
  `ImageSlot` för tomma bildslottar. MDX-pipeline i `lib/content.ts` (frontmatter valideras
  vid bygge, `draft: true` döljs i produktion och sätter noindex). Lead-route
  `app/api/lead/route.ts` + `lib/vendercrm.ts`. Alla §3A-routes som skelett, `sitemap.ts`,
  `robots.ts`, `lib/seo.ts` (canonical/OG + Organization/FAQPage/Article-schema),
  `content/strings.ts` för all UI-copy.
- **Beslut/avvikelser:** Ortsprofilerna ligger på `/livet-i-paraguay/<slug>` (§3A angav ingen
  URL). `/tack` tillagd som kvittenssida (noindex). Ingen typography-plugin — brödtext styrs av
  `.prose-editorial` i globals.css, som är kontraktet mellan MDX och designsystemet.
  Lead-routen kvitterar alltid `ok` mot besökaren; fel loggas serverside (skill-regel 5).
- **Verifierat:** build grön, alla routes 200 (404 för okänd URL), lead-route degraded mode
  loggar korrekt payload utan nyckel, Article/FAQPage/Organization-schema renderas, sitemap
  innehåller 11 URL:er inkl. testguiden.
- **Nästa fas (opus-2) tittar först på:** `content/strings.ts` + `content/packages.ts` (copy och
  paketstruktur), `app/residency/page.tsx` (money page-skelettet som ska fyllas), `lib/content.ts`
  för frontmatter-kontraktet innan de 32 MDX-stubbarna skapas, och `KNOWN-ISSUES.md`.

### 2026-09-07 — opus-2 (Money pages & innehållsarkitektur)

- **Fas:** opus-2, branch `claude/opus-2-corepages-prompt-yxrauf` (sessionens tilldelade branch
  i stället för `phase/opus-2`).
- **Vad finns nu:** Färdig svensk copy i Antons röst på hemsidan, `/residency` (process, krav
  och dokument, paket, ett eget "det här ingår inte"-avsnitt, riskavsnitt, 8 FAQ), `/om`
  (hela storyn + fyra principer), `/kontakt`, `/plan-b` (hubb med jämförelsetabell Paraguay/
  Panama/Portugal/Dubai och tre myter), `/integritetspolicy` och `/villkor` — samt, utöver
  planens lista, `/fastigheter` och `/livet-i-paraguay`, som annars hade legat kvar med
  platshållartext eftersom ingen senare fas äger dem. Ingen lorem finns kvar på sajten.
  Innehållsarkitekturen är på plats: 32 guide-stubbar i `content/guider/` och 5 ortsprofiler
  i `content/stader/`, alla med giltig frontmatter, `relatedSlugs`-länkplan och `draft: true`,
  och med vinkel, sökintention, disposition och länkplan i brödtexten. `NewsletterPanel`
  tillagd i `components/blocks.tsx` och placerad i artikelslutet (plan §3C).
- **Beslut/avvikelser:** opus-1:s testguide `exempelguide-residency.mdx` är borttagen — den
  kannibaliserade `residency-i-paraguay-komplett-guide` och pipelinen bevisas nu av de riktiga
  filerna. `organizationSchema()` är uppgraderad till `ProfessionalService` (subtyp av
  Organization) med adress, kontaktpunkt och språk; `breadcrumbSchema()` tillagd och använd på
  guidesidorna. Paketstrukturen behölls från opus-1, copyn skrevs om, priserna kvar som
  `TODO-ANTON`. Skatteinnehåll bär `strings.disclaimers.tax`; Plan B-sidan är
  möjlighetsorienterad och dejting/relationer ligger kvar i livsstilsklustret, inte i navet.
- **Verifierat:** `npm run build` grön, alla 13 kontrollerade routes 200 i produktionsläge,
  251 interna länkar validerade utan en enda 404, JSON-LD parsar på hem/`/residency`/guide
  (FAQPage, ProfessionalService, Article, BreadcrumbList), draft-guider får
  `noindex, nofollow` och hålls utanför sitemap (10 URL:er), och lead-routen kvitterar `ok`
  med rätt `source`/`fields.formId` för alla fyra formId: `residency`, `fastigheter`,
  `kontakt`, `nyhetsbrev` (honeypot tyst, saknad telefon 422).
- **Nästa fas (sonnet-3) tittar först på:** en godtycklig fil i `content/guider/` — varje stub
  innehåller vinkel, sökintention, disposition och länkplan som är hela uppdraget. Därefter
  `content/strings.ts` (röst och disclaimers), `components/mdx.tsx` (vilka komponenter som får
  användas i MDX) och `KNOWN-ISSUES.md`. Rör inte tokens, layout, lead-route, MDX-pipeline
  eller URL-struktur (§4.7).

## §10. Backlogg

- Egen fastighetslistning med DB (då: `nodejs-mysql-hostinger-stack` fullt ut).
- Nyhetsbrevsmotor/sekvenser; bokningskalender för konsultationssamtal.
- Engelsk språkversion; community/medlemsdel; kundcase/testimonials-sektion när riktiga case finns.
- YouTube/IG-integration av Antons innehåll.
