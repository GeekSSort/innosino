"use client";

import React from "react";
import Image from "next/image";

interface ExploreBadgeProps {
  onClick?: () => void;
  styleOverride?: React.CSSProperties;
}

export default function ExploreBadge({ onClick, styleOverride }: ExploreBadgeProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollBy({
        top: window.innerHeight * 0.85,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",
        left: "min(calc(100vw - 206px), calc(50% + 429px))",
        top: "min(604px, calc(100vh - 120px))",
        width: "186px",
        height: "112px",
        cursor: "pointer",
        zIndex: 9999,
        userSelect: "none",
        ...styleOverride,
      }}
      role="button"
      tabIndex={0}
      aria-label="Explore us"
    >
      {/* Frame 1618873607: White Circular Badge (left: 0, top: 0, width: 112px, height: 112px, border-radius: 100px) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "112px",
          height: "112px",
          borderRadius: "100px",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {/* Vector Arrow: width 24px, height 42px, rotation -180 deg */}
        <div
          style={{
            position: "absolute",
            width: "24px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <svg
            width="24"
            height="42"
            viewBox="0 0 24 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L12 38M12 38L4 30M12 38L20 30"
              stroke="#000000"
              strokeWidth="2.18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Circular Rotating EXPLORE US Typography */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            className="w-full h-full animate-[spin_14s_linear_infinite]"
            viewBox="0 0 112 112"
            style={{ width: "112px", height: "112px" }}
          >
            <path
              id="figmaCirclePath"
              d="M 56, 56 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0"
              fill="none"
            />
            <text
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "10.378px",
                fontWeight: 600,
                letterSpacing: "0.26em",
                fill: "#000000",
                textTransform: "uppercase",
              }}
            >
              <textPath href="#figmaCirclePath" startOffset="0%">
                EXPLORE US • EXPLORE US •
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Frame 1618873608: Circuit Image Circular Badge (left: 74px relative to Group = 1223 - 1149, top: 0, width: 112px, height: 112px) */}
      <div
        style={{
          position: "absolute",
          left: "74px",
          top: 0,
          width: "112px",
          height: "112px",
          borderRadius: "100px",
          backgroundColor: "#000000",
          border: "4px solid rgba(239, 239, 239, 1)",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow: "0 4px 25px rgba(0,0,0,0.6)",
        }}
      >
        <Image
          src="/homepage_assets/home_page round logo/right_logo.png"
          alt="Chip Graphic"
          fill
          sizes="112px"
          style={{
            objectFit: "cover",
            transform: "scale(1.1)",
          }}
        />
      </div>
    </div>
  );
}
