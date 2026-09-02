"use client";

import React from "react";

export default function FeaturedProjectSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "1440px",
        height: "810px",
        overflow: "hidden",
        backgroundColor: "rgba(255, 190, 3, 1)", // rgb(1, 0.745, 0.012) -> #FFBE03
        margin: "0 auto",
      }}
    >
      {/* Frame 8 (I1498:14124;843:387): Top-left rounded card outline
          x: -295, y: -187, w: 600, h: 458, border: 4px solid #FFFFFF,
          radii: tl: 40, tr: 40, br: 40, bl: 80 */}
      <div
        style={{
          position: "absolute",
          left: "-295px",
          top: "-187px",
          width: "600px",
          height: "458px",
          border: "4px solid #FFFFFF",
          borderRadius: "40px 40px 40px 80px",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      />

      {/* Frame 7 (I1498:14124;843:390): Top angled white line
          x: 476, y: 313.745, w: 516, h: 4, rotation: 72deg, fill: #FFFFFF,
          relativeTransform: [[0.309, 0.951, 476], [-0.951, 0.309, 313.745]] */}
      <div
        style={{
          position: "absolute",
          left: "476px",
          top: "313.745px",
          width: "516px",
          height: "4px",
          backgroundColor: "#FFFFFF",
          transformOrigin: "0 0",
          transform: "matrix(0.309, -0.951, 0.951, 0.309, 0, 0)",
          pointerEvents: "none",
        }}
      />

      {/* Featured Project Text (I1498:14124;843:391):
          x: 335, y: 372, w: 547, h: 83, font: Cal Sans 64px, uppercase, fill: #FFFFFF */}
      <div
        style={{
          position: "absolute",
          left: "335px",
          top: "372px",
          width: "547px",
          height: "83px",
          pointerEvents: "none",
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
          FEATURED PROJECT
        </h2>
      </div>

      {/* Frame 9 (I1498:14124;843:386): Bottom-left pill outline
          x: -295, y: 506, w: 600, h: 312, border: 4px solid #FFFFFF, radius: 1000px */}
      <div
        style={{
          position: "absolute",
          left: "-295px",
          top: "506px",
          width: "600px",
          height: "312px",
          border: "4px solid #FFFFFF",
          borderRadius: "1000px",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      />

      {/* Frame 4 (I1498:14124;843:389): Bottom angled white line
          x: 260.27, y: 987.52, w: 516, h: 4, rotation: 72deg, fill: #FFFFFF,
          relativeTransform: [[0.309, 0.951, 260.27], [-0.951, 0.309, 987.52]] */}
      <div
        style={{
          position: "absolute",
          left: "260.27px",
          top: "987.52px",
          width: "516px",
          height: "4px",
          backgroundColor: "#FFFFFF",
          transformOrigin: "0 0",
          transform: "matrix(0.309, -0.951, 0.951, 0.309, 0, 0)",
          pointerEvents: "none",
        }}
      />

      {/* Frame 2 (I1498:14124;843:388): Bottom circle outline
          x: 535, y: 596, w: 320, h: 320, border: 4px solid #FFFFFF, radius: 1000px */}
      <div
        style={{
          position: "absolute",
          left: "535px",
          top: "596px",
          width: "320px",
          height: "320px",
          border: "4px solid #FFFFFF",
          borderRadius: "1000px",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

