"use client";

import React, { useRef, useEffect } from "react";

export default function IndustrialAutomationSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented:", err);
      });
    }
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "1440px",
        height: "810px",
        overflow: "hidden",
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* Background Video: Node 1498:14111 (x: 0, y: 0, w: 1440, h: 810) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "1440px",
          height: "810px",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source
            src="/homepage_assets/Industrial Automation.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Floating Navbar (Header): Node 1498:14116 (x: 136.5, y: 601, w: 582, h: 68) */}
      <div
        style={{
          position: "absolute",
          left: "136.5px",
          top: "601px",
          zIndex: 30,
        }}
      >
              </div>

      {/* Text Content Frame: Node 1498:14112 (x: 835, y: 548, w: 470, h: 174, bg: rgba(255, 255, 255, 0.12), radius: 12px, padding: 24px 32px) */}
      <div
        style={{
          position: "absolute",
          left: "835px",
          top: "548px",
          width: "470px",
          height: "174px",
          boxSizing: "border-box",
          padding: "24px 32px",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          gap: "16px",
          zIndex: 20,
        }}
      >
        {/* Title & Body text: Node 1498:14113 (w: 406, h: 126, gap: 16px) */}
        <div
          style={{
            width: "406px",
            height: "126px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
          }}
        >
          {/* Title: Node 1498:14114 (w: 406, h: 38, font: Urbanist 32px SemiBold 600, color: #FFFFFF) */}
          <h2
            style={{
              margin: 0,
              width: "406px",
              height: "38px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "32px",
              fontWeight: 600,
              lineHeight: "1.2",
              textAlign: "left",
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            Industrial Automation
          </h2>

          {/* Body text: Node 1498:14115 (w: 406, h: 72, font: Urbanist 16px Medium 500, line-height: 150%, color: #FFFFFF) */}
          <p
            style={{
              margin: 0,
              width: "406px",
              height: "72px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "150%",
              textAlign: "left",
              color: "#FFFFFF",
            }}
          >
            Industrial Automation streamlines processes through intelligent control
            systems, enabling faster, more efficient, and highly reliable production.
          </p>
        </div>
      </div>
    </section>
  );
}

