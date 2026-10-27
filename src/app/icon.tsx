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
          background: "#211d19",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#f7f4ee",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            display: "flex",
          }}
        >
          Z
        </div>
      </div>
    ),
    { ...size }
  );
}
