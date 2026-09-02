"use client";

import React, { useRef, useEffect } from "react";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import ExploreBadge from "@/components/common/ExploreBadge";

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented:", err);
      });
    }
  }, []);

  const handleScrollToNext = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

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
      {/* Background Video: Node I1498:14094;811:68 (x: 0, y: 0, w: 1440, h: 810, opacity 0.32 black overlay) */}
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
            src="/homepage_assets/Home page Hero section.mp4"
            type="video/mp4"
          />
        </video>
        {/* Solid fill: color black, opacity: 0.32 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.32)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hero Content Frame: Frame 1618873603 (x: 367, y: 241, w: 707, h: 147) */}
      <div
        style={{
          position: "absolute",
          left: "367px",
          top: "241px",
          width: "707px",
          height: "147px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          zIndex: 10,
          pointerEvents: "none",
          boxSizing: "border-box",
        }}
      >
        {/* Frame 1618873602 */}
        <div
          style={{
            width: "707px",
            height: "147px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Welcome to Innosino: Node I1498:14094;811:86 (w: 707, h: 83, font: Cal Sans 64px, uppercase, text-align: center) */}
          <h1
            style={{
              margin: 0,
              width: "707px",
              height: "83px",
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "64px",
              fontWeight: 400,
              lineHeight: "1.2",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0px",
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            WELCOME TO{" "}
            <span
              style={{
                color: "#FF6A00",
              }}
            >
              INNOSINO
            </span>
          </h1>

          {/* Subtitle: Node I1498:14094;811:87 (w: 707, h: 48, font: Urbanist 16px, weight: 500, line-height: 150%, text-align: center) */}
          <p
            style={{
              margin: 0,
              width: "707px",
              height: "48px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "150%",
              textAlign: "center",
              color: "#FFFFFF",
              whiteSpace: "pre-line",
            }}
          >
            {`We turn ideas into high-performance, market ready products from \nconcept to mass production.`}
          </p>
        </div>
      </div>

      {/* Floating Header / Navbar: Node I1498:14094;1000:8993 (x: 135, y: 626, w: 582, h: 68) */}
      <FloatingNavbar />

      {/* Explore Widget: Node I1498:14094;811:2724 (x: 1149, y: 604, w: 186, h: 112) */}
      <ExploreBadge onClick={handleScrollToNext} />
    </section>
  );
}
