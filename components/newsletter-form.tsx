"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { strings } from "@/content/strings";

/** Nyhetsbrevsfångst — samma lead-route, formId "nyhetsbrev". */
export function NewsletterForm({ className = "" }: { className?: string }) {
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
        body: JSON.stringify({ ...data, formId: "nyhetsbrev", pageUrl: window.location.href }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className={`text-sm text-terracotta-200 ${className}`}>{strings.form.success}</p>;
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-2 ${className}`}>
      <label className="sr-only" htmlFor="newsletter-phone">
        {strings.form.phone}
      </label>
      <input
        id="newsletter-phone"
        name="phone"
        type="tel"
        required
        placeholder={strings.form.phonePlaceholder}
        className="rounded-(--radius-sm) border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-cream-300"
      />
      <label className="sr-only" htmlFor="newsletter-email">
        {strings.form.email}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        placeholder="din@epost.se"
        className="rounded-(--radius-sm) border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-cream-300"
      />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px]" />
      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-(--radius-sm) bg-(--color-accent) px-4 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-600 disabled:opacity-60"
      >
        {state === "sending" ? strings.form.submitting : strings.newsletter.submit}
      </button>
      {state === "error" ? (
        <p role="alert" className="text-xs text-terracotta-200">
          {strings.form.error}
        </p>
      ) : null}
    </form>
  );
}
