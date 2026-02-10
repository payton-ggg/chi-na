"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
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
  Home,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (
        pathname === "/booking" ||
        pathname === "/schedule" ||
        pathname.includes("/tours")
      ) {
        setIsDarkSection(true);
        return;
      }

      const heroSection = document.getElementById("hero");
      const toursSection = document.getElementById("tours");
      const summarySection = document.getElementById("summary");
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
        checkInView(summarySection) ||
        checkInView(contactSection);

      setIsDarkSection(darkInView);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
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
  ];

  const sections = useMemo(() => {
    const pageSections: Record<string, { name: string; href: string }[]> = {
      "/": [
        { name: "Программа", href: "/#tours" },
        { name: "О туре", href: "/#about" },
        { name: "Проживание", href: "/#accommodation" },
        { name: "Контакты", href: "/#contact" },
      ],
      "/schedule": [
        { name: "День 1: Шанхай", href: "/schedule#day-1" },
        { name: "День 4: Аватар", href: "/schedule#day-4" },
        { name: "День 6: Дисней", href: "/schedule#day-6" },
        { name: "На главную", href: "/" },
      ],
      "/booking": [
        { name: "Форма заявки", href: "/booking#form" },
        { name: "На главную", href: "/" },
        { name: "Контакты", href: "/#contact" },
      ],
      "/guides": [
        { name: "Все гайды", href: "/guides" },
        { name: "На главную", href: "/" },
      ],
    };

    return pageSections[pathname] || pageSections["/"];
  }, [pathname]);

  const { push } = useRouter();

  const handleLinkClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // If it's just a hash link or same page link
    if (
      href.startsWith("#") ||
      (href.includes("#") && href.split("#")[0] === pathname)
    ) {
      const hash = href.includes("#") ? href.split("#")[1] : href.substring(1);
      const element = document.getElementById(hash);

      if (element) {
        const offset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else if (href === pathname) {
      // Just scroll to top if clicking current page link without hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to new page
      window.location.href = href;
    }
  };

  const themeClasses = isDarkSection
    ? {
        overlay: "bg-dark-section",
        card: "bg-white/5 border-white/10 hover:bg-white/10",
        textTitle: "text-white",
        textSubtitle: "text-white/50",
        textMuted: "text-white/30",
        textDecorative: "text-white",
        border: "border-white/10",
        socialBg: "bg-white/5 border-white/10",
        linkText: "text-white/70 hover:text-white",
      }
    : {
        overlay: "bg-light-surface",
        card: "bg-dark-section/5 border-dark-section/10 hover:bg-dark-section/10",
        textTitle: "text-dark-section",
        textSubtitle: "text-dark-section/50",
        textMuted: "text-dark-section/30",
        textDecorative: "text-dark-section",
        border: "border-dark-section/10",
        socialBg: "bg-dark-section/5 border-dark-section/10",
        linkText: "text-dark-section/70 hover:text-dark-section",
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
            className={`relative cursor-pointer z-110 p-4 rounded-full transition-all duration-500 group ${
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
        className={`fixed inset-0 z-90 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] overflow-y-auto overscroll-contain ${
          themeClasses.overlay
        } ${
          isMenuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
        onTouchMove={(e) => {
          // Prevent background scroll on mobile
          e.stopPropagation();
        }}
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black whitespace-nowrap leading-none select-none ${themeClasses.textDecorative}`}
          >
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
                    className={`group block relative overflow-hidden rounded-3xl border p-8 transition-all hover:border-accent-cta/50 ${themeClasses.card}`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent-cta/20 flex items-center justify-center text-accent-cta group-hover:scale-110 transition-transform">
                          {page.icon}
                        </div>
                        <div>
                          <h3
                            className={`text-2xl md:text-3xl font-bold mb-1 group-hover:text-accent-cta transition-colors ${themeClasses.textTitle}`}
                          >
                            {page.name}
                          </h3>
                        </div>
                      </div>
                      <ArrowRight
                        className={`group-hover:text-accent-cta group-hover:translate-x-2 transition-all opacity-20 group-hover:opacity-100 ${themeClasses.textTitle}`}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Sections & Socials */}
            <div
              className={`lg:col-span-6 flex flex-col justify-center space-y-12 lg:border-l lg:pl-24 ${themeClasses.border}`}
            >
              <div>
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.4em] mb-10 ${themeClasses.textMuted}`}
                >
                  Быстрые ссылки
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  {sections.map((section, idx) => (
                    <Link
                      key={section.name}
                      href={section.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center gap-4 text-2xl font-bold transition-colors ${themeClasses.linkText}`}
                      style={{ transitionDelay: `${(idx + 3) * 50}ms` }}
                    >
                      <span className="text-xs font-serif italic text-accent-cta">
                        0{idx + 1}
                      </span>
                      <span>{section.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={`pt-12 border-t ${themeClasses.border}`}>
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${themeClasses.textMuted}`}
                >
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
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center hover:bg-accent-cta hover:border-accent-cta transition-all ${themeClasses.socialBg} ${themeClasses.textTitle}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div
                className={`text-sm font-light mt-auto ${themeClasses.textMuted}`}
              >
                © {new Date().getFullYear()} Tsunami Travel. <br />
                Авторские туры по Китаю.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
