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
  title: "TEMB - The Electronic Music Book",
  description: "Limited edition luxury publication celebrating electronic music culture. Featuring exclusive artist contributions, premium design, and collectible editions.",
  keywords: "electronic music, luxury book, limited edition, music publication, art book, collector's edition",
  authors: [{ name: "The Electronic Music Book" }],
  openGraph: {
    title: "TEMB - The Electronic Music Book",
    description: "Limited edition luxury publication celebrating electronic music culture",
    type: "website",
    locale: "en_US",
    siteName: "TEMB",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEMB - The Electronic Music Book",
    description: "Limited edition luxury publication celebrating electronic music culture",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white text-black">
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