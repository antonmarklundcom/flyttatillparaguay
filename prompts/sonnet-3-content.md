# Phase sonnet-3 — Innehållsproduktion. Paste into a fresh SONNET session, ONLY after opus-2 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`. Execute plan §6.1
under the autonomy protocol §4. Build nothing outside the plan.

HARD LIMITS (§4.7): no changes to design tokens, layout system, lead API route, MDX pipeline,
URL structure, or package structure. Need a change ⇒ workaround + Backlog note in plan §10.

Phase rules:
- Branch `phase/sonnet-3` off latest main. opus-2 unmerged ⇒ finish it first.
- Load skill: `nextjs-national-lead-gen` (SEO section) when writing.
- Write final bodies for all 32 guides + 5 city profiles following each stub's frontmatter and internal-link plan: 800–1500 words, Anton's first-person voice, concrete figures marked "uppskattning 2026", an FAQ block per guide, cluster CTA at the end. Remove `draft: true` per finished article only.
- Sensitive topics (dating/relationships, safety, tax) per §1.6 and §6.1: personal, respectful, disclaimers where required.
- Work in batches and commit per batch — this phase is volume; if the session dies, the next run continues from remaining draft flags.
- Re-runnable; minor issues → KNOWN-ISSUES.md; stop only per §4.4.

Exit: build green; zero remaining `draft: true`; no guide under 800 words; all internal links resolve (no 404s); `/guider` cluster filter works with full content; sitemap contains every article; PR merged green.

## After this phase — hand off to the next (fresh session)
All four §4.9 gates: PR merged green, exit checklist passed, pre-handoff audit done, build-log entry committed. Spawn a NEW session via `create_session`: `model` = Sonnet (never Fable), inherited environment/permission mode (never `plan`), `prompt` exactly `Read prompts/sonnet-4-imagery-deploy.md in this repo and execute it.` Then end with your phase report. If `create_session` is unavailable: same model, continue in this window.
