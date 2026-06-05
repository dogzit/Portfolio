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
          background:
            "radial-gradient(circle at 18% 10%, rgba(59,130,246,0.35), transparent 55%)," +
            "radial-gradient(circle at 88% 90%, rgba(139,92,246,0.30), transparent 55%)," +
            "radial-gradient(circle at 60% 30%, rgba(6,182,212,0.18), transparent 55%)," +
            "#050508",
          color: "#fff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.05,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Top: brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(59,130,246,0.10)",
              border: "1px solid rgba(59,130,246,0.30)",
              color: "#93c5fd",
              fontSize: 22,
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#4ade80",
              }}
            />
            Open to opportunities
          </div>
        </div>

        {/* Middle: title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            marginTop: 40,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.35)",
              fontFamily: "monospace",
              letterSpacing: 6,
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            {"// full-stack developer · mongolia"}
          </div>
          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: -4,
              background:
                "linear-gradient(90deg, #ffffff 0%, #93c5fd 50%, #c4b5fd 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Zolbayar
          </div>
          <div
            style={{
              fontSize: 38,
              color: "rgba(255,255,255,0.6)",
              marginTop: 22,
              maxWidth: 960,
              lineHeight: 1.25,
            }}
          >
            17 y/o engineer · Team Lead · building real products with
            Next.js, Prisma & TypeScript.
          </div>
        </div>

        {/* Bottom: meta strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
            fontFamily: "monospace",
            fontSize: 24,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#60a5fa", fontWeight: 700 }}>zoloo</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>.dev</span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <span>github.com/dogzit</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
