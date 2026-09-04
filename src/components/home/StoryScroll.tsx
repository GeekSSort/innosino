"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Turns a run of full-viewport `.section-frame`s into a story scroll: each
 * frame pins while the next one swings in from 30deg and settles flat over it,
 * instead of the two simply sliding past each other.
 *
 * It drives the existing sections rather than wrapping them in a layout of its
 * own — the panel that rotates is each frame's `.section-frame__inner`, and the
 * frame's own `overflow: hidden` is what clips it, so the pinned frame below
 * shows through the corner the tilted panel has not covered yet.
 *
 * Only pass frames that are a single viewport tall. Long scrolling sections
 * (the stacking project cards, the carousel/footer) must stay outside: pinning
 * them would strand their own sticky children.
 */
export default function StoryScroll({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const sections = gsap.utils.toArray<HTMLElement>(
        rootRef.current!.querySelectorAll(":scope > .section-frame"),
      );
      if (sections.length < 2) return;

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const panel = section.querySelector<HTMLElement>(".section-frame__inner");

        // Every frame but the first swings in; the tilt is driven straight off
        // the scroll position so it tracks the finger/wheel exactly.
        if (panel && i > 0) {
          gsap.fromTo(
            panel,
            { rotation: 30 },
            {
              rotation: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top 25%",
                scrub: true,
              },
            },
          );
        }

        // Every frame but the last holds still while its successor covers it.
        if (i < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <div ref={rootRef} aria-label={ariaLabel}>
      {children}
    </div>
  );
}
