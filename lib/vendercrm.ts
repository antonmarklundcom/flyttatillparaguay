import crypto from "node:crypto";

/**
 * VenderCRM lead capture (skill: vendercrm-lead-capture).
 *
 * Arkitekturregel: webbläsaren pratar ALDRIG med VenderCRM. Formulären postar
 * till sajtens egen route, som håller nyckeln. Därför inget NEXT_PUBLIC_-prefix.
 */

const CRM_URL = (process.env.VENDERCRM_URL ?? "").replace(/\/$/, "");
const API_KEY = process.env.VENDERCRM_API_KEY ?? "";

/** Formulär-ID enligt plan §2 — ett per formulär, används som `source`. */
export const FORM_IDS = ["residency", "fastigheter", "kontakt", "nyhetsbrev"] as const;
export type FormId = (typeof FORM_IDS)[number];

export type Lead = {
  phone: string;
  name?: string;
  email?: string;
  message?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  page_url?: string;
  referrer?: string;
  fields?: Record<string, string | undefined>;
  idempotency_key: string;
};

export type SendResult = {
  ok: boolean;
  status: number;
  /** true när nyckel/URL saknas: leadet loggas i stället för att postas. */
  degraded: boolean;
};

/** Samma telefonnummer inom samma timme = samma inskick. */
export function idempotencyKey(phone: string): string {
  return crypto
    .createHash("sha256")
    .update(`${phone}|${new Date().toISOString().slice(0, 13)}`)
    .digest("hex");
}

/** First-touch-attribution från cookien `vc_attr` (vc-attribution.js). */
export function readAttribution(cookieValue?: string): Record<string, string> {
  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue ?? "%7B%7D"));
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function isConfigured(): boolean {
  return Boolean(CRM_URL && API_KEY);
}

function compact(lead: Lead): Record<string, unknown> {
  const entries = Object.entries(lead).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  const body: Record<string, unknown> = Object.fromEntries(entries);

  if (lead.fields) {
    const fields = Object.fromEntries(
      Object.entries(lead.fields).filter(([, v]) => v !== undefined && v !== ""),
    );
    if (Object.keys(fields).length > 0) body.fields = fields;
    else delete body.fields;
  }

  return body;
}

/**
 * Postar ett lead. Kastar aldrig: besökaren ska kunna tackas även när CRM:et
 * är nere. Utan nyckel körs "degraded mode" — leadet loggas, inget går förlorat
 * som inte redan står i loggen, och bygget blockeras inte (plan §4.5).
 */
export async function sendLead(lead: Lead): Promise<SendResult> {
  const body = compact(lead);

  if (!isConfigured()) {
    console.warn(
      "[lead:degraded] VENDERCRM_URL/VENDERCRM_API_KEY saknas — leadet loggas i stället för att postas.",
      JSON.stringify(body),
    );
    return { ok: true, status: 0, degraded: true };
  }

  try {
    const response = await fetch(`${CRM_URL}/api/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[lead:failed]", response.status, await response.text());
    }
    return { ok: response.ok, status: response.status, degraded: false };
  } catch (err) {
    console.error("[lead:unreachable]", err);
    return { ok: false, status: 0, degraded: false };
  }
}
