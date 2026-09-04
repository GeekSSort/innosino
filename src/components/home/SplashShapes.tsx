"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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

/** Offsets are authored on the 1440-wide artboard; this frame is 744. */
const UNIT = 744 / 1440;

/**
 * The drift, lifted from the Lottie files' own layer keyframes so portrait
 * moves the way landscape does instead of sitting still. Both animations turn
 * out to use identical paths and differ only in loop length, so one table
 * serves both.
 *
 * Each entry is [time in seconds, x offset, y offset] from the shape's resting
 * place, in artboard units. Repeated values are the holds the original has
 * between each move.
 */
const DRIFT: Record<string, [number, number, number][]> = {
  rect: [[0, 0, 0], [0.2, 0, 0], [0.617, 298, 146], [0.817, 298, 146],
         [1.233, 1147.5, 568], [1.433, 1147.5, 568], [1.85, 249, 172],
         [2.45, 249, 172], [3.083, 0, 0], [3.283, 0, 0]],
  pill: [[0, 0, 0], [0.2, 0, 0], [0.617, 431.5, -37.5], [0.817, 431.5, -37.5],
         [1.233, 299.5, -510.5], [1.433, 299.5, -510.5], [1.85, 1114, 8],
         [2.45, 1114, 8], [3.083, 0, 0], [3.283, 0, 0]],
  ring: [[0, 0, 0], [0.2, 0, 0], [0.617, 450, -502], [0.817, 450, -502],
         [1.233, -520, -160], [1.433, -520, -160], [1.85, 347, -544],
         [2.45, 347, -544], [3.083, 0, 0], [3.283, 0, 0]],
  lineA: [[0, 0, 0], [0.2, 0, 0], [0.617, 515.7, -14.8], [0.817, 515.7, -14.8],
          [1.233, 281.7, 13.2], [1.433, 281.7, 13.2], [1.85, 174.7, 58.2],
          [2.45, 174.7, 58.2], [3.083, 0, 0], [3.283, 0, 0]],
  lineB: [[0, 0, 0], [0.2, 0, 0], [0.617, 125, -44], [0.817, 125, -44],
          [1.233, 296, -44], [1.433, 296, -44], [1.85, 155, -5],
          [2.45, 155, -5], [3.083, 0, 0], [3.283, 0, 0]],
};

/** The table's own loop length, so a different one can be retimed against it. */
const DRIFT_SECONDS = 3.283;

export interface SplashShapesProps {
  /** Loop length in seconds. The two Lotties run the same path at 3.28 and 2.67. */
  loopSeconds?: number;
}

export default function SplashShapes({ loopSeconds = DRIFT_SECONDS }: SplashShapesProps) {
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // The composition only renders below the breakpoint, so above it there is
      // nothing on screen to animate.
      const portrait = window.matchMedia("(max-width: 1023px)");
      if (!portrait.matches) return;

      const rate = loopSeconds / DRIFT_SECONDS;
      for (const [name, keys] of Object.entries(DRIFT)) {
        const el = rootRef.current!.querySelector(`[data-drift="${name}"]`);
        if (!el) continue;
        const tl = gsap.timeline({ repeat: -1 });
        for (let i = 1; i < keys.length; i++) {
          const [t, x, y] = keys[i];
          tl.to(el, {
            x: x * UNIT,
            y: y * UNIT,
            duration: (t - keys[i - 1][0]) * rate,
            ease: "power2.inOut",
          });
        }
      }
    },
    { scope: rootRef, dependencies: [loopSeconds] },
  );

  return (
    <svg
      ref={rootRef}
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
          data-drift="rect"
          d="M77 49 H388 A38 38 0 0 1 426 87 V348 A38 38 0 0 1 388 386
             H117 A78 78 0 0 1 39 308 V87 A38 38 0 0 1 77 49 Z"
        />

        {/* Vertical capsule, bottom left — bleeds past the bottom edge. */}
        <rect data-drift="pill" x="39" y="651" width="276" height="454" rx="138" />

        {/* Circle, bottom right — bleeds past both the right and bottom edges. */}
        <circle data-drift="ring" cx="601.5" cy="990.5" r="140.5" />

        {/* Two 516px hairlines at -72deg. Figma rotates a 516x4 bar about its
            top-left corner; these are the resulting centrelines, which run off
            the top and bottom edges and are clipped by the viewBox. */}
        <path data-drift="lineB" d="M551.902 356.368 L711.357 -134.379" />
        <path data-drift="lineA" d="M291.902 1209.368 L451.357 718.621" />
      </g>
    </svg>
  );
}
