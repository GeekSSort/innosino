"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import type { Service } from "@/content/services";
import { chatWidget, copyright, ctaBanner, footerLinks } from "@/content/site";
import { industriesLede } from "@/content/home";

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

/**
 * The hero card's two states, from the Service Hero Section set (Figma node
 * 1057:8832). Variant 01 rests it centred and hanging below the hero at
 * (234.7, 548.7), 970.6x546.6, 18px radius; variant 02 has it at (944, -856),
 * turned 45deg and dissolved out.
 *
 * The move is expressed against the card's own size rather than the 1440 frame
 * -- 709/970.6 across and 1405/546.6 up -- so it travels the same way at any
 * width.
 */
/** The transition's easing, cubic-bezier(0, 0, 0.58, 1). */
const FIGMA_EASE = CustomEase.create("figmaOut", "M0,0 C0,0 0.58,1 1,1");

/**
 * Where each FAQ row starts, by position. Figma reports rotation
 * counter-clockwise in radians, so 0.41888 rad is a 24deg tilt that becomes
 * -24 in CSS; the nudge on rows 2 and 3 is their origin gap, x taken against
 * the 1170 row so it holds at any width.
 */
const FAQ_ENTRY: { rot: number; x: number; y: number }[] = [
  { rot: -24, x: 0, y: 0 },
  { rot: 24, x: -5.96, y: -66.48 },
  { rot: 24, x: -5.96, y: -66.48 },
  { rot: -24, x: 0, y: 0 },
  { rot: 24, x: 0, y: 0 },
];

/** Off-frame starts for the Why INNOSINO points, by grid position. */
const WHY_ENTRY: Record<number, { x: number; y: number }> = {
  1: { x: -170.7, y: 127.3 },
  2: { x: 148.1, y: 77.7 },
  5: { x: 84.2, y: 112.9 },
};

/** The on-demand transition's easing, cubic-bezier(0.42, 0, 0.58, 1). */
const FIGMA_EASE_IN_OUT = CustomEase.create(
  "figmaInOut",
  "M0,0 C0.42,0 0.58,1 1,1",
);

const CARD_EXIT = { xPercent: 73, yPercent: -257, rotation: 45 };






// Industries for auto-slider
const industriesList = [
  { title: "Consumer Electronics", image: "/homepage_assets/industries/Consumer Electronics.webp" },
  { title: "Renewable Energy", image: "/homepage_assets/industries/Renewable Energy.webp" },
  { title: "Industrial Automation", image: "/homepage_assets/industries/Industrial Automation.webp" },
  { title: "Smart IOT", image: "/homepage_assets/industries/Smart IOT.webp" },
  { title: "Engineering Education", image: "/homepage_assets/industries/Engineering Education.webp" },
  { title: "Digital Musical Instruments", image: "/homepage_assets/industries/Digital Musical Instruments.webp" },
  { title: "Biomedical Electronics", image: "/homepage_assets/industries/Biomedical Electronics.webp" },
  { title: "NFC and RFID Technology", image: "/homepage_assets/industries/NFC and RFID Technology.webp" },
];

// Partner Logos for continuous right-to-left sliding marquee
const partnerLogos = [
  { name: "Adobe", color: "#FA0F00", symbol: "A" },
  { name: "GitLab", color: "#FC6D26", symbol: "🦊" },
  { name: "pendo", color: "#FF3366", symbol: "✦" },
  { name: "hotjar", color: "#FD3A00", symbol: "🔥" },
  { name: "Fivetran", color: "#006BFF", symbol: "彡" },
  { name: "Airwallex", color: "#000000", symbol: "❖" },
  { name: "ROS", color: "#FF4A00", symbol: "●" },
  { name: "Matter", color: "#000000", symbol: "⬡" },
  { name: "FreeRTOS", color: "#0083D7", symbol: "▲" },
  { name: "Altium", color: "#A87A24", symbol: "✦" },
];

