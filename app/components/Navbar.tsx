"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Туры", href: "#tours" },
    { name: "О нас", href: "#about" },
    { name: "Отзывы", href: "#reviews" },
    { name: "Контакты", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-gray-100"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          <span className={isScrolled ? "text-gray-900" : "text-white"}>
            TSUNAMI
          </span>
          <span className="text-primary-scarlet-500">TRAVEL</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary-scarlet-500 ${
                isScrolled ? "text-gray-700" : "text-white/90 hover:text-white"
              }`}
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
          className={`md:hidden p-2 ${
            isScrolled ? "text-gray-900" : "text-white"
          }`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden flex flex-col space-y-4 shadow-xl animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-gray-900 hover:text-primary-scarlet-500"
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
