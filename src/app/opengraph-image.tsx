import { ImageResponse } from "next/og";
import { homeFocus, homeRole } from "@/data/home";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.brandHoverName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "linear-gradient(155deg, #11130f 0%, #080907 44%, #080907 100%)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#00e0c2",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "#e5d5b5",
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            {site.brandHoverName}
          </div>
          <div style={{ color: "#f8f4ec", fontSize: 36, fontWeight: 700 }}>{homeRole.title}</div>
          <div style={{ color: "rgba(248, 244, 236, 0.72)", fontSize: 28, maxWidth: 760 }}>
            {homeFocus.title}
          </div>
        </div>
        <div style={{ color: "rgba(248, 244, 236, 0.45)", fontSize: 24 }}>{site.domain}</div>
      </div>
    ),
    { ...size },
  );
}