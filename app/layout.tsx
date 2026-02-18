// /Users/michaelthemac/Desktop/Projectos/TEMB/temb-site/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Using Inter as a clean, modern system font
// Will be replaced with Condor font later
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'TEMB — The Electronic Music Book',
    template: '%s | TEMB',
  },
  description: 'A luxury 250-page coffee table book celebrating electronic music culture. Limited edition. $699.',
  keywords: ['electronic music', 'coffee table book', 'luxury book', 'limited edition', 'music culture', 'DJ culture', 'electronic music history'],
  metadataBase: new URL('https://theelectronicmusicbook.com'),
  authors: [{ name: "The Electronic Music Book" }],
  openGraph: {
    type: 'website',
    url: 'https://theelectronicmusicbook.com',
    title: 'TEMB — The Electronic Music Book',
    description: 'A luxury 250-page coffee table book celebrating electronic music culture. Limited edition. $699.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Electronic Music Book — Limited Edition',
      },
    ],
    locale: "en_US",
    siteName: 'The Electronic Music Book',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEMB — The Electronic Music Book',
    description: 'A luxury 250-page coffee table book celebrating electronic music culture. Limited edition. $699.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-midnight text-pearl">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}