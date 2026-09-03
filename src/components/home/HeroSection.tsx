"use client";

import React, { useRef, useEffect } from "react";
import ExploreBadge from "@/components/common/ExploreBadge";

export default function HeroSection() {
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
    <section id="hero" className="section-frame">
      {/* Full-bleed background layer (Figma: 1440x810 video + 32% black scrim).
          The video always covers the section, so the crop adapts to the
          viewport's aspect ratio instead of letterboxing. */}
      <div className="section-media">
        <video ref={videoRef} autoPlay loop muted playsInline>
          <source
            src="/homepage_assets/Home page Hero section.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="section-media__scrim"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.32)" }}
        />
      </div>

      {/* Content layer. The 241fr / auto / 422fr row rhythm keeps the copy
          block at the same proportional height as the Figma frame. */}
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">
            {"WELCOME TO "}
            <span style={{ color: "#FF6A00" }}>INNOSINO</span>
          </h1>
          <p className="hero-subtitle">
            We turn ideas into high-performance, market ready products from
            concept to mass production.
          </p>
        </div>
      </div>

      {/* Scroll affordance — part of the hero composition in Figma, so it is
          anchored to this section rather than pinned to the viewport. */}
      <ExploreBadge />
    </section>
  );
}
