"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  /** Hidden from the pill on phones (mirrors the mobile reference) and
      reachable from the "More" panel instead. */
  secondary?: boolean;
}

const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/#industries", secondary: true },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about", secondary: true },
];

/** The Services panel: four disciplines in two columns, then the two broader
    offers on their own lines — the arrangement of the reference frame. */
const serviceGridLinks = [
  { label: "Embedded System Design", href: "/services#embedded-system-design" },
  { label: "Software Integration", href: "/services#software-integration" },
  { label: "Hardware & PCB Design", href: "/services#hardware-pcb-design" },
  { label: "Manufacturing Support", href: "/services#manufacturing-support" },
];

const serviceStackLinks = [
  { label: "Product Development", href: "/services#product-development" },
  { label: "Industrial Automation", href: "/services#industrial-automation" },
];

/** The More panel carries everything the pill has no room for, including the
    two links the phone pill drops. */
const moreLinks = [
  { label: "Home", href: "/" },
  { label: "Industries", href: "/#industries" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Expertise", href: "/expertise" },
  { label: "Life at Innosino", href: "/life-at-innosino" },
  { label: "Blog", href: "/blogs" },
  { label: "Career", href: "#careers" },
];

/**
 * Routes whose design composes the pill inside their own layout (Figma places
 * it under the hero headline and again in the footer), so the floating copy
 * mounted by the root layout stands down there.
 */
const ROUTES_WITH_INLINE_NAV = [
  "/about",
  "/services",
  "/contact",
  "/projects",
  "/projects/details",
  "/project/details",
  "/blogs",
  "/blog",
];

/**
 * Project detail routes are dynamic and every one of them composes the pill
 * itself, so they are matched by prefix. The blog detail routes deliberately
 * are NOT here: they never compose one, so they need the floating copy.
 */
const PREFIXES_WITH_INLINE_NAV = ["/projects/", "/project/"];

interface FloatingNavbarProps {
  /**
   * "fixed" (default) floats the pill over the viewport; "inline" renders it in
   * the surrounding document flow for pages that position it themselves.
   */
  variant?: "fixed" | "inline";
}

/** Which panel, if any, stands above the pill. */
type OpenPanel = "services" | "more" | null;

export default function FloatingNavbar({
  variant = "fixed",
}: FloatingNavbarProps) {
  const [panel, setPanel] = useState<OpenPanel>(null);
  const [floating, setFloating] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [slotHeight, setSlotHeight] = useState<number>();
  const [caretX, setCaretX] = useState<number>();
  // Pointers that can open the Services panel by hovering; the rest tap it open.
  const [hoverable, setHoverable] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Away from the hero the pill is a click-to-open trigger: just the menu
  // button and the CTA, so the page keeps its space back. Collapsed, it has no
  // trigger left for a panel to point at, so no panel is standing either.
  const collapsed = floating && !expanded;
  const openPanel = collapsed ? null : panel;

  // "Has the pill left the hero?" — the one condition that drives both the
  // detach and the collapse. An inline pill rests where the page puts it until
  // that resting place scrolls off the top; the fixed copy has no resting
  // place, so it is the hero frame scrolling away instead.
  useEffect(() => {
    const wrap = wrapRef.current;
    const slot = slotRef.current;

    if (variant === "inline") {
      if (!wrap || !slot) return;
      setSlotHeight(slot.offsetHeight);
    }

    const update = () =>
      setFloating(
        variant === "inline"
          ? wrap!.getBoundingClientRect().top <= 0
          : window.scrollY > window.innerHeight * 0.8,
      );

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [variant]);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHoverable(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Back inside the hero, the pill is open again by definition.
  useEffect(() => {
    if (!floating) {
      setExpanded(false);
      setPanel(null);
    }
  }, [floating]);

  // The panel spans the whole pill, so its arrow is what points at the trigger:
  // park the arrow over the trigger's centre, measured against the pill.
  useEffect(() => {
    const trigger =
      openPanel === "services"
        ? servicesRef.current
        : openPanel === "more"
          ? moreRef.current
          : null;
    const pill = pillRef.current;
    if (!trigger || !pill) return;

    const measure = () => {
      const box = trigger.getBoundingClientRect();
      setCaretX(box.left + box.width / 2 - pill.getBoundingClientRect().left);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [openPanel]);

  // Escape, or a press anywhere outside the pill, dismisses the panel.
  useEffect(() => {
    if (!openPanel) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!pillRef.current?.contains(event.target as Node)) setPanel(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openPanel]);

  const togglePanel = useCallback(
    (next: Exclude<OpenPanel, null>) =>
      setPanel((open) => (open === next ? null : next)),
    [],
  );

  const pageOwnsNav =
    ROUTES_WITH_INLINE_NAV.includes(pathname) ||
    PREFIXES_WITH_INLINE_NAV.some((prefix) => pathname.startsWith(prefix));

  if (variant === "fixed" && pageOwnsNav) {
    return null;
  }

  const inline = variant === "inline";

  const cta = (
    <Link href="/contact" className="nav-pill__cta">
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
  );

  const toggle = (
    <button
      type="button"
      className="nav-pill__toggle"
      onClick={() => {
        setExpanded((open) => !open);
        setPanel(null);
      }}
      aria-expanded={expanded}
      aria-label={expanded ? "Close menu" : "Open menu"}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        aria-hidden="true"
        style={{
          transform: expanded ? "rotate(180deg)" : "none",
          transition: "transform 440ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {expanded ? (
          <path
            d="M4 4L14 14M14 4L4 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M2.5 5h13M2.5 9h13M2.5 13h13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );

  /** White card with the gradient hairline, arrow aimed down at its trigger. */
  const panelShell = (kind: "services" | "more", children: React.ReactNode) => (
    <div
      className={`nav-panel nav-panel--${kind}`}
      /* Following any link in here dismisses the panel behind it -- including
         the same-page hash links, which no route change would report. */
      onClick={() => setPanel(null)}
      style={
        caretX === undefined
          ? undefined
          : ({ "--caret-x": `${caretX}px` } as React.CSSProperties)
      }
    >
      <div className="nav-panel__card">
        {children}
        <svg
          className="nav-panel__caret"
          width="26"
          height="15"
          viewBox="0 0 26 15"
          fill="none"
          aria-hidden="true"
        >
          {/* Hides the card's own bottom hairline where the arrow meets it. */}
          <rect x="0" y="0" width="26" height="3.2" fill="#FFFFFF" />
          <path d="M0 1L13 13.6L26 1Z" fill="#FFFFFF" />
          <path
            d="M0.5 1L13 13L25.5 1"
            stroke="#FF7018"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className={
        inline ? `nav-inline${floating ? " nav-inline--floating" : ""}` : "dock dock--nav"
      }
      style={inline && slotHeight ? { minHeight: slotHeight } : undefined}
    >
      <div ref={slotRef} className={inline ? "nav-inline__slot" : "dock__inner"}>
        <nav
          ref={pillRef}
          aria-label="Main Navigation"
          className={collapsed ? "nav-pill nav-pill--compact" : "nav-pill"}
          /* Hovering off the pill retracts a panel the pointer opened; the gap
             down to the arrow is bridged by the panel's own padding, so the
             trip from the trigger to the card is unbroken. */
          onMouseLeave={() => {
            if (hoverable && panel === "services") setPanel(null);
          }}
        >
          {floating && toggle}

          {/* Nothing inside is reachable while it is collapsed. The panels are
              deliberately not in here: the reveal clips, and they have to
              escape the pill. */}
          <div className="nav-pill__reveal" inert={collapsed}>
            {/* Links and the CTA collapse together, so they share one row. */}
            <div className="nav-pill__group">
              <div className="nav-pill__links">
                {navItems.map((item) =>
                  item.label === "Services" ? (
                    <div
                      key={item.label}
                      ref={servicesRef}
                      className="nav-trigger"
                      onMouseEnter={() => hoverable && setPanel("services")}
                    >
                      <Link
                        href={item.href}
                        className="nav-pill__link"
                        aria-expanded={openPanel === "services"}
                        aria-haspopup="true"
                        /* Touch has no hover to open with, so the first tap
                           opens the panel instead of leaving for the page. */
                        onClick={(event) => {
                          if (hoverable) {
                            setPanel(null);
                            return;
                          }
                          event.preventDefault();
                          togglePanel("services");
                        }}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={
                        item.secondary
                          ? "nav-pill__link nav-pill__link--secondary"
                          : "nav-pill__link"
                      }
                    >
                      {item.label}
                    </Link>
                  ),
                )}

                <div ref={moreRef} className="nav-trigger">
                  <button
                    type="button"
                    onClick={() => togglePanel("more")}
                    onMouseEnter={() =>
                      hoverable && panel === "services" && setPanel(null)
                    }
                    className="nav-pill__link nav-more__trigger"
                    aria-expanded={openPanel === "more"}
                    aria-haspopup="true"
                  >
                    <span>More</span>
                    <svg
                      width="10"
                      height="5"
                      viewBox="0 0 10 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform:
                          openPanel === "more" ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <path
                        d="M1 1L5 4L9 1"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {cta}
            </div>
          </div>

          {openPanel === "services" &&
            panelShell(
              "services",
              <>
                <p className="nav-panel__title">Services</p>
                <div className="nav-panel__grid">
                  {serviceGridLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="nav-panel__link"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="nav-panel__stack">
                  {serviceStackLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="nav-panel__link"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </>,
            )}

          {openPanel === "more" &&
            panelShell(
              "more",
              <div className="nav-panel__cloud">
                {moreLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="nav-panel__link nav-panel__link--strong"
                  >
                    {item.label}
                  </Link>
                ))}
                <span className="nav-panel__label">Follow Us</span>
                <a
                  className="nav-panel__social"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="INNOSINO on LinkedIn"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
              </div>,
            )}
        </nav>
      </div>
    </div>
  );
}
