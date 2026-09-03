"use client";

import React from "react";
import { motion } from "framer-motion";

export default function IndustrySolutionsSection() {
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
      {/* Frame 8 (I1498:14234;904:2871): Top-left rounded card outline
          Base geometry: x: -295, y: -187, w: 600, h: 458, border: 4px solid #FFFFFF,
          radii: tl: 40, tr: 40, br: 40, bl: 80
          Animated moving smoothly from corner area */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 35, -25, 0],
          y: [0, -30, 25, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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

      {/* Frame 7 (I1498:14234;904:2874): Top angled white line
          Base geometry: x: 476, y: 313.745, w: 516, h: 4, rotation: 72deg, fill: #FFFFFF
          Animated float */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 25, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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

      {/* Frame 9 (I1498:14234;904:2870): Bottom-left pill outline
          Base geometry: x: -295, y: 506, w: 600, h: 312, border: 4px solid #FFFFFF, radius: 1000px
          Animated smooth drifting */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 25, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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

      {/* Frame 4 (I1498:14234;904:2873): Bottom angled white line
          Base geometry: x: 260.27, y: 987.52, w: 516, h: 4, rotation: 72deg, fill: #FFFFFF
          Animated float */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 25, -25, 0],
          y: [0, -20, 25, 0],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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

      {/* Frame 2 (I1498:14234;904:2872): Bottom circle outline
          Base geometry: x: 535, y: 596, w: 320, h: 320, border: 4px solid #FFFFFF, radius: 1000px
          Animated drifting between corner areas */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 30, -25, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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

