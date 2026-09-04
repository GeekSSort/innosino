"use client";

import React, { useEffect, useRef } from "react";
import SplashShapes from "./SplashShapes";

/** Below this the portrait composition replaces the landscape animation. */
const DESKTOP = "(min-width: 1024px)";

export interface LottieSplashSectionProps {
  id?: string;
  /** Path to the Lottie JSON in /public. */
  path: string;
  /** Frame background colour behind the animation. */
  backgroundColor: string;
  speed?: number;
  /**
   * The artboard's baked-in title. Supplying it opts the frame into the
   * portrait composition (`SplashShapes`), which needs the title as real text
   * because it draws only the shapes.
   */
  title?: string;
  /**
   * Loop length of the animation's shape drift, which the portrait composition
   * reuses so it moves at the same pace as the landscape one.
   */
  loopSeconds?: number;
  children?: React.ReactNode;
}

/**
 * Full-bleed animated splash frame (views 2, 7 and 9).
 *
 * On landscape the animation is fitted whole: it is authored on the 1440x810
 * Figma frame and carries its title as vector text, so the section takes the
 * artboard's 16:9 aspect ratio.
 *
 * A portrait viewport is far taller than 16:9, so fitting that artboard whole
 * left most of the frame as flat background. Frames given a `title` swap to the
 * portrait layout from Figma below 1024px instead. The JSON is never fetched
 * there — SplashShapes carries the drift from the same layer keyframes, so the
 * motion survives without 200KB+ of JSON and lottie-web on a phone.
 */
export default function LottieSplashSection({
  id,
  path,
  backgroundColor,
  speed = 0.5,
  title,
  loopSeconds,
  children,
}: LottieSplashSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: import("lottie-web").AnimationItem | null = null;
    let isMounted = true;
    let started = false;
    let inView = false;

    async function loadAnimation() {
      try {
        const lottie = (await import("lottie-web")).default;
        if (!isMounted || !containerRef.current) return;

        anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path,
          rendererSettings: {
            // `meet`, never `slice`: the titles ("CORE SERVICES", "FEATURED
            // PROJECT") are vector text baked into the 1440x810 artboard, so
            // any horizontal crop cuts them. The frame is sized to the
            // artboard's aspect ratio instead (see `.splash-frame`), which
            // makes the fit edge-to-edge rather than letterboxed.
            preserveAspectRatio: "xMidYMid meet",
          },
        });
        anim.setSpeed(speed);
      } catch (err) {
        console.error("Failed to load Lottie animation:", err);
      }
    }

    const mq = window.matchMedia(DESKTOP);

    // Every splash section sits below the fold, but the animation JSON is
    // 50-220KB and pulls in lottie-web on top of that. Holding both back until
    // the section is nearly in view keeps them from competing with the hero
    // video for the first screen; the animation is still running well before
    // the visitor scrolls to it.
    const start = () => {
      // A frame with a portrait composition does not show the animation at all
      // below the breakpoint, so there is nothing to fetch.
      if (started || (title && !mq.matches)) return;
      started = true;
      loadAnimation();
    };

    const el = containerRef.current;
    let io: IntersectionObserver | null = null;

    if (!el || typeof IntersectionObserver === "undefined") {
      inView = true;
      start();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            inView = true;
            start();
          }
        },
        { rootMargin: "400px 0px" }
      );
      io.observe(el);
    }

    // Rotating a tablet into landscape crosses the breakpoint, so a frame that
    // held the animation back still picks it up.
    const onBreakpoint = () => {
      if (inView) start();
    };
    mq.addEventListener("change", onBreakpoint);

    return () => {
      isMounted = false;
      io?.disconnect();
      mq.removeEventListener("change", onBreakpoint);
      if (anim) {
        anim.destroy();
      }
    };
  }, [path, speed, title]);

  return (
    <section
      id={id}
      className={
        title ? "section-frame splash-frame splash-frame--portrait" : "section-frame splash-frame"
      }
    >
      <div className="section-frame__inner" style={{ backgroundColor }}>
        <div ref={containerRef} className="section-media" aria-hidden="true" />
        {title && (
          <>
            <SplashShapes loopSeconds={loopSeconds} />
            <div className="splash-headline splash-headline--portrait">
              <h2 className="splash-headline__text">{title}</h2>
            </div>
          </>
        )}
        {children}
      </div>
    </section>
  );
}
