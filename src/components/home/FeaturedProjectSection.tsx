"use client";

import React, { useEffect, useRef } from "react";

export default function FeaturedProjectSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: import("lottie-web").AnimationItem | null = null;
    let isMounted = true;

    async function loadAnimation() {
      try {
        const lottie = (await import("lottie-web")).default;
        if (!isMounted || !containerRef.current) return;

        anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/featured_project_animation.json",
        });
        anim.setSpeed(0.5);
      } catch (err) {
        console.error("Failed to load Featured Project Lottie animation:", err);
      }
    }

    loadAnimation();

    return () => {
      isMounted = false;
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "1440px",
        height: "810px",
        overflow: "hidden",
        backgroundColor: "rgba(255, 190, 3, 1)", // rgb(1, 0.7451, 0.0118) -> #FFBE03
        margin: "0 auto",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1440px",
          height: "810px",
        }}
      />
    </section>
  );
}

