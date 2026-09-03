"use client";

import React, { useState } from "react";
import Link from "next/link";

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

export default function FloatingNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="dock dock--nav">
      <div className="dock__inner">
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
