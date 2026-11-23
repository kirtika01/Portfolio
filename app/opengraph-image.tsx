import { ImageResponse } from "next/og"
import { SITE } from "@/lib/site"

export const alt = `${SITE.name}, ${SITE.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Social preview card, generated at build time. No photo or invented stats. */
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
          padding: "72px 80px",
          backgroundColor: "#000",
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(185,138,94,0.28), transparent 55%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              border: "2px solid #cba982",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#ecdcc6",
            }}
          >
            K
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>{SITE.name}</div>
            <div style={{ fontSize: 24, color: "#cba982" }}>{SITE.role}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
            I Build AI-Powered Products, Scalable Backends &amp; Intelligent Automation.
          </div>
          <div style={{ fontSize: 26, color: "#d6d3d1" }}>Python · FastAPI · AI/ML · LLMs · SaaS · API Integrations</div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#a8a29e" }}>kirtikadev.in</div>
      </div>
    ),
    size,
  )
}
