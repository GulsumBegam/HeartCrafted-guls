import type { Metadata } from "next";
import "./globals.css";
import { StructuredData } from "@/components/layout/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://heartcrafted.vercel.app"),
  title: {
    default: "HeartCrafted — Crafting Emotions Into Forever",
    template: "%s | HeartCrafted",
  },
  description:
    "HeartCrafted is a luxury emotional gifting platform where you transform memories, love stories, friendships, and life's most meaningful moments into handcrafted keepsakes.",
  keywords: [
    "luxury gifts India",
    "personalized gifts",
    "memory box",
    "scrapbook gift",
    "custom keepsake",
    "handcrafted gifts",
    "emotional gifting",
    "anniversary gift India",
    "friendship gift",
    "memory frame",
  ],
  authors: [{ name: "HeartCrafted" }],
  creator: "HeartCrafted",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://heartcrafted.vercel.app",
    title: "HeartCrafted — Crafting Emotions Into Forever",
    description:
      "Transform your most treasured memories into handcrafted keepsakes. Premium emotional gifting platform.",
    siteName: "HeartCrafted",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HeartCrafted — Crafting Emotions Into Forever",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeartCrafted — Crafting Emotions Into Forever",
    description: "Transform your most treasured memories into handcrafted keepsakes.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
