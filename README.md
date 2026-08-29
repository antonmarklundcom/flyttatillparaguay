# flyttatillparaguay.se

Svensk innehålls- och leadgen-sajt som säljer residency i Paraguay.
Next.js (App Router) + TypeScript + Tailwind v4. **Ingen databas, ingen auth** —
innehållet ligger som MDX i repot och leads går till VenderCRM.

Bygget styrs av [`plan.md`](./plan.md). Läs den, §9 (byggloggen) och
[`KNOWN-ISSUES.md`](./KNOWN-ISSUES.md) innan du ändrar något.

## Kom igång

```bash
npm install
cp .env.example .env.local   # inget värde är obligatoriskt — allt degraderar snyggt
npm run dev
```

## Kommandon

| Kommando | Gör |
|---|---|
| `npm run dev` | Utvecklingsserver. Utkast (`draft: true`) syns här men aldrig i produktion. |
| `npm run build` | Produktionsbygge. Ska alltid vara grönt före en merge. |
| `npm start` | Kör produktionsbygget (det Hostinger använder). |
| `npm run lint` | ESLint. |

## Var saker ligger

```
content/strings.ts        All UI-copy. Ny text hamnar här, inte i komponenterna.
content/packages.ts       Tjänstepaketen.
content/guider/*.mdx      Artiklar. Frontmatter-kontraktet: src/lib/content.ts
content/stader/*.mdx      Ortsprofiler.
src/app/globals.css       Design-tokens. Ändras inte efter fas opus-1.
src/components/           Komponentbiblioteket.
src/lib/lead.ts           Ett ställe där alla lead bearbetas.
src/lib/vendercrm.ts      CRM-klienten. Nyckeln lämnar aldrig servern.
```

## Lead-flödet

Formulär → server action (`src/app/actions/lead.ts`) → `processLead` →
VenderCRM. `/api/lead` är samma väg för programmatiska inskick.

Saknas `VENDERCRM_URL` eller `VENDERCRM_API_KEY` går routen i **degraderat
läge**: formuläret fungerar, besökaren ser sin bekräftelse, och payloaden loggas
på servern i stället för att skickas. Inget lead går förlorat.

## Deploy

Hostinger managed Node.js via GitHub-integrationen: build `npm run build`,
start `npm start`, miljövariabler i hPanel. Ändrade miljövariabler kräver en
**ny deploy** — omstart räcker inte. Detaljerna finns i skillen
`nextjs-deploy-hostinger`.
