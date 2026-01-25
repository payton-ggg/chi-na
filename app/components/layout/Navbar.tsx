"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Instagram, Send, Youtube } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const heroSection = document.getElementById("hero");
      const toursSection = document.getElementById("tours");
      const aboutSection = document.getElementById("about");
      const accSection = document.getElementById("accommodation");
      const contactSection = document.getElementById("contact");

      const navbarHeight = 80;
      const scrollPos = window.scrollY + navbarHeight / 2;

      const checkInView = (el: HTMLElement | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        return scrollPos >= top && scrollPos <= bottom;
      };

      // Sections that are dark
      const darkInView =
        checkInView(heroSection) ||
        checkInView(toursSection) ||
        checkInView(aboutSection) ||
        checkInView(contactSection);

      setIsDarkSection(darkInView);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Программа", href: "#tours" },
    { name: "О туре", href: "#about" },
    { name: "Проживание", href: "#accommodation" },
    { name: "Контакты", href: "#contact" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const menuVariants = isMobileMenuOpen
    ? "translate-y-0 opacity-100 visible"
    : "-translate-y-10 opacity-0 invisible";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? isDarkSection
            ? "bg-dark-section/80 backdrop-blur-xl border-b border-light-surface/5 py-3"
            : "bg-light-surface/80 backdrop-blur-xl border-b border-dark-section/5 py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter z-50 relative"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span
            className={`transition-colors duration-500 ${
              isMobileMenuOpen || isDarkSection || !isScrolled
                ? "text-light-surface"
                : "text-dark-section"
            }`}
          >
            TSUNAMI
          </span>
          <span className="text-accent-cta">TRAVEL</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-[13px] font-bold uppercase tracking-widest transition-all duration-500 hover:text-accent-cta relative group ${
                isDarkSection || !isScrolled
                  ? "text-light-surface/70"
                  : "text-dark-section/70"
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-cta transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button
            onClick={(e: any) => handleLinkClick(e, "#contact")}
            className="bg-accent-cta hover:bg-accent-cta/90 text-light-surface px-7 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-accent-cta/20"
          >
            Забронировать
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-3 z-50 relative rounded-full transition-all duration-500 ${
            isMobileMenuOpen
              ? "bg-accent-cta text-light-surface"
              : isDarkSection || !isScrolled
              ? "text-light-surface bg-white/10"
              : "text-dark-section bg-dark-section/5"
          }`}
        >
          {isMobileMenuOpen ? (
            <X size={20} strokeWidth={3} />
          ) : (
            <Menu size={20} strokeWidth={3} />
          )}
        </button>
      </div>

      {/* Modern Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-dark-section z-40 md:hidden transition-all duration-700 ease-expo ${menuVariants}`}
      >
        {/* Background Decorative patterns */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 -right-20 text-[30vw] font-black text-white/5 whitespace-nowrap rotate-90">
            CHINA
          </div>
        </div>

        <div className="h-full flex flex-col justify-between p-8 pt-32">
          <div className="space-y-8">
            <p className="text-accent-cta text-[10px] font-black uppercase tracking-[0.4em] mb-12">
              Меню навигации
            </p>
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className="group flex items-center justify-between text-4xl font-bold text-light-surface transform transition-transform duration-500 hover:translate-x-4"
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-serif italic text-accent-cta opacity-50">
                    0{idx + 1}
                  </span>
                  <span>{link.name}</span>
                </div>
                <ArrowRight
                  size={24}
                  className="text-accent-cta opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all"
                />
              </a>
            ))}
          </div>

          <div className="space-y-10">
            <div className="pt-8 border-t border-white/10">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6">
                Мы в соцсетях
              </p>
              <div className="flex gap-6">
                <a
                  href="https://instagram.com/tsunami_travel"
                  target="_blank"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-light-surface hover:bg-accent-cta transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://t.me/tsunamisurfer4ever"
                  target="_blank"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-light-surface hover:bg-accent-cta transition-colors"
                >
                  <Send size={20} />
                </a>
                <a
                  href="https://youtube.com/@tsunami_surfer"
                  target="_blank"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-light-surface hover:bg-accent-cta transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            <button
              onClick={(e: any) => handleLinkClick(e, "#contact")}
              className="w-full bg-accent-cta text-light-surface py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-accent-cta/20"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ease-expo {
          transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
        }
      `}</style>
    </nav>
  );
}
