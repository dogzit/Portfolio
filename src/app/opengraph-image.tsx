import { ImageResponse } from "next/og";

export const alt = "Zolbayar — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f7f4ee",
          color: "#211d19",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#4f7a52",
              display: "flex",
            }}
          />
          <span style={{ fontSize: 24, color: "#7b7369", display: "flex" }}>
            Available for internships
          </span>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 26,
              color: "#7b7369",
              fontFamily: "monospace",
              letterSpacing: 6,
              textTransform: "uppercase",
              marginBottom: 20,
              display: "flex",
            }}
          >
            Full-stack developer · Mongolia
          </span>
          <span
            style={{
              fontSize: 150,
              lineHeight: 1,
              letterSpacing: -4,
              display: "flex",
            }}
          >
            Zolbayar.
          </span>
          <span
            style={{
              fontSize: 36,
              color: "#4b443c",
              marginTop: 24,
              maxWidth: 900,
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            17 years old. Started with a burger game tutorial at 13, now leading teams and shipping real products.
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 24,
            color: "#7b7369",
          }}
        >
          <span style={{ display: "flex" }}>github.com/dogzit</span>
          <span style={{ display: "flex", color: "#8a5436" }}>bolorzoloko@gmail.com</span>
        </div>
      </div>
    ),
    size,
  );
}
