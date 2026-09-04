"use client";

import React, { useEffect, useRef } from "react";

export interface LottieSplashSectionProps {
  id?: string;
  /** Path to the Lottie JSON in /public. */
  path: string;
  /** Frame background colour behind the animation. */
  backgroundColor: string;
  speed?: number;
  children?: React.ReactNode;
}

/**
 * Full-bleed animated splash frame (views 2, 7 and 9).
 *
 * The animation is authored on the 1440x810 Figma frame and carries its title
 * as vector text, so it is always fitted whole and the section takes the
 * artboard's 16:9 aspect ratio. Any residual band is the same flat colour as
 * the artboard's own background, so the frame still reads as full-bleed.
 */
export default function LottieSplashSection({
  id,
  path,
  backgroundColor,
  speed = 0.5,
  children,
}: LottieSplashSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: import("lottie-web").AnimationItem | null = null;
    let isMounted = true;
    let started = false;

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

    // Every splash section sits below the fold, but the animation JSON is
    // 50-220KB and pulls in lottie-web on top of that. Holding both back until
    // the section is nearly in view keeps them from competing with the hero
    // video for the first screen; the animation is still running well before
    // the visitor scrolls to it.
    const start = () => {
      if (started) return;
      started = true;
      loadAnimation();
    };

    const el = containerRef.current;
    let io: IntersectionObserver | null = null;

    if (!el || typeof IntersectionObserver === "undefined") {
      start();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            start();
          }
        },
        { rootMargin: "400px 0px" }
      );
      io.observe(el);
    }

    return () => {
      isMounted = false;
      io?.disconnect();
      if (anim) {
        anim.destroy();
      }
    };
  }, [path, speed]);

  return (
    <section id={id} className="section-frame splash-frame">
      <div className="section-frame__inner" style={{ backgroundColor }}>
        <div ref={containerRef} className="section-media" aria-hidden="true" />
        {children}
      </div>
    </section>
  );
}
