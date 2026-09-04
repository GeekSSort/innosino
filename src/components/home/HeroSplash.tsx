"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SPLASH_SEEN_KEY } from "@/content/splash";

/**
 * The hero intro, from the "Splash Animation For Hero Section" component set
 * (Figma node 811:11): nine variants wired together with Smart Animate.
 *
 * Every coordinate below is the Figma one on the 1440x810 artboard, and the
 * stage is scaled to the viewport as a whole, so the composition is exactly the
 * design at any size. Sizes are animated as width/height rather than `scale`
 * on purpose: the shapes carry a 4px stroke that must stay 4px, which a scale
 * transform would thicken.
 */

/** The artboard the variants are drawn on. */
const ART_W = 1440;
const ART_H = 810;

/** Multiply every duration. >1 is faster; the design's own pace is 1. */
const SPEED = 1;

const GREY = "#D9D9D9";
const SMOKE = "#F1F1F1";
const ORANGE = "#FF7018";

const DISC_DARK =
  "inset 0 1px 35px rgba(0, 0, 0, 0.35), 0 -2px 25px rgba(0, 0, 0, 0.5)";
const DISC_GLOW =
  "inset 0 1px 35px rgba(255, 112, 25, 1), 0 -2px 25px rgba(255, 112, 24, 0.5)";

type Props = Record<string, number | string>;
type State = Record<string, Props>;

/**
 * One entry per Figma variant. Keys are element names; values are the props
 * that variant sets. Anything a variant leaves out simply holds its previous
 * value, which is what Smart Animate does.
 *
 * `x`/`y` are the element's top-left on the artboard, so every element is
 * positioned at 0,0 and moved by transform.
 */
const STATES: Record<number, State> = {
  // Off-screen on every edge, waiting to drift in. Visually identical to
  // variant 1, which is a blank white frame.
  2: {
    rect: { x: -295, y: -458, width: 600, height: 458, borderColor: GREY },
    pill: { x: -603, y: 498, width: 600, height: 312, borderColor: GREY },
    ring: { x: 535, y: 813, width: 370, height: 370, borderColor: GREY },
    lineH: { x: -519, y: 432, backgroundColor: GREY },
    lineA: { x: 259.27, y: 1316.52, backgroundColor: GREY },
    lineB: { x: 557, y: -5.25, backgroundColor: GREY },
    disc: { x: 688, y: -67, width: 64, height: 64, opacity: 0,
            backgroundColor: "#000000", boxShadow: DISC_DARK },
    mark: { x: 1760, y: 210, width: 320, height: 320, backgroundColor: GREY, opacity: 1 },
    lockup: { x: 305, y: 254, width: 840, height: 280, opacity: 0 },
  },

  // The shapes have drifted in and the logomark reads as a grey ghost.
  3: {
    rect: { x: -295, y: -173 },
    pill: { x: -295, y: 506 },
    ring: { x: 535, y: 654 },
    lineH: { x: -211, y: 424 },
    lineA: { x: 246, y: 1045.75 },
    lineB: { x: 505, y: 212.75 },
    disc: { opacity: 1 },
    mark: { x: 305, y: 210 },
  },

  // The disc grows out of nothing and the mark turns brand orange inside it.
  4: {
    rect: { y: -187, borderColor: SMOKE },
    pill: { y: 507, borderColor: SMOKE },
    ring: { borderColor: SMOKE },
    lineH: { y: 424 },
    lineA: { y: 1054.75 },
    disc: { x: 217, y: 158, width: 450, height: 450 },
    mark: { x: 282, y: 223, backgroundColor: ORANGE },
  },

  // The disc inverts to white and lights up.
  5: {
    lineH: { y: 420 },
    lineA: { y: 1044.75 },
    disc: { backgroundColor: "#FFFFFF", boxShadow: DISC_GLOW },
  },

  // The disc swallows the frame, the shapes come back in brand orange and the
  // wordmark takes the logomark's place. Disc geometry is filled in at runtime:
  // 2008 covers the artboard but not necessarily the viewport.
  6: {
    rect: { y: -187, borderColor: ORANGE },
    pill: { y: 506, borderColor: ORANGE },
    ring: { y: 596, width: 320, height: 320, borderColor: ORANGE },
    lineH: { y: 420, backgroundColor: ORANGE },
    lineA: { y: 1024.75, backgroundColor: ORANGE },
    lineB: { backgroundColor: ORANGE },
    disc: { backgroundColor: "#000000", boxShadow: DISC_DARK },
    mark: { opacity: 0 },
    lockup: { opacity: 1 },
  },

  // The shapes head back off-frame and the wordmark grows to full bleed.
  7: {
    rect: { x: -600, y: -377, height: 400 },
    pill: { x: -601, y: 589, height: 220 },
    ring: { y: 818 },
    lineH: { x: -517, y: 431 },
    lineA: { x: 254.27, y: 1305.52 },
    lineB: { x: 505, y: -5.25 },
    lockup: { x: 0, y: 165, width: 1440, height: 480 },
  },

  // Everything clears to black, ready for the hero underneath.
  8: {
    rect: { opacity: 0 },
    pill: { opacity: 0 },
    ring: { opacity: 0 },
    lineH: { opacity: 0 },
    lineA: { opacity: 0 },
    lineB: { opacity: 0 },
    lockup: { opacity: 0 },
  },
};

