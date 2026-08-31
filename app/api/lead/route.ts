import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { FORM_IDS, idempotencyKey, readAttribution, sendLead, type FormId } from "@/lib/vendercrm";
import { site } from "@/content/site";

/**
 * Enda vägen ut till VenderCRM. Nyckeln lämnar aldrig servern.
 * Returnerar alltid ok när besökaren gjort sin del (skill-regel 5) —
 * fel loggas i stället för att visas.
 */
export const runtime = "nodejs";

type Payload = {
  formId?: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  website?: string;
  pageUrl?: string;
  [key: string]: unknown;
};

const KNOWN_KEYS = new Set([
  "formId",
  "name",
  "phone",
  "email",
  "message",
  "website",
  "pageUrl",
]);

function isFormId(value: unknown): value is FormId {
  return typeof value === "string" && (FORM_IDS as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — acceptera tyst, posta ingenting.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const formId: FormId = isFormId(body.formId) ? body.formId : "kontakt";

  const phone = String(body.phone ?? "").trim();
  if (phone.length < 6) {
    return NextResponse.json({ ok: false, error: "phone" }, { status: 422 });
  }

  const attr = readAttribution((await cookies()).get("vc_attr")?.value);

  // Allt formuläret samlar utöver standardfälten hamnar på kontaktens tidslinje.
  const extra: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (!KNOWN_KEYS.has(key) && typeof value === "string" && value.trim() !== "") {
      extra[key] = value.trim();
    }
  }

  const result = await sendLead({
    phone,
    name: String(body.name ?? "").trim() || undefined,
    email: String(body.email ?? "").trim() || undefined,
    message: String(body.message ?? "").trim() || undefined,
    source: `${site.domain}:${formId}`,
    page_url: String(body.pageUrl ?? attr.landing_page ?? "") || undefined,
    referrer: attr.referrer,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
    utm_term: attr.utm_term,
    utm_content: attr.utm_content,
    gclid: attr.gclid,
    fbclid: attr.fbclid,
    fields: { formId, ...extra },
    idempotency_key: idempotencyKey(phone),
  });

  // Besökaren har gjort sitt — kvittera alltid. Fel finns i serverloggen.
  return NextResponse.json({ ok: true, degraded: result.degraded });
}
