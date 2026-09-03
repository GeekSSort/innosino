"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  /** Hidden from the pill on phones (mirrors the mobile reference) and
      surfaced inside the "More" menu instead. */
  secondary?: boolean;
}

const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/#industries", secondary: true },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about", secondary: true },
];

const moreItems = [
  { label: "Our Team", href: "#team" },
  { label: "Careers", href: "#careers" },
  { label: "Life at INNOSINO", href: "/life-at-innosino" },
  { label: "Expertise", href: "/expertise" },
  { label: "Blog & Insights", href: "/blogs" },
];

/** Links that drop out of the pill on phones re-appear at the top of the menu. */
const overflowItems = navItems.filter((item) => item.secondary);

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

/** Detail routes are dynamic, so they are matched by prefix as well. */
const PREFIXES_WITH_INLINE_NAV = ["/projects/", "/project/", "/blogs/", "/blog/"];

interface FloatingNavbarProps {
  /**
   * "fixed" (default) floats the pill over the viewport; "inline" renders it in
   * the surrounding document flow for pages that position it themselves.
   */
  variant?: "fixed" | "inline";
}

export default function FloatingNavbar({
  variant = "fixed",
}: FloatingNavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const [slotHeight, setSlotHeight] = useState<number>();
  const wrapRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // An inline pill rests where the page puts it, then detaches and floats in
  // the usual bottom band once its resting place scrolls off the top.
  useEffect(() => {
    if (variant !== "inline") return;
    const wrap = wrapRef.current;
    const slot = slotRef.current;
    if (!wrap || !slot) return;

    setSlotHeight(slot.offsetHeight);

    const update = () => setFloating(wrap.getBoundingClientRect().top <= 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [variant]);

  const pageOwnsNav =
    ROUTES_WITH_INLINE_NAV.includes(pathname) ||
    PREFIXES_WITH_INLINE_NAV.some((prefix) => pathname.startsWith(prefix));

  if (variant === "fixed" && pageOwnsNav) {
    return null;
  }

  const inline = variant === "inline";

  return (
    <div
      ref={wrapRef}
      className={
        inline ? `nav-inline${floating ? " nav-inline--floating" : ""}` : "dock dock--nav"
      }
      style={inline && slotHeight ? { minHeight: slotHeight } : undefined}
    >
      <div ref={slotRef} className={inline ? "nav-inline__slot" : "dock__inner"}>
        <nav aria-label="Main Navigation" className="nav-pill">
          <div className="nav-pill__links">
            {navItems.map((item) => (
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
            ))}

            <div className="nav-more">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="nav-pill__link nav-more__trigger"
                aria-expanded={dropdownOpen}
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
                    transform: dropdownOpen ? "rotate(180deg)" : "none",
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

              {dropdownOpen && (
                <div
                  className="nav-menu"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {overflowItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="nav-menu__item nav-menu__item--overflow"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {moreItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="nav-menu__item"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

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
        </nav>
      </div>
    </div>
  );
}
