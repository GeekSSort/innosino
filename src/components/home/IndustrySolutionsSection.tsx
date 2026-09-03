"use client";

import React, { useEffect, useRef } from "react";

export default function IndustrySolutionsSection() {
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
          path: "/industry_solutions_animation.json",
        });
        anim.setSpeed(0.5);
      } catch (err) {
        console.error("Failed to load Industry Solutions Lottie animation:", err);
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
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* Lottie Animated Background Shapes */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1440px",
          height: "810px",
          pointerEvents: "none",
        }}
      />

      {/* Industry Solutions Text (I1498:14234;904:2875):
          x: 335, y: 372, w: 637, h: 83, font: Cal Sans 64px, uppercase, fill: #FFFFFF */}
      <div
        style={{
          position: "absolute",
          left: "335px",
          top: "372px",
          width: "637px",
          height: "83px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "'Cal Sans', 'Outfit', sans-serif",
            fontSize: "64px",
            fontWeight: 400,
            lineHeight: "1.2",
            textAlign: "left",
            textTransform: "uppercase",
            color: "#FFFFFF",
            whiteSpace: "nowrap",
          }}
        >
          INDUSTRY SOLUTIONS
        </h2>
      </div>
    </section>
  );
}


