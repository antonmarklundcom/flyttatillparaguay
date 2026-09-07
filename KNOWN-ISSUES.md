# Known issues

Mindre, icke-blockerande problem enligt autonomiprotokollet §4.3.

## Öppna

- **OG-bild saknas** (`/og/default.png`). `lib/seo.ts` pekar på den som standard; filen
  genereras i fas sonnet-4 tillsammans med övriga bildslottar. Tills dess ger delning
  ingen förhandsbild. Upptäckt: opus-1.
- **Favicon saknas.** Läggs i fas sonnet-4. Upptäckt: opus-1.
- **Alla bildslottar är rutade platshållare** (`ImageSlot`). Avsiktligt — fylls i sonnet-4.
  Antons porträttslot väntar på riktigt foto (plan §7), aldrig AI-genererat.
- **`vc-attribution.js` inte inlagd.** First-touch-attribution läses redan server-side ur
  cookien `vc_attr`, men skriptet som sätter cookien kan inte laddas förrän `VENDERCRM_URL`
  finns. Lägg `<Script src="{VENDERCRM_URL}/vc-attribution.js" />` i `app/layout.tsx` när
  nyckeln kommer. Upptäckt: opus-1.
- **`/guider` renderas dynamiskt** eftersom clusterfiltret läser `searchParams`. Innehållet
  är statiskt och sidan är snabb, men den prerenderas inte. Kan bytas mot statiska
  `/guider/[cluster]`-routes om det behövs — kräver URL-beslut, alltså inte en sonnet-fas.
  Upptäckt: opus-1.
- **WhatsApp-numret är en platshållare** (`595000000000` i `content/site.ts`). Alla
  WhatsApp-CTA:er går därför ingenstans tills Anton lämnar det riktiga numret (plan §7).
  Byt värdet på ett ställe, eller sätt `NEXT_PUBLIC_WHATSAPP_NUMBER`. Upptäckt: opus-2.
- **Paketpriserna är riktmärken** (`TODO-ANTON` i `content/packages.ts`). Sidorna säger
  uttryckligen att kunden får en skriftlig offert, så de kan ligga live — men de ska bytas
  före lansering. Upptäckt: opus-2.
- **Legal-sidorna är skrivna av mig, inte av jurist.** `/integritetspolicy` och `/villkor`
  täcker det som faktiskt sker på sajten (GDPR-grunder, tredjelandsöverföring till Paraguay,
  ångerrätt, ansvarsbegränsning), men bör granskas innan lansering. Upptäckt: opus-2.
- **`/guider/[slug]` och `/livet-i-paraguay/[stad]` prerendereras inte i produktion** eftersom
  alla poster ännu är `draft: true` — `generateStaticParams` returnerar tom lista. Löser sig
  av sig självt när sonnet-3 tar bort draft-flaggorna. Upptäckt: opus-2.
- **Berättande detaljer på `/om` och typfallen på `/fastigheter` är skrivna av mig, inte
  dikterade av Anton.** De följer planens beskrivning av hans historia (§1, §3A) men innehåller
  detaljer han måste läsa igenom och rätta innan lansering. Typfallen på `/fastigheter` är
  uttryckligen märkta som konstruerade exempel, inte kundcase — riktiga case ligger i
  backloggen (§10) tills kunder sagt ja. Upptäckt: opus-2 (pre-handoff-audit).
