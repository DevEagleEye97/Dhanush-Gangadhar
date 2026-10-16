import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 13,
          background: "#101210",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C5E3A7",
          borderRadius: "6px",
          fontWeight: 800,
          fontFamily: "monospace",
          border: "1px solid #303731",
          letterSpacing: "-0.5px",
        }}
      >
        DG
      </div>
    ),
    {
      ...size,
    }
  );
}
