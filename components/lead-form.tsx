"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { strings } from "@/content/strings";
import { Button } from "@/components/ui";

type ExtraField = {
  name: string;
  label: string;
  type?: "text" | "select";
  options?: string[];
};

/**
 * Enda lead-formuläret på sajten. Postar till /api/lead — aldrig direkt till
 * VenderCRM (nyckeln bor på servern). Senare faser byter formId, inte kontrakt.
 */
export function LeadForm({
  formId,
  submitLabel,
  extraFields = [],
  className = "",
}: {
  formId: "residency" | "fastigheter" | "kontakt";
  submitLabel?: string;
  extraFields?: ExtraField[];
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formId, pageUrl: window.location.href }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className={`rounded-(--radius-lg) border border-(--color-line) bg-cream-200/70 p-6 ${className}`}>
        <p className="font-(family-name:--font-display) text-lg">{strings.form.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${className}`} noValidate={false}>
      <Field name="name" label={strings.form.name} autoComplete="name" />
      <Field
        name="phone"
        label={strings.form.phone}
        type="tel"
        required
        autoComplete="tel"
        placeholder={strings.form.phonePlaceholder}
      />
      <Field name="email" label={strings.form.email} type="email" autoComplete="email" />

      {extraFields.map((field) =>
        field.type === "select" ? (
          <label key={field.name} className="grid gap-1.5 text-sm font-medium">
            {field.label}
            <select
              name={field.name}
              className="rounded-(--radius-sm) border border-(--color-line) bg-white px-3 py-2.5 text-base font-normal"
            >
              {(field.options ?? []).map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ) : (
          <Field key={field.name} name={field.name} label={field.label} />
        ),
      )}

      <label className="grid gap-1.5 text-sm font-medium">
        {strings.form.message}
        <textarea
          name="message"
          rows={4}
          placeholder={strings.form.messagePlaceholder}
          className="rounded-(--radius-sm) border border-(--color-line) bg-white px-3 py-2.5 text-base font-normal"
        />
      </label>

      {/* Honeypot — måste vara tom (skill: vendercrm-lead-capture, regel 4). */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />

      {state === "error" ? (
        <p role="alert" className="text-sm text-terracotta-700">
          {strings.form.error}
        </p>
      ) : null}

      <Button type="submit" disabled={state === "sending"}>
        {state === "sending" ? strings.form.submitting : (submitLabel ?? strings.form.submit)}
      </Button>

      <p className="text-xs text-(--color-text-muted)">
        {strings.form.consent}{" "}
        <Link href="/integritetspolicy" className="underline">
          Integritetspolicy
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      {required ? <span className="sr-only">(obligatoriskt)</span> : null}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-(--radius-sm) border border-(--color-line) bg-white px-3 py-2.5 text-base font-normal"
      />
    </label>
  );
}
