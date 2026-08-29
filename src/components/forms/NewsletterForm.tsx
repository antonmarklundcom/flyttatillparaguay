"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { strings } from "@content/strings";

import { initialLeadFormState, submitLeadAction } from "@/app/actions/lead";

/**
 * Kompakt nyhetsbrevsfångst för footer och artikelslut (plan.md §3C).
 *
 * Telefon är obligatoriskt eftersom VenderCRM använder numret som
 * kontaktidentitet — ett mejl utan telefon kan inte bli en kontakt. Brevet
 * går därför ut både på mejl och WhatsApp, vilket ligger i linje med att
 * hela sajten är WhatsApp-first (se KNOWN-ISSUES.md för backloggsnotisen
 * om en ren e-postlista).
 */

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="shrink-0 rounded-md bg-clay-500 px-4 py-2.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-clay-600 disabled:opacity-60"
    >
      {pending ? strings.form.submitting : strings.newsletter.submit}
    </button>
  );
}

export function NewsletterForm({ tone = "onDark" }: { tone?: "onDark" | "default" }) {
  const [state, formAction] = useActionState(submitLeadAction, initialLeadFormState);

  const field =
    tone === "onDark"
      ? "w-full rounded-md border border-sand-200/25 bg-sand-100/10 px-3.5 py-2.5 text-[0.9375rem] text-sand-50 placeholder:text-sand-400 focus:border-sand-200/60 focus:outline-none"
      : "w-full rounded-md border border-sand-300 bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink-800 placeholder:text-ink-400 focus:border-forest-600 focus:outline-none";

  const bodyColor = tone === "onDark" ? "text-sand-300" : "text-ink-500";

  if (state.status === "success") {
    return (
      <div role="status">
        <p className={tone === "onDark" ? "font-display text-lg text-sand-50" : "font-display text-lg text-forest-900"}>
          {strings.newsletter.successTitle}
        </p>
        <p className={`mt-1 text-sm ${bodyColor}`}>{strings.newsletter.successBody}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="formId" value="nyhetsbrev" />
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website-nyhetsbrev">{strings.form.honeypotLabel}</label>
        <input id="website-nyhetsbrev" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="epost-nyhetsbrev">
          {strings.form.email}
        </label>
        <input
          id="epost-nyhetsbrev"
          name="epost"
          type="email"
          autoComplete="email"
          placeholder={strings.form.email}
          className={field}
        />
        <label className="sr-only" htmlFor="telefon-nyhetsbrev">
          {strings.form.phone}
        </label>
        <input
          id="telefon-nyhetsbrev"
          name="telefon"
          type="tel"
          required
          autoComplete="tel"
          placeholder={strings.form.phone}
          className={field}
        />
        <SubmitButton />
      </div>

      {state.status === "error" ? (
        <p role="alert" className="text-sm text-clay-300">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
