"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = Math.min(scrollY * 0.3, 100);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#121417] flex items-center">
      <div className="relative w-full left-[5%] px-6 md:px-16">
        <h1 className="relative z-10 font-bold tracking-tight leading-[0.95] text-[12vw] md:text-[9vw] text-[#f5f5f4] select-none">
          <span 
            className="block transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${parallaxOffset}px)` }}
          >
            ПУТЕШЕСТВИЯ
          </span>
          <span 
            className="block ml-[15%] mr-[-5%] transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${parallaxOffset}px)` }}
          >
            ПО КИТАЮ.
          </span>
          <span 
            className="block ml-[8%] transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${parallaxOffset * 0.5}px)` }}
          >
            ВМЕСТЕ С НАМИ.
          </span>
        </h1>

        <button className="absolute top-[12%] right-[15%] w-44 h-44 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-md animate-float-slow cursor-pointer group transition-all duration-500 z-20 hover:scale-110 hover:border-primary-scarlet-500/50 shadow-lg">
          <div className="absolute inset-2 rounded-full border border-white/20 group-hover:border-primary-scarlet-400/40 transition-all duration-500" />
          
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-scarlet-600/0 via-primary-scarlet-500/0 to-primary-scarlet-700/0 group-hover:from-primary-scarlet-600/70 group-hover:via-primary-scarlet-500/80 group-hover:to-primary-scarlet-700/90 transition-all duration-500" />
          
          <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.15)] group-hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] transition-all duration-500" />
          
          <span className="text-sm uppercase tracking-widest text-white/90 group-hover:text-white text-center relative z-10 font-semibold transition-all duration-300">
            КНОПКА
            <br />
            2
          </span>
        </button>

        <button className="absolute top-[30%] right-[77%] w-40 h-40 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-md animate-float-slow cursor-pointer group transition-all duration-500 z-20 hover:scale-110 hover:border-primary-scarlet-500/50 shadow-lg">
          <div className="absolute inset-2 rounded-full border border-white/20 group-hover:border-primary-scarlet-400/40 transition-all duration-500" />
          
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-scarlet-600/0 via-primary-scarlet-500/0 to-primary-scarlet-700/0 group-hover:from-primary-scarlet-600/70 group-hover:via-primary-scarlet-500/80 group-hover:to-primary-scarlet-700/90 transition-all duration-500" />
          
          <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.15)] group-hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] transition-all duration-500" />
          
          <span className="text-sm uppercase tracking-widest text-white/90 group-hover:text-white text-center relative z-10 font-semibold transition-all duration-300">
            КНОПКА
            <br />
            2
          </span>
        </button>
      </div>
    </section>
  );
}
