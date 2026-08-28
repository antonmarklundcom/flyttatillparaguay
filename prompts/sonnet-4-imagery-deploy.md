# Phase sonnet-4 — Bilder, polish & deploy. Paste into a fresh SONNET session, ONLY after sonnet-3 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`. Execute plan §6.2
under the autonomy protocol §4. Build nothing outside the plan.

HARD LIMITS (§4.7): no changes to design tokens, layout system, lead API route, MDX pipeline,
URL structure, or package structure. Need a change ⇒ workaround + Backlog note in plan §10.

Phase rules:
- Branch `phase/sonnet-4` off latest main. sonnet-3 unmerged ⇒ finish it first.
- Load skills at the matching step: `higgsfield-web-imagery` (full pipeline: style Element, budgeted model choice, scripted fetch/convert/place — never hand-edit filenames/alt), `nextjs-deploy-hostinger` (deploy), `gbp-optimizer` (closing-report checklist only).
- Never generate an AI portrait of Anton or his girlfriend — real photos are a §7 human input; leave a documented placeholder slot.
- Performance before beauty: images sized/optimized so home + `/residency` hit Lighthouse mobile ≥90.
- Deploy per the deploy skill; missing Hostinger/DNS access does not block the build — document exact numbered steps instead (§4.5).
- Re-runnable; minor issues → KNOWN-ISSUES.md; stop only per §4.4.

Exit: build green; no empty image slots except documented §7 dependencies; OG images + favicon + 404 page in place; Lighthouse mobile ≥90 performance on home and `/residency`; site live on a Hostinger URL (or exact deploy steps documented if access missing); PR merged green.

## After this phase — STOP
Final phase: spawn NO new session. Pass the four §4.9 gates (merge, exit checklist, pre-handoff audit, build-log entry), then end with the closing report: live URLs; §7 human-inputs checklist with exact numbered manual steps (DNS, VenderCRM key, WhatsApp number, real prices replacing TODO-ANTON, Anton's photos); a short GBP recommendation; and a suggestion to create a project skill (like `propia-dev`) capturing final routes, content model and do-not-touch guardrails.
