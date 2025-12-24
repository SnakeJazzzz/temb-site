// /Users/michaelthemac/Desktop/Projectos/TEMB/temb-site/components/Footer.tsx

import Link from "next/link";
import Image from "next/image";
import Typography from "@/components/ui/Typography";
import { getLogoForBackground } from "@/lib/assets";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight text-pearl mt-auto">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 border-t border-space-grey/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                <Image
                  src={getLogoForBackground('dark')}
                  alt="The Electronic Music Book"
                  width={180}
                  height={48}
                  className="h-10 w-auto"
                />
              </Link>
              <Typography variant="caption" className="text-space-grey leading-relaxed block">
                Limited edition luxury publication
                <br />
                Celebrating electronic music culture
              </Typography>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <Typography variant="caption" className="text-space-grey uppercase">Explore</Typography>
              <nav className="flex flex-col space-y-3" aria-label="Footer navigation">
                <Link
                  href="/artists"
                  className="text-pearl/80 hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-2 focus:ring-offset-midnight rounded-sm"
                >
                  <Typography variant="caption">Artists</Typography>
                </Link>
                <Link
                  href="/shop"
                  className="text-pearl/80 hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-2 focus:ring-offset-midnight rounded-sm"
                >
                  <Typography variant="caption">Shop</Typography>
                </Link>
              </nav>
            </div>

            {/* Contact/Info */}
            <div className="space-y-4">
              <Typography variant="caption" className="text-space-grey uppercase">Edition</Typography>
              <div className="space-y-1">
                <Typography variant="caption" className="text-pearl/80 block">Limited to 500 copies</Typography>
                <Typography variant="caption" className="text-pearl/80 block">Worldwide shipping</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="py-6 border-t border-space-grey/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Typography variant="meta" className="text-space-grey">
              © {currentYear} The Electronic Music Book. All rights reserved.
            </Typography>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-space-grey hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-2 focus:ring-offset-midnight rounded-sm"
              >
                <Typography variant="meta">Privacy</Typography>
              </Link>
              <Link
                href="/terms"
                className="text-space-grey hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-2 focus:ring-offset-midnight rounded-sm"
              >
                <Typography variant="meta">Terms</Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}