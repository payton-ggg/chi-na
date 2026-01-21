"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(true); // Start with dark since Hero is dark

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check if we're on a dark section (Hero or PopularTours)
      const heroSection = document.getElementById("hero");
      const toursSection = document.getElementById("tours");

      if (heroSection && toursSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const toursRect = toursSection.getBoundingClientRect();

        // Check if navbar overlaps with Hero or PopularTours
        const navbarHeight = 80; // Approximate navbar height
        const isOnHero = heroRect.top < navbarHeight && heroRect.bottom > 0;
        const isOnTours = toursRect.top < navbarHeight && toursRect.bottom > 0;

        setIsDarkSection(isOnHero || isOnTours);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Туры", href: "#tours" },
    { name: "О нас", href: "#about" },
    { name: "Отзывы", href: "#reviews" },
    { name: "Контакты", href: "#contact" },
  ];

  // Determine navbar style based on scroll and section
  const getNavbarBg = () => {
    if (!isScrolled) {
      return "bg-transparent";
    }
    return isDarkSection
      ? "bg-[#121417]/90 backdrop-blur-md border-b border-white/10"
      : "bg-white/90 backdrop-blur-md border-b border-gray-100";
  };

  const getTextColor = () => {
    if (!isScrolled) {
      return "text-white";
    }
    return isDarkSection ? "text-white" : "text-gray-900";
  };

  const getLinkColor = () => {
    if (!isScrolled) {
      return "text-white/90 hover:text-white";
    }
    return isDarkSection
      ? "text-white/80 hover:text-white"
      : "text-gray-700 hover:text-gray-900";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBg()} ${
        isScrolled ? "py-4 shadow-lg" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          <span className={getTextColor()}>TSUNAMI</span>
          <span className="text-primary-scarlet-500">TRAVEL</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary-scarlet-500 ${getLinkColor()}`}
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-primary-scarlet-600 hover:bg-primary-scarlet-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary-scarlet-500/20">
            Подобрать тур
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors ${getTextColor()}`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className={`absolute top-full left-0 right-0 p-6 md:hidden flex flex-col space-y-4 shadow-xl ${
            isDarkSection
              ? "bg-[#121417] border-b border-white/10"
              : "bg-white border-b border-gray-100"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-lg font-medium transition-colors hover:text-primary-scarlet-500 ${
                isDarkSection ? "text-white" : "text-gray-900"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="w-full bg-primary-scarlet-600 hover:bg-primary-scarlet-700 text-white px-5 py-3 rounded-xl font-bold transition-colors">
            Подобрать тур
          </button>
        </div>
      )}
    </nav>
  );
}
