# Known issues

Mindre, icke-blockerande problem loggas här enligt autonomiprotokollet
(plan.md §4.3). Blockerande saker stannar i stället sessionen enligt §4.4.

## Öppna

### 1. Nyhetsbrevet kräver telefonnummer
**Fas:** opus-1 · **Påverkar:** `NewsletterForm`, formId `nyhetsbrev`

VenderCRM använder telefonnumret som kontaktidentitet — en inskickning utan
`phone` kan inte bli en kontakt (422 från `/api/v1/leads`). "Paraguay-brevet"
frågar därför efter både e-post och telefon, och positioneras som ett brev som
går ut på mejl och WhatsApp. Det ligger i linje med att hela sajten är
WhatsApp-first, men höjer tröskeln jämfört med en ren e-postfångst.

*Alternativet vore att tyst slänga e-post-utan-telefon, vilket är sämre.*
En ren e-postlista kräver en egen lagring — det ligger redan i backloggen
(plan.md §10, "Nyhetsbrevsmotor/sekvenser"). Rör inte lead-routen för att
lösa det (§4.7).

### 2. WhatsApp-numret är en platshållare
**Fas:** opus-1 · **Påverkar:** varje CTA på sajten

`NEXT_PUBLIC_WHATSAPP_NUMBER` saknas, så `lib/site.ts` faller tillbaka på
`595000000000` och alla `wa.me`-länkar leder ingenstans. Det är en §7-input
från Anton. Sätt variabeln i miljön så slår den igenom överallt — ingen
kodändring behövs.

### 3. OG-bilden är genererad, inte fotografisk
**Fas:** opus-1 · **Påverkar:** `app/opengraph-image.tsx`

Sitewide-OG:n ritas vid byggtid ur design-tokens (typsnittet blir systemets
sans, inte Fraunces, eftersom `next/og` kräver inbäddade fontfiler). Den är
korrekt och delbar, men fas sonnet-4 ska ersätta den med riktiga bilder per
sida enligt §6.2.

### 4. Bildslottar är tomma platshållare
**Fas:** opus-1 · **Påverkar:** hero:er, hubbar, artikelkort, ortsprofiler

`ImageSlot` ritar en streckad ruta med den art direction som ska genereras när
`src` är `null`. Alla slottar går att hitta med:

```
grep -rn "ImageSlot" src/ | grep -v "components/ui/ImageSlot"
```

Det är fas sonnet-4:s jobb (§6.2). **Antons porträttslot på `/om` får aldrig
fyllas med en AI-genererad bild av honom** (§3D) — den väntar på ett riktigt
foto (§7).

## Lösta

*(inga än)*
