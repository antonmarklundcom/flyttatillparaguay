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
