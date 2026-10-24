import { ImageResponse } from "next/og";

import { SITE, SOCIAL_DESCRIPTION } from "@/lib/seo/site";

/**
 * Social card shared by opengraph-image and twitter-image. Satori is
 * flexbox-only and needs explicit `display` on multi-child elements. Uses the
 * bundled sans: next/font exposes no file path to load Oxanium from here.
 */
export const renderOgImage = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#fafafa",
          padding: "72px 80px",
          border: "1px solid #1f1f1f",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#fafafa",
          }}
        >
          {SITE.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              maxWidth: 940,
            }}
          >
            {SITE.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.4,
              color: "#7d7d7d",
              maxWidth: 900,
            }}
          >
            {SOCIAL_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
