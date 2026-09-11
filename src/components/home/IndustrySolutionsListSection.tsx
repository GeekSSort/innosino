"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import SiteFooter from "@/components/common/SiteFooter";
import type { HomePageData, SiteSettings } from "@/sanity/queries";



export default function IndustrySolutionsListSection({
  industriesList,
  industriesLede,
  settings,
}: {
  industriesList: HomePageData["industries"];
  industriesLede: string;
  settings: SiteSettings;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Continuous marquee. The scroll distance is measured from the rendered
   * track rather than assumed from a fixed 400px card pitch, so the loop stays
   * seamless when the card width changes with the viewport.
   *
   * Driven by elapsed time, not by the frame: advancing a fixed amount per
   * frame would run at whatever the display refreshes at — half speed on a
   * 30Hz throttle, double on a 120Hz phone.
   *
   * The Figma reference moves the track 1600px across 8s, which is 200px/s and
   * sends a ~370px card past in under two seconds — too fast to read the name
   * under it. Paced to the card instead: one card roughly every five seconds.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const PX_PER_SECOND = 80;
    let offset = 0;
    let last = performance.now();
    let frameId = 0;

    const step = (now: number) => {
      const elapsed = (now - last) / 1000;
      last = now;
      // One third of the track = one full copy of the list (it is tripled).
      const loopWidth = track.scrollWidth / 3;
      if (loopWidth > 0) {
        offset = (offset + PX_PER_SECOND * elapsed) % loopWidth;
        track.style.transform = `translateX(-${offset}px)`;
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Tripled for a seamless loop.
  const displayItems = [
    ...industriesList,
    ...industriesList,
    ...industriesList,
  ];

  return (
    <section
      className="flow-section"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="container">
        <h2 className="section-lede">{industriesLede}</h2>
      </div>

      {/* Full-bleed marquee: its left edge lines up with the content container
          while the track itself is free to run past the right edge. */}
      <div
        className="marquee"
        style={{ marginBlock: "clamp(2rem, 3.9vw, 3rem)" }}
        aria-label="Industries we serve"
      >
        <div className="marquee__track" ref={trackRef}>
          {displayItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="marquee__item"
              aria-hidden={index >= industriesList.length}
            >
              <div className="marquee__thumb">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 60vw, 370px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "var(--fs-h4)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <SiteFooter settings={settings} />
      </div>
    </section>
  );
}
