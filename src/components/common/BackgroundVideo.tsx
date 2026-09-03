"use client";

import React, { useEffect, useRef, useState } from "react";

export interface BackgroundVideoProps {
  /** Optimised MP4 under /public. */
  src: string;
  /**
   * Poster still, painted the moment the element lays out so the frame is never
   * empty while the video streams in.
   */
  poster: string;
  /** VP9/WebM alternative, offered ahead of the MP4 where one exists. */
  webmSrc?: string;
  /**
   * `eager` starts fetching with the document — reserve it for the video in the
   * first viewport. `lazy` waits until the element is near the viewport so
   * below-the-fold videos stop competing with the hero for bandwidth.
   */
  loading?: "eager" | "lazy";
  className?: string;
  style?: React.CSSProperties;
  /** Decorative background media is hidden from assistive tech by default. */
  ariaHidden?: boolean;
}

/**
 * Muted, looping background video with a poster-first loading strategy.
 *
 * Every background video on the site used to mount with `autoPlay` and no
 * `poster`, so a page with several of them raced to download all of them at
 * once and showed an empty box until the first bytes arrived. This renders the
 * poster immediately and only attaches the video sources when the section is
 * actually approaching the viewport.
 */
export default function BackgroundVideo({
  src,
  poster,
  webmSrc,
  loading = "lazy",
  className,
  style,
  ariaHidden = true,
}: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  // Eager videos render their <source> tags during SSR, so the browser's
  // preload scanner can start fetching before React hydrates.
  const [active, setActive] = useState(loading === "eager");

  useEffect(() => {
    if (active) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // No observer to lean on: fall back to loading right after paint rather
      // than never showing the video at all.
      const t = setTimeout(() => setActive(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      // Start fetching a little before the section scrolls in, so playback is
      // already running by the time it is on screen.
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    // Autoplay policies key off the property, not just the attribute.
    el.muted = true;
    // The <source> children only appear once active, so point the element at them.
    if (!el.currentSrc) el.load();
    el.play().catch(() => {});
  }, [active]);

  return (
    <video
      ref={ref}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload={loading === "eager" ? "auto" : "none"}
      className={className}
      style={style}
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
    >
      {active && webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
      {active ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
