"use server";

import { strings } from "@content/strings";

import { isLeadFormId, processLead, type LeadFormId } from "@/lib/lead";

export type LeadFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export const initialLeadFormState: LeadFormState = { status: "idle" };

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * Server action bakom alla formulär. Passas direkt som `action` så att
 * formulären fungerar även utan JavaScript — viktigt för annonstrafik på
 * dåliga uppkopplingar.
 */
export async function submitLeadAction(
  _previous: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const formId = text(formData, "formId");
  if (!isLeadFormId(formId)) {
    return { status: "error", message: strings.form.errorGeneric };
  }

  const extra: Record<string, string> = {};
  for (const key of ["paket", "ort", "amne"]) {
    const value = text(formData, key).trim();
    if (value) extra[key] = value;
  }

  const outcome = await processLead({
    formId: formId as LeadFormId,
    phone: text(formData, "telefon"),
    name: text(formData, "namn"),
    email: text(formData, "epost"),
    message: text(formData, "meddelande"),
    website: text(formData, "website"),
    extra,
  });

  if (!outcome.ok) {
    return {
      status: "error",
      message:
        outcome.error === "telefon"
          ? strings.form.errorPhone
          : strings.form.errorGeneric,
    };
  }

  return { status: "success" };
}
