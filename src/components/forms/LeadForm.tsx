"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { strings } from "@content/strings";

import {
  initialLeadFormState,
  submitLeadAction,
} from "@/app/actions/lead";
import type { LeadFormId } from "@/lib/lead";
import { Button } from "@/components/ui/Button";

/**
 * Ett formulär för alla fyra formId (plan.md §2).
 *
 * Actionen är en server action, så formuläret postar och fungerar även med
 * JavaScript avstängt; `useActionState` lägger bara till inline-feedback
 * ovanpå det.
 */

const fieldClass =
  "w-full rounded-md border border-sand-300 bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink-800 placeholder:text-ink-400 focus:border-forest-600 focus:outline-none";

const labelClass = "block text-sm font-medium text-ink-800";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? strings.form.submitting : label}
    </Button>
  );
}

export function LeadForm({
  formId,
  submitLabel = strings.form.submit,
  messageLabel = strings.form.message,
  showMessage = true,
  hidden,
}: {
  formId: LeadFormId;
  submitLabel?: string;
  messageLabel?: string;
  showMessage?: boolean;
  /** Extrafält som följer med till CRM:et, t.ex. { paket: "komplett" }. */
  hidden?: Partial<Record<"paket" | "ort" | "amne", string>>;
}) {
  const [state, formAction] = useActionState(submitLeadAction, initialLeadFormState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-forest-200 bg-forest-50 p-6"
      >
        <p className="font-display text-xl text-forest-900">
          {strings.form.successTitle}
        </p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
          {strings.form.successBody}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="formId" value={formId} />
      {hidden
        ? Object.entries(hidden).map(([key, value]) =>
            value ? <input key={key} type="hidden" name={key} value={value} /> : null,
          )
        : null}

      {/* Honeypot — osynlig för människor, ifylld av bottar. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`website-${formId}`}>{strings.form.honeypotLabel}</label>
        <input id={`website-${formId}`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`namn-${formId}`}>
            {strings.form.name}
          </label>
          <input
            id={`namn-${formId}`}
            name="namn"
            autoComplete="name"
            className={`${fieldClass} mt-1.5`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`telefon-${formId}`}>
            {strings.form.phone}{" "}
            <span className="font-normal text-ink-400">({strings.form.required.toLowerCase()})</span>
          </label>
          <input
            id={`telefon-${formId}`}
            name="telefon"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+46 70 123 45 67"
            className={`${fieldClass} mt-1.5`}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor={`epost-${formId}`}>
          {strings.form.emailOptional}
        </label>
        <input
          id={`epost-${formId}`}
          name="epost"
          type="email"
          autoComplete="email"
          className={`${fieldClass} mt-1.5`}
        />
      </div>

      {showMessage ? (
        <div>
          <label className={labelClass} htmlFor={`meddelande-${formId}`}>
            {messageLabel}
          </label>
          <textarea
            id={`meddelande-${formId}`}
            name="meddelande"
            rows={4}
            className={`${fieldClass} mt-1.5 resize-y`}
          />
        </div>
      ) : null}

      {state.status === "error" ? (
        <p role="alert" className="text-sm text-clay-700">
          {state.message}
        </p>
      ) : null}

      <SubmitButton label={submitLabel} />

      <p className="text-xs leading-relaxed text-ink-400">
        {strings.form.phoneHelp}
      </p>
    </form>
  );
}