export default function ServiceDetail({ service }: { service: Service }) {
  const [openFaq, setOpenFaq] = useState<number | null>(2); // Default open: index 2
  const [chatOpen, setChatOpen] = useState(true);
  const [sliderX, setSliderX] = useState(0);
  const [partnersSliderX, setPartnersSliderX] = useState(0);


  // Continuous auto-sliding for industry carousel
  useEffect(() => {
    let animId: number;
    const itemWidth = 400;
    const totalWidth = industriesList.length * itemWidth;

    const animate = () => {
      setSliderX((prev) => (prev + 0.8) % totalWidth);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Continuous auto-sliding for partner logos (right to left)
  useEffect(() => {
    let animId: number;
    const itemWidth = 260;
    const totalWidth = partnerLogos.length * itemWidth;

    const animate = () => {
      setPartnersSliderX((prev) => (prev + 0.6) % totalWidth);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const heroMediaRef = useRef<HTMLDivElement>(null);

  /**
   * The card turns out of the hero as you scroll it away: 45deg, up and to the
   * right, corners opening from 18 to 0, dissolving as it goes. Figma states it
   * as a 1600ms variant change with no trigger recorded, and scrubbing it on the
   * hero's own scroll is what keeps variant 01 -- the card centred, which is the
   * page at rest -- as what you actually land on.
   */
  useGSAP(() => {
    const el = heroMediaRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(el, {
        ...CARD_EXIT,
        opacity: 0,
        borderRadius: 0,
        // Figma's own ease on the transition.
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".page-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  const listClipRef = useRef<HTMLDivElement>(null);

  /**
   * The on-demand list rises into place as one block. Its transition moves
   * every one of the seven rows by exactly -820 -- checked, the delta is
   * identical for all of them -- against a 995 frame that clips them, so it is
   * the whole list travelling up from below rather than rows arriving
   * separately. Expressed as its own height so it always starts just out of the
   * clip, whatever the row count.
   */
  useGSAP(
    () => {
      const clip = listClipRef.current;
      if (!clip) return;
      const list = clip.querySelector(".svc-list");
      if (!list) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(list, {
          yPercent: 100,
          duration: 1.6,
          ease: FIGMA_EASE_IN_OUT,
          scrollTrigger: { trigger: clip, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: listClipRef, dependencies: [service.slug] },
  );

  const processRef = useRef<HTMLDivElement>(null);

  /**
   * The process cards fly into the grid, which is what the set's two variants
   * describe: the first holds Stage 01 at x -185 against a final 135 and Stage
   * 04 at y 713 against a final 451, so the top row arrives across and the
   * bottom row up from underneath. 320 and 262 on the 1440 frame are one card
   * width and one card height, so they are applied as percentages of the card
   * and hold at any width.
   *
   * Plays once on entry over the transition's own 1600ms and easing, rather
   * than scrubbing: it is an entrance, not a scroll-linked effect.
   */
  useGSAP(
    () => {
      const root = processRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          wide: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const wide = context.conditions?.wide;
          const cards = gsap.utils.toArray<HTMLElement>(
            root.querySelectorAll(".svc-card"),
          );
          cards.forEach((card, i) => {
            // Stacked into one column below the breakpoint, where a sideways
            // entrance would just be every card arriving from the same edge.
            const acrossRow = wide && i < 3;
            gsap.from(card, {
              xPercent: acrossRow ? -86.5 : 0,
              yPercent: acrossRow ? 0 : wide ? 100 : 24,
              opacity: 0,
              duration: 1.6,
              ease: FIGMA_EASE,
              delay: i * 0.08,
              scrollTrigger: { trigger: root, start: "top 85%", once: true },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope: processRef, dependencies: [service.slug] },
  );

  const whyRef = useRef<HTMLDivElement>(null);

  /**
   * Scatter into the grid, which is what this set's two variants describe: the
   * first holds point 02 off the left edge at x -96.55 against a final 535, 03
   * off the right at 1483 against 935 and 06 below the bottom right corner at
   * (1246.45, 746.89) against (935, 451), while 01, 04 and 05 are not drawn at
   * all -- an unmatched layer, which resolves as a dissolve in place. Offsets
   * are taken against the 370x262 card so they hold at any container width.
   */
  useGSAP(
    () => {
      const root = whyRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          wide: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const wide = context.conditions?.wide;
          const cards = gsap.utils.toArray<HTMLElement>(
            root.querySelectorAll(".svc-card"),
          );
          cards.forEach((card, i) => {
            // Stacked into one column below the breakpoint, where the frame's
            // horizontal vectors would only drag cards in from the same edge.
            const from = wide ? WHY_ENTRY[i] : undefined;
            gsap.from(card, {
              xPercent: from?.x ?? 0,
              yPercent: from?.y ?? (wide ? 0 : 24),
              opacity: 0,
              duration: 1.6,
              ease: FIGMA_EASE,
              delay: i * 0.08,
              scrollTrigger: { trigger: root, start: "top 85%", once: true },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope: whyRef, dependencies: [service.slug] },
  );

  const faqRef = useRef<HTMLDivElement>(null);

  /**
   * The rows settle out of the criss-cross the set's first variant holds: five
   * 1170x80 bars tilted +/-24deg about their own centres, two of them nudged
   * up and left, all landing flat over the transition's own 1600ms and easing.
   *
   * A 24deg tilt swings a row's box to 1101x549, so the list clips (.faq-clip)
   * and the tilt is dropped below 900px, where a row is near the full viewport
   * width and rotating it would put most of it outside the clip.
   */
  useGSAP(
    () => {
      const root = faqRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          wide: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const wide = context.conditions?.wide;
          const rows = gsap.utils.toArray<HTMLElement>(
            root.querySelectorAll(".faq__item"),
          );
          rows.forEach((row, i) => {
            const from = wide ? FAQ_ENTRY[i % FAQ_ENTRY.length] : undefined;
            gsap.from(row, {
              rotation: from?.rot ?? 0,
              xPercent: from?.x ?? 0,
              y: from?.y ?? 24,
              opacity: 0,
              duration: 1.6,
              ease: FIGMA_EASE_IN_OUT,
              scrollTrigger: { trigger: root, start: "top 85%", once: true },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope: faqRef, dependencies: [service.slug] },
  );

  const workStackRef = useRef<HTMLDivElement>(null);

  /**
   * Representative Work stacks: each card pins 20px below the one before it and
   * the covered card eases back as its successor rides up over it, so the pile
   * reads as depth rather than as cards simply overlapping.
   *
   * Scrubbed rather than played, so it tracks the scroll exactly, and skipped
   * where a card is pinned taller than the viewport or motion is unwanted.
   */
  useGSAP(
    () => {
      const root = workStackRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(
        "(min-height: 561px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            root.querySelectorAll(".svc-work"),
          );
          cards.forEach((card, i) => {
            if (i === cards.length - 1) return;
            gsap.to(card, {
              scale: 0.94,
              opacity: 0.55,
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                // The recede runs over the actual overlap: from where the next
                // card's top meets this card's pinned bottom edge, to where it
                // settles into its own pinned slot. Anything earlier dims a card
                // while it is still the one being read.
                start: () => `top ${96 + i * 20 + card.offsetHeight}px`,
                end: () => `top ${96 + (i + 1) * 20}px`,
                scrub: true,
              },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope: workStackRef, dependencies: [service.slug] },
  );

  const displayIndustries = [...industriesList, ...industriesList, ...industriesList];
  const displayPartners = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <main className="svc-page">
      {/* =====================================================================
          SECTION 1: SERVICE HERO (Node 1498:14571)
          The PCB video card (Node 1498:14585) is the hero's last flow child and
          hangs into the white band below it by --page-hero-hang.
          ===================================================================== */}
      <section className="page-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/service_page/Service sevtion Hero.mp4"
            poster="/posters/service_page/Service sevtion Hero.webp"
            loading="eager"
          />
          <div
            className="section-media__scrim"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          />
        </div>

        <div className="container page-hero__inner">
          <div className="page-hero__head">
            {/* Logo: Node 1498:14573 */}
            <Link href="/" aria-label="INNOSINO home" className="brand-logo-link">
              <Image
                src="/about_us/IS-Logo.webp"
                alt="INNOSINO"
                width={340}
                height={128}
                className="brand-logo"
                preload
              />
            </Link>

            {/* Hero Content Frame: Node 1498:14574 */}
            <div className="page-hero__copy">
              <div className="breadcrumb">
                <svg
                  className="breadcrumb__mark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 0.6C12 6.9 17.1 12 23.4 12C17.1 12 12 17.1 12 23.4C12 17.1 6.9 12 0.6 12C6.9 12 12 6.9 12 0.6Z"
                    fill="#FF7018"
                  />
                </svg>
                <Link href="/services" className="breadcrumb__link">
                  SERVICES
                </Link>
                <span className="breadcrumb__link" aria-hidden="true">
                  ›
                </span>
                <span className="breadcrumb__link">{service.title}</span>
              </div>

              <h1 className="page-hero__title">{service.title}</h1>

              <p className="page-hero__sub">
                {service.description}
              </p>
            </div>
          </div>

          {/* Header pill (Node 1498:14584) — composed in the hero's flow, then
              floats once it scrolls away. */}
          <FloatingNavbar variant="inline" />

          {/* Overlapping PCB video card (Node 1498:14585) */}
          <div className="page-hero__media" ref={heroMediaRef}>
            <BackgroundVideo
              src="/service_page/Service -Video.mp4"
              poster="/posters/service_page/Service -Video.webp"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: TRUSTED BY & PARTNERS (Node 1498:14587)
          ===================================================================== */}
      <section className="hero-follow">
        <div className="container">
          <h2 className="svc-partners__title">
            TRUSTED BY 30+ Global Partners &amp; Collaborations
          </h2>
        </div>

        <div className="svc-partners__rows">
          <div className="svc-partners__fade svc-partners__fade--left" />
          <div className="svc-partners__fade svc-partners__fade--right" />

          {[0, 1].map((row) => (
            <div
              key={row}
              className="svc-partners__row"
              style={{
                transform: `translateX(-${
                  row === 0
                    ? partnersSliderX
                    : (partnersSliderX * 1.15 + 180) % (partnerLogos.length * 260)
                }px)`,
              }}
            >
              {displayPartners.map((brand, bIdx) => (
                <div
                  key={`r${row}-${bIdx}`}
                  className="svc-partner"
                  style={{ color: brand.color }}
                >
                  <span
                    style={{
                      fontSize: brand.name === "Adobe" ? "1.1em" : "0.85em",
                      fontWeight: 900,
                    }}
                  >
                    {brand.symbol}
                  </span>
                  <span>{brand.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: OUR HARDWARE & PCB DESIGN PROCESS (Node 1498:14592)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#F1F1F1" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            OUR {service.title}{" "}
            <span className="brand-gradient-text">PROCESS</span>
          </h2>

          <div className="svc-process" ref={processRef}>
            <div className="svc-grid">
              {service.processStages.slice(0, 3).map((item, index) => (
                <div
                  key={item.stage}
                  /* The frame gives only the opening stage the gradient rule. */
                  className={index === 0 ? "svc-card svc-card--lead" : "svc-card"}
                >
                  <span className="svc-card__eyebrow">{item.stage}</span>
                  <div>
                    <h3 className="svc-card__title">{item.title}</h3>
                    <p className="svc-card__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="svc-grid svc-grid--pair">
              {service.processStages.slice(3, 5).map((item) => (
                <div key={item.stage} className="svc-card">
                  <span className="svc-card__eyebrow">{item.stage}</span>
                  <div>
                    <h3 className="svc-card__title">{item.title}</h3>
                    <p className="svc-card__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: OUR ON-DEMAND HARDWARE SERVICES (Node 1498:14628)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            OUR ON-DEMAND HARDWARE{" "}
            <span className="brand-gradient-text">SERVICES</span>
          </h2>

          <div
            className="svc-list-clip"
            ref={listClipRef}
            style={{ marginBlockStart: "clamp(1.5rem, 3.3vw, 48px)" }}
          >
          <div className="svc-list">
            {service.onDemandServices.map((item) => (
              <div key={item.num} className="svc-list__row">
                <span className="svc-list__num">{item.num}</span>
                <p className="svc-list__desc">{item.desc}</p>
                <h3 className="svc-list__title">{item.title}</h3>
                <span className="svc-list__icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: REPRESENTATIVE WORK (Node 1498:14674). Only shown for
          disciplines that have photographed work; the rest
          drop the section rather than carry invented case studies. */}
      {service.projects && service.projects.length > 0 && (
        <section className="flow-section" style={{ backgroundColor: "#000000" }}>
          <div className="container">
            <h2 className="section-heading" style={{ color: "#FFFFFF" }}>
              REPRESENTATIVE <span style={{ color: "#FF7018" }}>WORK</span>
            </h2>

            <div className="svc-stack" ref={workStackRef}>
              {service.projects.map((proj, index) => (
                <article
                  key={proj.title}
                  className="svc-work"
                  style={
                    {
                      "--stack-top": `calc(var(--stack-base) + ${index * 20}px)`,
                    } as React.CSSProperties
                  }
                >
                  <div className="svc-work__body">
                    <div>
                      <span className="svc-work__eyebrow">● {proj.category}</span>
                      <h3 className="svc-work__title">{proj.title}</h3>
                      <p className="svc-work__desc">{proj.desc}</p>
                    </div>

                    <Link href="/contact" className="svc-work__cta">
                      <span>Book a Call</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ flexShrink: 0 }}
                      >
                        <path
                          d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className="svc-work__media">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 899px) 100vw, 520px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 6: WHY IS INNOSINO THE RIGHT PARTNER (Node 1498:14733)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            WHY IS INNOSINO THE RIGHT {service.title}{" "}
            <span className="brand-gradient-text">PARTNER?</span>
          </h2>

          <div className="svc-process svc-why" ref={whyRef}>
            <div className="svc-grid">
              {service.whyUsPoints.map((item, index) => (
                <div
                  key={item.num}
                  /* The settled frame rules only the first point. */
                  className={index === 0 ? "svc-card svc-card--lead" : "svc-card"}
                >
                  <span className="svc-card__eyebrow">{item.num}</span>
                  <div>
                    <h3 className="svc-card__title">{item.title}</h3>
                    <p className="svc-card__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: FREQUENTLY ASKED QUESTIONS (Node 1498:14775)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#F1F1F1" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            HAVE <span className="brand-gradient-text">QUESTIONS?</span>
          </h2>

          <div
            className="faq-clip"
            ref={faqRef}
            style={{ marginBlockStart: "clamp(1.5rem, 3.3vw, 48px)" }}
          >
            <div className="faq">
              {service.faqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div key={faq.q} className="faq__item">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                      className="faq__button"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <svg
                        className="faq__icon"
                        viewBox="0 0 48 48"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M14 24h20" />
                        <path className="faq__icon-bar" d="M24 14v20" />
                      </svg>
                    </button>
                    {/* Always in the markup, hidden when closed: an answer that only
                        exists once someone clicks is absent from the served page,
                        which would make this page's FAQPage schema describe text it
                        does not contain. */}
                    <div className="faq__answer" hidden={!isOpen}>
                      {faq.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: INDUSTRY SOLUTIONS (Node 1498:14806)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#000000" }}>
        <div className="container">
          <h2
            className="section-lede"
            style={{ fontFamily: "var(--font-cal-sans), sans-serif", fontWeight: 400 }}
          >
            {industriesLede}
          </h2>
        </div>

        <div
          className="marquee"
          style={{ marginBlockStart: "clamp(1.5rem, 3.9vw, 3rem)" }}
        >
          <div
            className="marquee__track"
            style={{ transform: `translateX(-${sliderX}px)` }}
          >
            {displayIndustries.map((item, idx) => (
              <div key={idx} className="svc-industry">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 60vw, 370px"
                  style={{ objectFit: "cover" }}
                />
                <div className="svc-industry__scrim" />
                <h3 className="svc-industry__title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: CTA GLASS BANNER (Node 1498:14815)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-banner__title">{ctaBanner.title}</h2>

            <p className="cta-banner__body">{ctaBanner.body}</p>

            <Link href={ctaBanner.action.href} className="cta-banner__button">
              <span>{ctaBanner.action.label}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: FOOTER & CHAT WIDGET (Node 1498:14837)
          ===================================================================== */}
      <footer
        className="flow-section"
        style={{ backgroundColor: "#000000", paddingBlockStart: 0 }}
      >
        <div className="container">
          <div
            className="chat-dock"
            style={{ marginBlockEnd: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {chatOpen && (
              <div className="chat-dock__bubble">
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--fs-small)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: "#666666",
                  }}
                >
                  {chatWidget.greeting}
                </p>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "2px",
                    cursor: "pointer",
                    display: "flex",
                    flexShrink: 0,
                  }}
                  aria-label={chatWidget.closeLabel}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5"
                      stroke="#888888"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setChatOpen(!chatOpen)}
              className="chat-dock__toggle"
              aria-label={chatWidget.toggleLabel}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                  fill="#000000"
                />
                <rect x="6" y="7" width="12" height="2" rx="1" fill="#FF6A00" />
                <rect x="6" y="11" width="8" height="2" rx="1" fill="#FF6A00" />
              </svg>
            </button>
          </div>

          <div className="footer-bar">
            <p
              style={{
                margin: 0,
                fontSize: "var(--fs-small)",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {copyright}
            </p>

            <div className="footer-bar__links">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "var(--fs-body)",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
