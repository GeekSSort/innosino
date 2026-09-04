"use client";

import React from "react";
import BackgroundVideo from "@/components/common/BackgroundVideo";

export interface ServiceMediaSectionProps {
  /** Anchor id for in-page navigation. */
  id?: string;
  /** Full-bleed background video source. */
  videoSrc: string;
  /** Poster still for `videoSrc`, shown until the video is ready. */
  posterSrc: string;
  /** VP9/WebM alternative, where one encodes smaller than the MP4. */
  webmSrc?: string;
  /** Opacity of the black scrim laid over the video (from the Figma frame). */
  scrimOpacity?: number;
  title: string;
  body: string;
}

/**
 * Views 3-6 of the homepage share one composition: a full-bleed background
 * video with a translucent copy card pinned to the right edge of the content
 * container, near the bottom of the frame.
 *
 * Layout comes entirely from `.section-frame` / `.service-grid` in globals.css,
 * whose 552fr : auto : 84fr row ratio reproduces the Figma frame's vertical
 * placement at any viewport height.
 */
export default function ServiceMediaSection({
  id,
  videoSrc,
  posterSrc,
  webmSrc,
  scrimOpacity = 0.12,
  title,
  body,
}: ServiceMediaSectionProps) {
  return (
    <section id={id} className="section-frame">
      <div className="section-frame__inner">
      <div className="section-media">
        {/* These four sections all sit below the fold, so the video waits until
            the section is close to the viewport and the poster holds the frame
            until then. */}
        <BackgroundVideo src={videoSrc} poster={posterSrc} webmSrc={webmSrc} loading="lazy" />
        <div
          className="section-media__scrim"
          style={{ backgroundColor: `rgba(0, 0, 0, ${scrimOpacity})` }}
        />
      </div>

      <div className="service-grid">
        <div className="service-card">
          <h2 className="service-card__title">{title}</h2>
          <p className="service-card__body">{body}</p>
        </div>
      </div>
      </div>
    </section>
  );
}
