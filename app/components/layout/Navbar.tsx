"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Instagram,
  Send,
  Youtube,
  Calendar,
  BookOpen,
  UserPlus,
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const mainPages = [
    {
      name: "Записаться на тур",
      href: "/booking",
      icon: <UserPlus size={20} />,
    },
    {
      name: "Расписание по дням",
      href: "/schedule",
      icon: <Calendar size={20} />,
    },
    { name: "Гайды", href: "/guides", icon: <BookOpen size={20} /> },
  ];

  const sections = [
    { name: "Программа", href: "/#tours" },
    { name: "О туре", href: "/#about" },
    { name: "Проживание", href: "/#accommodation" },
    { name: "Контакты", href: "/#contact" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      setIsMenuOpen(false);

      const targetId = href.replace("/#", "");
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
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ease-in-out ${
          isScrolled
            ? isDarkSection
              ? "bg-dark-section/80 backdrop-blur-xl py-4"
              : "bg-light-surface/80 backdrop-blur-xl py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter relative z-110"
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span
              className={`transition-colors duration-500 ${
                isMenuOpen || isDarkSection || !isScrolled
                  ? "text-light-surface"
                  : "text-dark-section"
              }`}
            >
              TSUNAMI
            </span>
            <span className="text-accent-cta">TRAVEL</span>
          </Link>

          {/* Universal Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative z-110 p-4 rounded-full transition-all duration-500 group ${
              isMenuOpen
                ? "bg-accent-cta text-light-surface"
                : isDarkSection || !isScrolled
                ? "text-light-surface bg-white/10 hover:bg-white/20"
                : "text-dark-section bg-dark-section/5 hover:bg-dark-section/10"
            }`}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between items-end">
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "w-6 rotate-45 translate-y-2.5" : "w-6"
                }`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "w-4 group-hover:w-6"
                }`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen
                    ? "w-6 -rotate-45 -translate-y-2"
                    : "w-5 group-hover:w-6"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 z-90 bg-dark-section transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isMenuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white whitespace-nowrap leading-none select-none">
            CHINA
          </div>
        </div>

        <div className="h-full container mx-auto px-6 flex flex-col justify-center pt-24 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 h-full">
            {/* Left Column: Pages (Three requested items) */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
              <p className="text-accent-cta text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                Страницы
              </p>
              <div className="space-y-4">
                {mainPages.map((page, idx) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="group block relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 transition-all hover:bg-white/10 hover:border-accent-cta/50"
                    style={{ transitionDelay: `${idx * 100}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent-cta/20 flex items-center justify-center text-accent-cta group-hover:scale-110 transition-transform">
                          {page.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-accent-cta transition-colors">
                            {page.name}
                          </h3>
                        </div>
                      </div>
                      <ArrowRight className="text-white/20 group-hover:text-accent-cta group-hover:translate-x-2 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Sections & Socials */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-12 lg:border-l lg:border-white/10 lg:pl-24">
              <div>
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                  Быстрые ссылки
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  {sections.map((section, idx) => (
                    <a
                      key={section.name}
                      href={section.href}
                      onClick={(e) => handleLinkClick(e, section.href)}
                      className="group flex items-center gap-4 text-2xl font-bold text-white/70 hover:text-white transition-colors"
                      style={{ transitionDelay: `${(idx + 3) * 50}ms` }}
                    >
                      <span className="text-xs font-serif italic text-accent-cta">
                        0{idx + 1}
                      </span>
                      <span>{section.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-12 border-t border-white/10">
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                  Следите за нами
                </p>
                <div className="flex gap-4">
                  {[
                    {
                      icon: <Instagram />,
                      href: "https://instagram.com/tsunami_travel",
                    },
                    { icon: <Send />, href: "https://t.me/tsunamisurfer4ever" },
                    {
                      icon: <Youtube />,
                      href: "https://youtube.com/@tsunami_surfer",
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent-cta hover:border-accent-cta transition-all"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-white/20 text-sm font-light mt-auto">
                © {new Date().getFullYear()} Tsunami Travel. <br />
                Авторские туры по всему миру.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
