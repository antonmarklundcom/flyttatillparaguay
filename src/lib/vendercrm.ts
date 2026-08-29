import crypto from "node:crypto";

/**
 * VenderCRM-klient enligt skillen `vendercrm-lead-capture`.
 *
 * Två regler som aldrig får brytas i senare faser:
 *  1. API-nyckeln lämnar aldrig servern. Ingen NEXT_PUBLIC_-prefix, ingen
 *     fetch från webbläsaren mot CRM:et (endpointen skickar medvetet inga
 *     CORS-headers).
 *  2. `sendLead` kastar aldrig. En besökare som fyllt i ett formulär ska
 *     alltid få sin bekräftelse — ett misslyckat CRM-anrop är vårt problem,
 *     inte deras.
 */

export type VenderCrmLead = {
  /** Obligatoriskt. Kontaktidentiteten i CRM:et. */
  phone: string;
  idempotency_key: string;
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
  /** Allt övrigt värt att spara på kontaktens tidslinje. */
  fields?: Record<string, string | undefined>;
};

export type SendLeadResult = {
  ok: boolean;
  /** 0 = nätverksfel, -1 = degraderat läge (ingen nyckel konfigurerad). */
  status: number;
  degraded: boolean;
};

/** Samma telefonnummer inom samma timme räknas som samma inskick. */
export function idempotencyKey(phone: string): string {
  return crypto
    .createHash("sha256")
    .update(`${phone}|${new Date().toISOString().slice(0, 13)}`)
    .digest("hex");
}

export type Attribution = Partial<{
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
}>;

/** First-touch-cookien `vc_attr` som vc-attribution.js skriver. */
export function readAttribution(cookieValue: string | undefined): Attribution {
  if (!cookieValue) return {};
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(cookieValue));
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : {};
  } catch {
    return {};
  }
}

/** Tomma strängar failar validering på `email` — utelämna hellre fältet. */
function compact<T extends Record<string, unknown>>(input: T): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(input).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
}

export function crmBaseUrl(): string | null {
  const url = process.env.VENDERCRM_URL?.trim();
  return url ? url.replace(/\/$/, "") : null;
}

export function isConfigured(): boolean {
  return Boolean(crmBaseUrl() && process.env.VENDERCRM_API_KEY?.trim());
}

export async function sendLead(lead: VenderCrmLead): Promise<SendLeadResult> {
  const body = compact({
    ...lead,
    fields: lead.fields ? compact(lead.fields) : undefined,
  });

  // Degraderat läge (plan.md §1.4, §4.5): saknad nyckel blockerar aldrig ett
  // formulär. Vi loggar hela payloaden så att inget lead går förlorat innan
  // Anton levererat nyckeln, och besökaren märker ingenting.
  if (!isConfigured()) {
    console.warn(
      "[vendercrm] degraderat läge — VENDERCRM_URL/VENDERCRM_API_KEY saknas. Lead loggas i stället för att skickas:",
      JSON.stringify(body),
    );
    return { ok: true, status: -1, degraded: true };
  }

  try {
    const response = await fetch(`${crmBaseUrl()}/api/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.VENDERCRM_API_KEY as string,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(
        "[vendercrm] lead misslyckades",
        response.status,
        await response.text(),
      );
    }

    return { ok: response.ok, status: response.status, degraded: false };
  } catch (error) {
    console.error("[vendercrm] CRM:et gick inte att nå", error);
    return { ok: false, status: 0, degraded: false };
  }
}
