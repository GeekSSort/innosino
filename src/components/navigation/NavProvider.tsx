"use client";

import React, { createContext, useContext } from "react";
import type { NavData } from "@/sanity/queries";

/**
 * The navbar is rendered from twelve places, several of them inside Client
 * Components that cannot query. Rather than thread the same four lists through
 * every one, the root layout fetches them once and publishes them here.
 */
const NavContext = createContext<NavData | null>(null);

export function NavProvider({
  nav,
  children,
}: {
  nav: NavData;
  children: React.ReactNode;
}) {
  return <NavContext.Provider value={nav}>{children}</NavContext.Provider>;
}

export function useNav(): NavData {
  const nav = useContext(NavContext);
  if (!nav) {
    throw new Error("useNav must be used inside <NavProvider> (see app/layout.tsx)");
  }
  return nav;
}
