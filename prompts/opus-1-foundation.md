# Phase opus-1 — Foundation & designsystem. Paste into a fresh OPUS session.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md` (create it empty if missing).
Execute plan §5.1 under the autonomy protocol §4. Build nothing outside the plan.

Phase rules:
- Branch `phase/opus-1` off latest main.
- Load skills at the matching step: `nodejs-mysql-hostinger-stack` (patterns only — NO database in v1, per §1.3), `nextjs-deploy-hostinger` (build must be Hostinger-deployable from commit 1), `nextjs-national-lead-gen` (page architecture + layout pattern menu), `vendercrm-lead-capture` (lead route contract).
- Design tokens per §3D are the foundation every later phase inherits — get palette/typography right here; later phases may not touch them.
- Placeholder copy is fine everywhere; real copy is opus-2's job. Do NOT write articles.
- No auth, no MySQL, no CMS — MDX + typed content files only (§2).
- Re-runnable: check what exists on the branch first, continue from the first unmet exit criterion. Minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: `npm run build` green; every §3A route responds; a test MDX guide renders frontmatter, FAQ block and CTA; lead route returns ok in degraded mode without an API key and its payload matches the VenderCRM contract; tokens + all §5.1 components demonstrated on the homepage skeleton; `.env.example` complete; PR merged green.

## After this phase — hand off to the next (fresh session)
All four §4.9 gates first: PR merged green, exit checklist passed, pre-handoff audit done (re-run build, adversarially re-read your merged diff, fix findings), build-log entry in plan §9 committed. Then spawn a NEW session via claude-code-remote `create_session`: inherit environment and permission mode (never `plan`), `model` = Opus (never Fable), `prompt` exactly `Read prompts/opus-2-corepages.md in this repo and execute it.` Then end with your phase report. If `create_session` is unavailable (local CLI): same model next, so continue in this window. Never hand off with an unmerged PR or failed audit.
