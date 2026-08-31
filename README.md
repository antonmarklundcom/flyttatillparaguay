# flyttatillparaguay.se

Svensk innehålls- och leadgen-sajt för residency i Paraguay. Next.js (App Router),
TypeScript, Tailwind v4, MDX-innehåll i repot. Ingen databas och ingen auth i v1.

Byggplanen styr allt arbete: läs `plan.md` (särskilt §4 autonomiprotokollet och
§9 byggloggen) före varje ändring. Fasprompter ligger i `prompts/`.

## Kom igång

```bash
npm install
cp .env.example .env.local   # fyll i det du har; sajten fungerar även utan
npm run dev
```

## Miljövariabler

Se `.env.example`. Inget värde är blockerande: utan `VENDERCRM_API_KEY` kör
lead-routen i degraded mode — inskicket loggas på servern och besökaren tackas ändå.
`VENDERCRM_API_KEY` får **aldrig** ha `NEXT_PUBLIC_`-prefix.

## Innehåll

| Var | Vad |
|---|---|
| `content/guider/<slug>.mdx` | Guider. Frontmatter valideras vid bygge. |
| `content/stader/<slug>.mdx` | Ortsprofiler under `/livet-i-paraguay/<slug>`. |
| `content/packages.ts` | Tjänstepaket (typad). |
| `content/strings.ts` | All UI-copy — förbereder engelsk version. |
| `content/site.ts` | Domän, navigation, WhatsApp-nummer. |

`draft: true` döljer innehåll i produktionsbygget och sätter `noindex` på sidan.

## Deploy

Hostinger managed Node.js med GitHub-integration, `npm run build` / `npm start`.
Detaljer och fallgropar: skillen `nextjs-deploy-hostinger`. Sker i fas sonnet-4.
