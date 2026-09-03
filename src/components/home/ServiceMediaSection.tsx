"use client";

import React, { useRef, useEffect } from "react";

export interface ServiceMediaSectionProps {
  /** Anchor id for in-page navigation. */
  id?: string;
  /** Full-bleed background video source. */
  videoSrc: string;
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
  scrimOpacity = 0.12,
  title,
  body,
}: ServiceMediaSectionProps) {
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
    <section id={id} className="section-frame">
      <div className="section-media">
        <video ref={videoRef} autoPlay loop muted playsInline>
          <source src={videoSrc} type="video/mp4" />
        </video>
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
    </section>
  );
}
