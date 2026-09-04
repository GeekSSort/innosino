"use client";

import React, { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";

export interface BackgroundVideoProps {
  /** Optimised MP4 under /public. */
  src: string;
  /**
   * Poster still, painted the moment the element lays out so the frame is never
   * empty while the video streams in.
   */
  poster: string;
  /**
   * VP9/WebM alternative, offered ahead of the MP4 where one exists.
   *
   * Nothing supplies one right now: the three WebMs the site shipped came out
   * 2.4x larger than the re-encoded H.264 beside them, and because this is
   * offered first the browser would have picked the bigger file. Worth
   * restoring only with an encode that actually beats the MP4.
   */
  webmSrc?: string;
  /**
   * `eager` fetches as soon as the page has finished loading — reserve it for
   * the video in the first viewport. `lazy` waits until the element is near
   * the viewport so below-the-fold videos stop competing for bandwidth.
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
  const [active, setActive] = useState(false);

  /**
   * The hero's poster is the element that decides LCP on most pages here, and
   * a <video> whose sources are still withheld does not fetch its poster with
   * any urgency — deferring the video alone cost about 500ms of LCP on the
   * pages where the poster is the largest paint. This asks for it directly,
   * which emits a preload link into the document head.
   */
  if (loading === "eager") {
    preload(poster, { as: "image", fetchPriority: "high" });
  }

  /**
   * Even the hero video waits for the page to finish loading.
   *
   * It used to render its <source> during SSR so the preload scanner could
   * start immediately, which on a phone meant a 3 MB download racing the
   * element that actually decides LCP: on /blogs the hero video starved the
   * featured image and pushed LCP to 11s. The poster is what the visitor
   * sees either way, so the video costs nothing by arriving a moment later.
   */
  useEffect(() => {
    if (loading !== "eager" || active) return;
    const start = () => setActive(true);
    const idle = () => {
      // Safari has no requestIdleCallback; a short timer is close enough.
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(start, { timeout: 1500 });
      } else {
        window.setTimeout(start, 200);
      }
    };
    if (document.readyState === "complete") {
      idle();
      return;
    }
    window.addEventListener("load", idle, { once: true });
    return () => window.removeEventListener("load", idle);
  }, [loading, active]);

  useEffect(() => {
    if (active || loading === "eager") return;
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
      /* `auto` on the hero, but only the poster can act on it: with no
         <source> children yet there is no video data to fetch, and the poster
         is the element that decides LCP on these pages. Setting this to `none`
         deprioritised the poster too and cost ~600ms of LCP. */
      preload={loading === "eager" || active ? "auto" : "none"}
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
