import type { Metadata } from "next";
import "./globals.css";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import ExploreBadge from "@/components/common/ExploreBadge";

export const metadata: Metadata = {
  title: "Innosino - From Concept to Mass Production",
  description: "We turn ideas into high-performance, market ready products from concept to mass production.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,600&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cal-sans@400,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden">
        {children}
        <FloatingNavbar />
        <ExploreBadge />
      </body>
    </html>
  );
}

