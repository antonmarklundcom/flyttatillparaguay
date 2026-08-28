# Phase opus-2 — Money pages & innehållsarkitektur. Paste into a fresh OPUS session, ONLY after opus-1 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`. Execute plan §5.2
under the autonomy protocol §4. Build nothing outside the plan.

Phase rules:
- Branch `phase/opus-2` off latest main. opus-1 unmerged ⇒ finish it first.
- Load skills: `nextjs-national-lead-gen` (SEO/conversion architecture), `vendercrm-lead-capture` (formId wiring).
- Write COMPLETE Swedish copy for home, `/residency`, `/om`, `/kontakt`, `/plan-b` hub and legal pages — Anton's first-person voice per §1.6, no lorem. Prices in `content/packages.ts` are reasonable EUR placeholders marked `TODO-ANTON`.
- Create all ~32 guide MDX stubs from §3B + 5 city profiles: full frontmatter (title, description, cluster, internal-link plan) with a short outline body and `draft: true`. Do NOT write article bodies — that is sonnet-3's job.
- Tone traps: Plan B = opportunity-framed, never doom/political; tax content carries an "ej skatterådgivning" disclaimer; dating/relationships stays tasteful and out of main nav.
- Do not touch design tokens or the lead route contract; use them as built.
- Re-runnable; minor issues → KNOWN-ISSUES.md; stop only per §4.4.

Exit: build green; money pages fully written; 32 guide stubs + 5 city stubs with valid frontmatter and draft flags; Organization + FAQPage schema validates; every form and the newsletter post with correct formId; PR merged green.

## After this phase — hand off to the next (fresh session)
All four §4.9 gates: PR merged green, exit checklist passed, pre-handoff audit done, build-log entry committed. **Model switch:** spawn a NEW session via `create_session` with `model` = Sonnet (never Fable), inherited environment/permission mode (never `plan`), `prompt` exactly `Read prompts/sonnet-3-content.md in this repo and execute it.` Then end with your phase report. If `create_session` is unavailable: STOP and report — tell Anton to paste that line into a fresh Sonnet window.
