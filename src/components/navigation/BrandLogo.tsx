"use client";

import Image from "next/image";
import { useNav } from "@/components/navigation/NavProvider";

/**
 * The brand mark in a page hero.
 *
 * Reads the file from the Studio through the nav context the root layout
 * already publishes, so the thirteen places that render it need no props and
 * no query of their own — and replacing the logo is one upload rather than one
 * commit.
 *
 * The two sizes are the two the design uses: the large mark in a standard page
 * hero, and the small one on the fixed-width pages.
 */
export default function BrandLogo({
  size = "large",
}: {
  size?: "large" | "small";
}) {
  const { logo } = useNav();

  if (size === "small") {
    return (
      <Image
        src={logo}
        alt="INNOSINO"
        width={236}
        height={32}
        style={{ objectFit: "contain", height: "32px", width: "auto" }}
        preload
      />
    );
  }

  return (
    <Image
      src={logo}
      alt="INNOSINO"
      width={340}
      height={128}
      className="brand-logo"
      preload
    />
  );
}
