"use client";

import {
  MapPin,
  ShieldCheck,
  Ticket,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function TourSummary() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const details = [
    {
      icon: <MapPin size={24} />,
      label: "Локация",
      value: "Аэропорт Шанхая",
      sub: "Старт и финиш",
      rotate: "0",
      translate: "-20px, 0",
    },
    {
      icon: <ShieldCheck size={24} />,
      label: "Формат",
      value: "Все включено",
      sub: "Кроме перелета",
      rotate: "2deg",
      translate: "10px, -10px",
    },
    {
      icon: <Ticket size={24} />,
      label: "Документы",
      value: "Без визы",
      sub: "Для граждан РФ",
      rotate: "-1deg",
      translate: "-5px, 20px",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 md:py-48 bg-dark-section relative overflow-hidden selection:bg-accent-cta selection:text-white"
    >
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap">
        <span className="text-[30vw] font-black leading-none tracking-tighter text-white">
          CHINA DISCOVERY
        </span>
      </div>

      {/* Dynamic Glows sensitive to mouse */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${
            50 + mousePos.y * 20
          }%, rgba(194,56,28,0.15) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* LEFT: Abstract Visual Layout */}
          <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px]">
            {/* Main Narrative Card - Floating & Unusual Shape */}
            <div
              className={`absolute top-0 left-0 w-full md:w-[110%] bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[3rem] rounded-tr-[10rem] transition-all duration-1000 ease-out z-20 shadow-2xl ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/20 border border-accent-cta/30 mb-8">
                <Sparkles size={14} className="text-accent-cta" />
                <span className="text-[10px] font-bold text-accent-cta tracking-[0.2em] uppercase">
                  Tsunami Travel Exclusive
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.05]">
                Шанхай <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-cta via-white to-accent-cta/40">
                  & Горы Аватара
                </span>
              </h2>

              <div className="space-y-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-lg">
                <p className="border-l-2 border-accent-cta pl-6 py-2">
                  Мы отправляемся в путешествие, где инновации Шанхая
                  встречаются с вечностью гор Чжанцзяцзе.
                </p>
                <p className="font-light italic">
                  Познакомьтесь с Шанхайской Венецией, освойте каллиграфию и
                  найдите свой дзен над облаками.
                </p>
                <p className="text-accent-cta font-bold tracking-tight">
                  А напоследок — сказка Диснея. Будет легендарно!
                </p>
              </div>
            </div>

            {/* Decorative Floating Tokens */}
            <div className="absolute -top-10 -right-10 w-32 h-32 md:w-48 md:h-48 z-10 animate-float-slow opacity-20">
              <Image
                src="/tea.png"
                alt=""
                fill
                className="object-contain grayscale contrast-125"
              />
            </div>
            <div className="absolute -bottom-15 left-1/4 w-40 h-40 z-30 animate-pulse-slow opacity-40 max-md:hidden">
              <Image src="/monach.png" alt="" fill className="object-contain" />
            </div>
          </div>

          {/* RIGHT: Staggered Info Grid */}
          <div className="w-full lg:w-1/2 max-md:mt-10 flex flex-col gap-8 md:gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              {/* Vertical Decorative Bar */}
              <div className="absolute -left-6 top-1/4 bottom-1/4 w-px bg-linear-to-b from-transparent via-accent-cta/50 to-transparent hidden md:block" />

              {details.map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative p-8 rounded-4xl border transition-all duration-700 hover:scale-105 ${
                    idx === 0
                      ? "sm:col-span-2 ml-10 max-md:ml-0 bg-accent-cta/5 border-accent-cta/20"
                      : "bg-white/5 border-white/10"
                  }`}
                  style={{
                    transform:
                      isVisible && !isMobile
                        ? `rotate(${item.rotate}) translate(${item.translate})`
                        : "none",
                    transitionDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-cta/20 flex items-center justify-center text-accent-cta group-hover:bg-accent-cta group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-accent-cta tracking-widest uppercase mb-1 opacity-60">
                        {item.label}
                      </h4>
                      <p className="text-xl md:text-2xl font-black text-white mb-1">
                        {item.value}
                      </p>
                      <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                        {item.sub}
                      </p>
                    </div>
                  </div>

                  {/* Hover Accent Glow */}
                  <div className="absolute inset-0 rounded-4xl bg-accent-cta/0 group-hover:bg-accent-cta/5 transition-colors overflow-hidden -z-10" />
                </div>
              ))}

              {/* Unique Final Step / CTA Mini-Card */}
              <div
                className={`sm:col-span-2 relative mt-4 overflow-hidden rounded-4xl p-1 
                ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-20 scale-95"
                }`}
                style={{
                  transitionDelay: "400ms",
                  transitionDuration: "1000ms",
                }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-accent-cta via-white/20 to-accent-cta animate-gradient-x" />
                <div className="relative bg-dark-section rounded-[1.9rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 group hover:cursor-pointer">
                  <div>
                    <h3 className="text-2xl font-black text-white italic tracking-tighter mb-1">
                      ВСЕ ВКЛЮЧЕНО?
                    </h3>
                    <p className="text-sm text-white/50">
                      Да, кроме билета до Шанхая. Обо всем остальном позаботимся
                      мы.
                    </p>
                  </div>
                  <button className="flex items-center gap-3 bg-white text-dark-section font-black px-6 py-4 rounded-full hover:bg-accent-cta hover:text-white transition-all duration-500 whitespace-nowrap group-hover:translate-x-2">
                    ЗАБРОНИРОВАТЬ <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(-10deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1) translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1) translateY(-10px);
            opacity: 0.6;
          }
        }
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 5s linear infinite;
        }
      `}</style>
    </section>
  );
}
