import { NextResponse } from "next/server";

import { isLeadFormId, processLead } from "@/lib/lead";

/**
 * Programmatisk ingång för lead-inskick (JSON).
 *
 * Formulären på sajten går via server-actionen i app/actions/lead.ts, men
 * båda delar samma `processLead` — payloaden mot VenderCRM är identisk.
 * Den här routen finns för klientdrivna formulär, externa landningssidor
 * och röktest av degraderat läge.
 */

export const runtime = "nodejs";

type Body = {
  formId?: unknown;
  telefon?: unknown;
  namn?: unknown;
  epost?: unknown;
  meddelande?: unknown;
  website?: unknown;
  extra?: unknown;
};

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "ogiltig JSON" },
      { status: 400 },
    );
  }

  // Honeypot — acceptera tyst utan att posta något vidare.
  if (str(body.website)) {
    return NextResponse.json({ ok: true });
  }

  if (!isLeadFormId(body.formId)) {
    return NextResponse.json(
      { ok: false, error: "formId måste vara residency, fastigheter, kontakt eller nyhetsbrev" },
      { status: 422 },
    );
  }

  const extra =
    body.extra && typeof body.extra === "object" && !Array.isArray(body.extra)
      ? Object.fromEntries(
          Object.entries(body.extra as Record<string, unknown>)
            .map(([key, value]) => [key, str(value)])
            .filter((entry): entry is [string, string] => entry[1] !== undefined),
        )
      : undefined;

  const outcome = await processLead({
    formId: body.formId,
    phone: str(body.telefon) ?? "",
    name: str(body.namn),
    email: str(body.epost),
    message: str(body.meddelande),
    extra,
  });

  if (!outcome.ok) {
    return NextResponse.json({ ok: false, error: outcome.error }, { status: 422 });
  }

  return NextResponse.json({ ok: true, degraded: outcome.degraded });
}