/** The Figma spring for each step, and how long Figma says it runs. */
const STEPS: { to: number; ms: number; spring: [number, number, number] }[] = [
  { to: 3, ms: 1022, spring: [1, 100, 15] },
  { to: 4, ms: 833, spring: [1, 80, 20] },
  { to: 5, ms: 639, spring: [1, 100, 15] },
  { to: 6, ms: 1022, spring: [1, 100, 15] },
  { to: 7, ms: 1022, spring: [1, 100, 15] },
  { to: 8, ms: 500, spring: [1, 100, 20] },
];

/**
 * Figma springs as a GSAP ease. Solving the damped-oscillator ODE reproduces
 * the overshoot of the underdamped ones (stiffness 100 / damping 15 sits at
 * zeta 0.75) rather than approximating it with a bezier. Normalised by the
 * value at t=duration so the ease still lands exactly on 1 — an overdamped
 * spring has not quite settled by the duration Figma reports.
 */
function springEase(mass: number, stiffness: number, damping: number, ms: number) {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const T = ms / 1000;

  const raw = (p: number) => {
    const t = p * T;
    const decay = Math.exp(-zeta * w0 * t);
    if (zeta < 1) {
      const wd = w0 * Math.sqrt(1 - zeta * zeta);
      return 1 - decay * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
    }
    if (zeta === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    const wa = w0 * Math.sqrt(zeta * zeta - 1);
    return 1 - decay * (Math.cosh(wa * t) + ((zeta * w0) / wa) * Math.sinh(wa * t));
  };

  const end = raw(1);
  return (p: number) => raw(p) / end;
}

/** Storage can throw outright (Safari private mode); an intro is not worth it. */
function seen() {
  try {
    return sessionStorage.getItem(SPLASH_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export default function HeroSplash() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  /**
   * Whether this instance is the one playing the intro, decided once and then
   * held. The effect can run more than once for a single mount -- StrictMode
   * does exactly that in development -- and without this the second run would
   * read back the flag the first run had just written and skip its own intro.
   * A genuine remount is a new instance with a fresh ref, so returning to the
   * home page still skips.
   */
  const playing = useRef<boolean | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current!;
      const el = (name: string) =>
        root.querySelector<HTMLElement>(`[data-splash="${name}"]`)!;

      // Someone who asked for less motion gets the hero, not a five-second
      // intro. Nothing here has to run for the page to work.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDone(true);
        return;
      }

      // Once a tab. Coming back to the home page from anywhere else in the
      // site goes straight to the hero, and so does a reload. useGSAP runs
      // this before the browser paints, so a return from another page never
      // shows the overlay at all.
      if (playing.current === null) {
        playing.current = !seen();
        if (playing.current) {
          // Marked on the way in, not on completion: someone who leaves
          // halfway through has still seen it.
          try {
            sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
          } catch {
            // Storage unavailable. The intro just plays every time.
          }
        }
      }
      if (!playing.current) {
        setDone(true);
        return;
      }

      /**
       * The artboard is a landscape 16:9. Landscape viewports cover it;
       * portrait ones fit it to the width instead, because covering would crop
       * away the very things the intro is about — the disc sits at 31% across
       * and the wordmark is full-bleed, and no single crop keeps both.
       * Whatever the stage does not reach is the overlay's own background.
       */
      const layout = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const scale =
          vw / vh >= ART_W / ART_H
            ? Math.max(vw / ART_W, vh / ART_H)
            : vw / ART_W;
        gsap.set(el("stage"), { scale, xPercent: -50, yPercent: -50 });

        // 2008px covers the artboard but not a tall viewport, so the disc's
        // final size is whatever actually reaches the far corner, about its
        // own centre.
        const cover = (cx: number, cy: number) => {
          const halfW = vw / scale / 2;
          const halfH = vh / scale / 2;
          const dx = Math.abs(cx - ART_W / 2) + halfW;
          const dy = Math.abs(cy - ART_H / 2) + halfH;
          return Math.max(2008, 2 * Math.hypot(dx, dy));
        };
        for (const [state, cy] of [[6, 405], [7, 638]] as const) {
          const d = cover(776, cy);
          STATES[state].disc = {
            ...STATES[state].disc,
            width: d,
            height: d,
            x: 776 - d / 2,
            y: cy - d / 2,
          };
        }
      };
      layout();

      gsap.set(el("stage"), { transformOrigin: "50% 50%" });
      for (const [name, props] of Object.entries(STATES[2])) {
        gsap.set(el(name), props);
      }
      // The two hairlines are 516x4 bars pivoted on their own top-left corner.
      gsap.set([el("lineA"), el("lineB")], { rotation: -72, transformOrigin: "0 0" });
      gsap.set(el("stage"), { visibility: "visible" });

      const tl = gsap.timeline({ onComplete: () => setDone(true) });

      // Variant 1 is a blank white frame and 2 is the same frame with
      // everything parked off-screen, so the sequence opens on a beat of white.
      tl.to({}, { duration: 0.5 / SPEED });

      for (const step of STEPS) {
        const ease = springEase(...step.spring, step.ms);
        const duration = step.ms / 1000 / SPEED;
        const at = tl.duration();
        // Smart Animate uses the destination variant's layer order for the
        // whole step, and from variant 6 the disc is the backdrop rather than
        // an object on it — without this the shapes stay buried under it.
        if (step.to === 6) tl.set(el("disc"), { zIndex: 0 }, at);
        for (const [name, props] of Object.entries(STATES[step.to])) {
          tl.to(el(name), { ...props, duration, ease }, at);
        }
        // Once the disc has swallowed the frame the ground really is black, so
        // the overlay stops being white behind it. The disc is clipped to the
        // artboard, which on portrait is only a band of the screen, so this
        // carries the black out to the edges rather than leaving white margins.
        // It runs over the tail of the step, by which point the spring has
        // already taken the disc to full size and covered it on landscape.
        if (step.to === 6) {
          tl.to(
            root,
            { backgroundColor: "#000000", duration: duration * 0.35, ease: "power2.in" },
            at + duration * 0.65,
          );
        }
      }

      // Figma cuts straight to the hero; a short dissolve is kinder than a hard
      // cut out of full black and reads the same.
      tl.to(root, { opacity: 0, duration: 0.35, ease: "power2.inOut" });

      // Five seconds is a long time to hold someone who wants the page.
      const skip = () => tl.progress(1);
      const opts = { passive: true } as const;
      window.addEventListener("pointerdown", skip, opts);
      window.addEventListener("keydown", skip);
      window.addEventListener("wheel", skip, opts);
      window.addEventListener("touchmove", skip, opts);
      window.addEventListener("resize", layout);

      return () => {
        window.removeEventListener("pointerdown", skip);
        window.removeEventListener("keydown", skip);
        window.removeEventListener("wheel", skip);
        window.removeEventListener("touchmove", skip);
        window.removeEventListener("resize", layout);
      };
    },
    { scope: rootRef },
  );

  // The page must not scroll under the overlay while it plays.
  React.useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  if (done) return null;

  return (
    <div ref={rootRef} className="splash" aria-hidden="true">
      <div className="splash__stage" data-splash="stage">
        <div className="splash__shape splash__rect" data-splash="rect" />
        <div className="splash__shape splash__pill" data-splash="pill" />
        <div className="splash__shape splash__ring" data-splash="ring" />
        <div className="splash__bar" data-splash="lineH" />
        <div className="splash__bar" data-splash="lineA" />
        <div className="splash__bar" data-splash="lineB" />
        <div className="splash__disc" data-splash="disc" />
        <div className="splash__mark" data-splash="mark" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="splash__lockup"
          data-splash="lockup"
          src="/homepage_assets/splash-wordmark.png"
          alt=""
        />
      </div>
    </div>
  );
}
