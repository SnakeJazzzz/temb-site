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
          isScrolled ? "bg-black/95 backdrop-blur-sm border-b border-gray-800/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <nav className="flex items-center justify-between h-20" role="navigation" aria-label="Main navigation">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black rounded-sm"
              aria-label="The Electronic Music Book - Home"
            >
              <Image
                src={getLogoForBackground('dark')}
                alt="The Electronic Music Book"
                width={280}
                height={75}
                priority
                className="h-24 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              <Link
                href="/artists"
                className="text-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black rounded-sm"
              >
                <Typography variant="nav" className="text-sm md:text-base lg:text-lg tracking-widest">Artists</Typography>
              </Link>
              <Link
                href="/shop"
                className="text-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black rounded-sm"
              >
                <Typography variant="nav" className="text-sm md:text-base lg:text-lg tracking-widest">Shop</Typography>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 -mr-2 text-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
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
        className={`fixed inset-0 z-40 bg-black transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full pt-32 pb-8 px-6">
          <nav className="flex flex-col space-y-8" role="navigation" aria-label="Mobile navigation">
            <Link
              href="/artists"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black rounded-sm"
            >
              <Typography variant="h3">Artists</Typography>
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black rounded-sm"
            >
              <Typography variant="h3">Shop</Typography>
            </Link>
          </nav>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20" aria-hidden="true"></div>
    </>
  );
}