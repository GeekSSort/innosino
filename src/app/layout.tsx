import type { Metadata, Viewport } from "next";
import { Urbanist, Cal_Sans, Poppins } from "next/font/google";
import "./globals.css";
import {
  siteUrl,
  SITE_NAME,
  HOME_TITLE,
  HOME_DESCRIPTION,
} from "./shared-metadata";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import { SPLASH_SEEN_KEY } from "@/content/splash";

/**
 * Self-hosted through next/font rather than linked from Google and Fontshare.
 * Both of those stylesheets are render-blocking, and behind them sits a
 * full-screen white splash overlay: any latency on either host was a white
 * screen for exactly that long. Serving the faces from this origin takes them
 * off the critical path altogether.
 */
const urbanist = Urbanist({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-urbanist",
});

/** The display face. Every use in the stylesheet is at 400, its only weight. */
const calSans = Cal_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-cal-sans",
});

/** One use: the Explore badge's circular label. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Segment layouts set their own title; this suffixes them and supplies the
  // homepage's own.
  title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  // favicon.ico, apple-icon.png and opengraph-image.png in this directory are
  // picked up by Next's file conventions.
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased dark ${urbanist.variable} ${calSans.variable} ${poppins.variable}`}
      /* The script below stamps data-splash-seen on this element before React
         ever runs, which React otherwise reports as a hydration mismatch. */
      suppressHydrationWarning
    >
      <head>
        {/* The hero intro plays once a tab, but the static HTML always carries
            its overlay, so the flag has to be read before the first paint --
            by the time React hydrates and unmounts it, a reload has already
            flashed a white screen. Blocking and tiny, in the head on purpose. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `try{if(sessionStorage.getItem(${JSON.stringify(SPLASH_SEEN_KEY)})==="1")` +
              `document.documentElement.setAttribute("data-splash-seen","")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
        <FloatingNavbar />
      </body>
    </html>
  );
}

