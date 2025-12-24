// /Users/michaelthemac/Desktop/Projectos/TEMB/temb-site/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Typography from "@/components/ui/Typography";
import { getLogoForBackground } from "@/lib/assets";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-midnight/95 backdrop-blur-sm border-b border-space-grey/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <nav className="flex items-center justify-between h-20" role="navigation" aria-label="Main navigation">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight rounded-sm"
              aria-label="The Electronic Music Book - Home"
            >
              <Image
                src={getLogoForBackground('dark')}
                alt="The Electronic Music Book"
                width={180}
                height={48}
                priority
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              <Link
                href="/artists"
                className="text-pearl hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight rounded-sm"
              >
                <Typography variant="nav">Artists</Typography>
              </Link>
              <Link
                href="/shop"
                className="text-pearl hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight rounded-sm"
              >
                <Typography variant="nav">Shop</Typography>
              </Link>
              <Link
                href="/shop"
                className="bg-pearl text-midnight px-8 py-3 hover:bg-space-grey hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight"
                aria-label="Get the book - Shop now"
              >
                <Typography variant="button">Get it</Typography>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 -mr-2 text-pearl hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-2 focus:ring-offset-midnight rounded-sm"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-midnight transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          {/* Mobile Logo */}
          <div className="mb-12">
            <Image
              src={getLogoForBackground('dark')}
              alt="The Electronic Music Book"
              width={200}
              height={54}
              className="h-12 w-auto"
            />
          </div>

          <nav className="flex flex-col space-y-8" role="navigation" aria-label="Mobile navigation">
            <Link
              href="/artists"
              onClick={() => setIsMenuOpen(false)}
              className="text-pearl hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight rounded-sm"
            >
              <Typography variant="h3">Artists</Typography>
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="text-pearl hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight rounded-sm"
            >
              <Typography variant="h3">Shop</Typography>
            </Link>
          </nav>

          <div className="mt-auto">
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-pearl text-midnight text-center py-4 hover:bg-space-grey hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight"
              aria-label="Get the book - Shop now"
            >
              <Typography variant="button">Get it</Typography>
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20" aria-hidden="true"></div>
    </>
  );
}