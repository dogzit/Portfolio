import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050508",
          borderRadius: 8,
          position: "relative",
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: 7,
            border: "1px solid rgba(59,130,246,0.35)",
          }}
        />

        {/* Electric glow blob */}
        <div
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
            top: 6,
            left: 6,
          }}
        />

        {/* Z letter */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#60a5fa",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            fontFamily: "system-ui, sans-serif",
            position: "relative",
            textShadow: "0 0 12px rgba(59,130,246,0.8)",
          }}
        >
          Z
        </div>
      </div>
    ),
    { ...size }
  );
}
