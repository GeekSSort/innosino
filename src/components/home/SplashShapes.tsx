import React from "react";

/**
 * Portrait composition for the splash frames, traced from the 744x1133 Figma
 * frame (node 1498-20106).
 *
 * The landscape Lottie is authored on a 1440x810 artboard with its title baked
 * in as vector text, so on a portrait viewport it can only ever be fitted whole
 * — which left the rest of the frame as flat background colour. These are the
 * same shapes laid out for portrait, drawn as one `slice`-scaled SVG so the
 * composition covers any aspect ratio rather than letterboxing. The title is
 * left to HTML (`.splash-headline`) so it stays selectable and picks up the
 * real webfont.
 *
 * Coordinates are the Figma frame's, inset by half the 4px stroke: Figma
 * strokes the inside of the box (`box-sizing: border-box`) while SVG straddles
 * the path.
 */
export default function SplashShapes() {
  return (
    <svg
      className="splash-shapes"
      viewBox="0 0 744 1133"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="#ffffff" strokeWidth="4">
        {/* Rounded rect, top left. Corners 40px except the bottom left at 80px,
            so it cannot be a <rect rx>. */}
        <path
          d="M77 49 H388 A38 38 0 0 1 426 87 V348 A38 38 0 0 1 388 386
             H117 A78 78 0 0 1 39 308 V87 A38 38 0 0 1 77 49 Z"
        />

        {/* Vertical capsule, bottom left — bleeds past the bottom edge. */}
        <rect x="39" y="651" width="276" height="454" rx="138" />

        {/* Circle, bottom right — bleeds past both the right and bottom edges. */}
        <circle cx="601.5" cy="990.5" r="140.5" />

        {/* Two 516px hairlines at -72deg. Figma rotates a 516x4 bar about its
            top-left corner; these are the resulting centrelines, which run off
            the top and bottom edges and are clipped by the viewBox. */}
        <path d="M551.902 356.368 L711.357 -134.379" />
        <path d="M291.902 1209.368 L451.357 718.621" />
      </g>
    </svg>
  );
}
