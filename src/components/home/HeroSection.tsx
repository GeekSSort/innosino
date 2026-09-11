"use client";

import React from "react";
import ExploreBadge from "@/components/common/ExploreBadge";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import type { HomePageData } from "@/sanity/queries";

export default function HeroSection({ heroCopy }: { heroCopy: HomePageData["hero"] }) {
  return (
    <section id="hero" className="section-frame">
      <div className="section-frame__inner">
      {/* Full-bleed background layer (Figma: 1440x810 video + 32% black scrim).
          The video always covers the section, so the crop adapts to the
          viewport's aspect ratio instead of letterboxing. */}
      <div className="section-media">
        {/* The only eagerly-loaded video on the page: it is the first thing the
            visitor sees, so it gets the bandwidth ahead of everything below. */}
        <BackgroundVideo
          src="/homepage_assets/Home page Hero section.mp4"
          poster="/posters/homepage_assets/Home page Hero section.webp"
          loading="eager"
        />
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
            {heroCopy.titleLead}
            {/* The brand name is the logo, on its own line. The file's viewBox
                is cropped to the artwork, so 1.2em puts the wordmark's caps at
                ~0.88em against the 0.7em caps of the line above it. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-title__logo"
              src="/INNOSINO-logo-on black BG.svg"
              alt={heroCopy.titleAccent}
            />
          </h1>
          <p className="hero-subtitle">{heroCopy.subtitle}</p>
        </div>
      </div>

      {/* Scroll affordance — part of the hero composition in Figma, so it is
          anchored to this section rather than pinned to the viewport. */}
      <ExploreBadge />
      </div>
    </section>
  );
}
