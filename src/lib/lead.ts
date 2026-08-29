import { cookies, headers } from "next/headers";

import { leadSource } from "./site";
import {
  idempotencyKey,
  readAttribution,
  sendLead,
  type SendLeadResult,
} from "./vendercrm";

/**
 * Ett enda ställe där ett lead bearbetas. Både server-actionen (formulären)
 * och /api/lead går genom `processLead`, så payloaden mot VenderCRM ser
 * likadan ut oavsett ingång.
 */

/** Ett formId per formulär (plan.md §2). */
export const LEAD_FORM_IDS = [
  "residency",
  "fastigheter",
  "kontakt",
  "nyhetsbrev",
] as const;

export type LeadFormId = (typeof LEAD_FORM_IDS)[number];

export function isLeadFormId(value: unknown): value is LeadFormId {
  return (
    typeof value === "string" && (LEAD_FORM_IDS as readonly string[]).includes(value)
  );
}

export type LeadInput = {
  formId: LeadFormId;
  phone: string;
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot — ifyllt betyder bot. */
  website?: string;
  /** Extra fält som hamnar på kontaktens tidslinje, t.ex. valt paket. */
  extra?: Record<string, string | undefined>;
};

export type LeadOutcome =
  | { ok: true; degraded: boolean; skipped?: "honeypot" }
  | { ok: false; error: "telefon" | "formulär" };

const PHONE_MIN = 6;
const PHONE_MAX = 30;

export function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+ ()-]/g, "").trim();
}

export async function processLead(input: LeadInput): Promise<LeadOutcome> {
  // Honeypot: acceptera tyst, posta ingenting (skill-regel 4).
  if (input.website && input.website.trim() !== "") {
    return { ok: true, degraded: false, skipped: "honeypot" };
  }

  if (!isLeadFormId(input.formId)) {
    return { ok: false, error: "formulär" };
  }

  const phone = normalizePhone(input.phone ?? "");
  if (phone.length < PHONE_MIN || phone.length > PHONE_MAX) {
    return { ok: false, error: "telefon" };
  }

  const cookieStore = await cookies();
  const attribution = readAttribution(cookieStore.get("vc_attr")?.value);

  const headerList = await headers();
  const referrer = attribution.referrer ?? headerList.get("referer") ?? undefined;

  const result: SendLeadResult = await sendLead({
    phone,
    name: input.name?.trim(),
    email: input.email?.trim(),
    message: input.message?.trim(),
    source: leadSource,
    page_url: attribution.landing_page,
    referrer,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    gclid: attribution.gclid,
    fbclid: attribution.fbclid,
    idempotency_key: idempotencyKey(phone),
    fields: {
      formId: input.formId,
      ...input.extra,
    },
  });

  // Besökaren ska aldrig se CRM-rörmokeri. Ett misslyckat anrop är redan
  // loggat i sendLead och är vårt jobb att fixa (skill-regel 5).
  return { ok: true, degraded: result.degraded };
}
