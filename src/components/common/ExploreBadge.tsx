"use client";

import React from "react";
import Image from "next/image";

interface ExploreBadgeProps {
  onClick?: () => void;
}

export default function ExploreBadge({ onClick }: ExploreBadgeProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    window.scrollBy({
      top: window.innerHeight * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <div className="dock dock--explore">
      <div className="dock__inner">
        <button
          type="button"
          onClick={handleClick}
          className="explore-badge"
          aria-label="Explore us"
        >
          {/* White badge with the rotating "EXPLORE US" lockup and down arrow */}
          <span
            className="explore-badge__circle"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <svg
              viewBox="0 0 112 112"
              className="animate-[spin_14s_linear_infinite]"
              style={{ width: "100%", height: "100%", display: "block" }}
              aria-hidden="true"
            >
              <path
                id="exploreBadgeCircle"
                d="M 56, 56 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0"
                fill="none"
              />
              <text
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontSize: "10.378px",
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  fill: "#000000",
                }}
              >
                <textPath href="#exploreBadgeCircle" startOffset="0%">
                  EXPLORE US • EXPLORE US •
                </textPath>
              </text>
            </svg>

            <svg
              viewBox="0 0 112 112"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
              aria-hidden="true"
            >
              <path
                d="M56 35L56 77M56 77L46 67M56 77L66 67"
                stroke="#000000"
                strokeWidth="2.18"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>

          {/* Overlapping circuit thumbnail */}
          <span
            className="explore-badge__circle"
            style={{
              backgroundColor: "#000000",
              border: "4px solid rgba(239, 239, 239, 1)",
              boxShadow: "0 4px 25px rgba(0,0,0,0.6)",
            }}
          >
            <Image
              src="/homepage_assets/home_page round logo/right_logo.png"
              alt=""
              fill
              sizes="112px"
              style={{ objectFit: "cover", transform: "scale(1.1)" }}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
