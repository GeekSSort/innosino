/**
 * The key marking the hero intro as played for this tab.
 *
 * Its own module because both sides of a client boundary need the same string:
 * HeroSplash reads and writes it, and the root layout inlines it into a script
 * that runs before the first paint. A value exported from a "use client"
 * module arrives as `undefined` in a server component, so it cannot live in
 * HeroSplash itself.
 */
export const SPLASH_SEEN_KEY = "innosino:splash-seen";
