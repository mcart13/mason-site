import { ImageResponse } from "next/og";

export const alt = "Mason";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "52px",
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: 500,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          Mason
        </div>
      </div>
    ),
    size,
  );
}
