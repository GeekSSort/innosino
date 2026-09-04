import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  siteUrl,
  SITE_NAME,
  HOME_TITLE,
  HOME_DESCRIPTION,
} from "./shared-metadata";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";

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
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Cal Sans is the display face on nearly every page, so warm up its
            two origins as well — the stylesheet comes from api.fontshare.com
            and the woff2 files from cdn.fontshare.com. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        {/* Poppins is used in exactly one place (the Explore badge's circular
            label) at weight 600, so only that variant is requested. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Poppins:wght@600&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cal-sans@400,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
        <FloatingNavbar />
      </body>
    </html>
  );
}

