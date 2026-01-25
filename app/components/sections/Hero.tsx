"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Disable parallax on mobile for better performance
  const parallaxOffset = isMobile ? 0 : Math.min(scrollY * 0.3, 100);

  const router = useRouter();

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-dark-section flex items-center"
    >
      {/* Decorative Atmosphere Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-18 right-5 w-32 h-32 md:w-[250px] md:h-[250px] transition-transform opacity-80 duration-500 ease-out "
          style={{
            transform: `translate(-${parallaxOffset * 0.5}px, -${
              parallaxOffset * 0.25
            }px)`,
          }}
        >
          <Image src="/panda.png" alt="Panda" fill className="object-contain" />
        </div>

        {/* Tea - Bottom Left */}
        <div
          className="absolute bottom-10 left-[5%] w-32 h-32 md:w-64 md:h-64 opacity-60   transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${parallaxOffset * 0.2}px, -${
              parallaxOffset * 0.1
            }px) rotate(15deg)`,
          }}
        >
          <Image src="/tea.png" alt="Tea" fill className="object-contain" />
        </div>
      </div>

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative w-full left-0 md:left-[5%] px-4 sm:px-6 md:px-12 lg:px-16 z-10">
        <h1 className="relative z-10 font-bold tracking-tight leading-[0.95] text-[14vw] sm:text-[13vw] md:text-[10vw] lg:text-[9vw] text-[#f5f5f4] select-none">
          <span
            className="block transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${parallaxOffset}px)` }}
          >
            КИТАЙ. ШАНХАЙ.
          </span>
          <span
            className="block ml-[1%] sm:ml-[5%] md:ml-[10%] mr-[-5%] transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${parallaxOffset}px)` }}
          >
            ГОРЫ АВАТАРА.
          </span>
          <span
            className="block ml-[1%] sm:ml-[5%] md:ml-[10%] transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${parallaxOffset * 0.5}px)` }}
          >
            ВМЕСТЕ С НАМИ.
          </span>
        </h1>

        {/* Bubble 1 - Adaptive positioning and sizing */}
        <button
          className="absolute top-[8%] right-[5%] sm:top-[10%] sm:right-[10%] md:top-[12%] md:right-[15%] w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm animate-float-slow cursor-pointer group transition-all duration-500 z-20 hover:scale-110 hover:border-primary-scarlet-500/50 shadow-lg"
          onClick={() => router.push("/booking")}
        >
          <div className="absolute inset-2 rounded-full border border-white/20 group-hover:border-primary-scarlet-400/40 transition-all duration-500" />

          <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary-scarlet-600/0 via-primary-scarlet-500/0 to-primary-scarlet-700/0 group-hover:from-primary-scarlet-600/70 group-hover:via-primary-scarlet-500/80 group-hover:to-primary-scarlet-700/90 transition-all duration-500" />

          <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.15)] group-hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] transition-all duration-500" />

          <span className="text-xs sm:text-sm uppercase tracking-widest text-white/90 group-hover:text-white text-center relative z-10 font-semibold transition-all duration-300">
            СВЯЗАТЬСЯ
            <br />С НАМИ
          </span>
        </button>
      </div>
    </section>
  );
}
