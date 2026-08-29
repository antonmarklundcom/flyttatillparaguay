import { ImageResponse } from "next/og";

import { strings } from "@content/strings";

/**
 * Sitewide OG-bild, genererad vid byggtid ur design-tokens (plan.md §3D).
 *
 * Fas sonnet-4 ersätter den med riktiga, per-sida-anpassade bilder. Fram
 * till dess får varje delning en korrekt bild i stället för en 404.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = strings.brand.tagline;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fbf7f0",
          padding: "72px 80px",
          borderBottom: "16px solid #c9633c",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#c9633c",
            fontWeight: 600,
          }}
        >
          {strings.brand.wordmark}.se
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.08,
            color: "#241c15",
            maxWidth: 940,
            letterSpacing: "-0.02em",
          }}
        >
          {strings.brand.tagline}
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#6b5f51" }}>
          Residency · Fastigheter · Livet i Paraguay
        </div>
      </div>
    ),
    size,
  );
}
