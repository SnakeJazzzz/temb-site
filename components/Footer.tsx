// /Users/michaelthemac/Desktop/Projectos/TEMB/temb-site/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-light tracking-wider">TEMB</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                The Electronic Music Book
                <br />
                Limited edition luxury publication
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-light tracking-wider text-gray-400 uppercase">Explore</h3>
              <nav className="flex flex-col space-y-3" aria-label="Footer navigation">
                <Link
                  href="/artists"
                  className="text-sm text-gray-300 hover:text-white transition-colors font-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                >
                  Artists
                </Link>
                <Link
                  href="/shop"
                  className="text-sm text-gray-300 hover:text-white transition-colors font-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                >
                  Shop
                </Link>
              </nav>
            </div>

            {/* Contact/Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-light tracking-wider text-gray-400 uppercase">Edition</h3>
              <div className="text-sm text-gray-300 font-light space-y-1">
                <p>Limited to 500 copies</p>
                <p>Worldwide shipping</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 font-light">
              © {currentYear} The Electronic Music Book. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-gray-400 hover:text-white transition-colors font-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-gray-400 hover:text-white transition-colors font-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}