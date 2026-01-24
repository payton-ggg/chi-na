"use client";

import { Bed, Star, Users, Sparkles, Home } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Accommodation() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hotels = [
    {
      title: "Radisson Blu New World",
      location: "Центр Шанхая",
      description:
        "Пятизвездочный отель с панорамным видом на город и легендарной вращающейся крышей.",
      image: "/hotel-shanghai.png",
      amenities: ["5 звезд", "Центр города", "Панорама"],
      className: "lg:col-start-1 lg:col-end-8", // Custom grid positioning
      imageAspect: "aspect-16/9",
    },
    {
      title: "Mountain Resort Zhangjiajie",
      location: "Горы Аватара",
      description:
        "Эко-отель с потрясающим видом на песчаниковые столбы прямо из окна вашего номера.",
      image: "/hotel-avatar.png",
      amenities: ["Nature", "Eco-luxury", "Quiet"],
      className: "lg:col-start-6 lg:col-end-13 lg:-prose-mt-20", // Overlap/Stagger effect
      imageAspect: "aspect-16/10",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="accommodation"
      className="py-32 md:py-48 bg-main-bg relative overflow-hidden"
    >
      {/* Subtle Background Decorative Text */}
      <div className="absolute top-20 left-10 pointer-events-none select-none">
        <span className="text-[15vw] font-black text-dark-section/3 uppercase tracking-tighter block leading-none">
          Stay
        </span>
        <span className="text-[15vw] font-black text-dark-section/3 uppercase tracking-tighter block leading-none ml-[20vw]">
          Comfort
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Unique Header Placement */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 md:mb-32 gap-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/20 mb-8">
              <Home size={16} className="text-accent-cta" />
              <span className="text-sm font-semibold text-accent-cta tracking-wide uppercase">
                Премиальное проживание
              </span>
            </div>

            <h2 className="text-5xl md:text-[5.5rem] font-bold text-dark-section mb-0 leading-[0.9] tracking-tight">
              Где мы <br />
              <span className="text-accent-cta italic font-serif pr-4">
                будем
              </span>
              жить?
            </h2>
          </div>

          <div className="lg:max-w-sm text-right lg:pb-4">
            <p className="text-lg text-dark-section/60 leading-relaxed font-light">
              Мы отобрали отели, которые сами по себе являются частью
              путешествия. Комфорт высшего класса в самых знаковых локациях.
            </p>
          </div>
        </div>

        {/* Dynamic Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-y-0 relative">
          {/* Hotel Details Sidebar (Floating style) */}
          <div className="hidden lg:flex lg:col-start-1 lg:col-end-3 flex-col gap-16 pt-20">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-px bg-accent-cta" />
              <p className="text-xs font-bold text-accent-cta uppercase tracking-widest">
                Условия
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex items-start gap-4 group">
                <Users className="text-accent-cta shrink-0" size={24} />
                <p className="text-sm font-medium text-dark-section/80 leading-snug">
                  Двухместное <br /> размещение
                </p>
              </div>
              <div className="flex items-start gap-4 group">
                <Star className="text-accent-cta shrink-0" size={24} />
                <p className="text-sm font-medium text-dark-section/80 leading-snug">
                  Высокий <br /> уровень сервиса
                </p>
              </div>
            </div>
          </div>

          {/* Staggered Hotel Cards */}
          <div className="lg:col-start-3 lg:col-end-13 grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-0 relative">
            {/* Radisson Hotel */}
            <div
              className={`lg:col-start-1 lg:col-end-7 transition-all duration-1000 ease-out z-20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <div className="group relative">
                <div className="relative aspect-16/10 md:aspect-video overflow-hidden rounded-4xl shadow-2xl transition-transform duration-700 hover:-translate-y-2">
                  <Image
                    src={hotels[0].image}
                    alt={hotels[0].title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-dark-section/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute bottom-6 left-6 flex gap-2">
                    {hotels[0].amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20 transition-all duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 lg:pr-12">
                  <span className="text-accent-cta font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">
                    {hotels[0].location}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-dark-section mb-4">
                    {hotels[0].title}
                  </h3>
                  <p className="text-dark-section/60 font-light leading-relaxed">
                    {hotels[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Avatar Hotel (Overlapping) */}
            <div
              className={`lg:col-start-6 lg:col-end-11 lg:mt-40 transition-all duration-1000 ease-out z-30 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-32"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="group relative">
                <div className="relative aspect-16/10 overflow-hidden rounded-4xl shadow-2xl transition-transform duration-700 hover:-translate-y-2 border-8 border-main-bg">
                  <Image
                    src={hotels[1].image}
                    alt={hotels[1].title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-dark-section/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 rounded-full bg-accent-cta text-white flex items-center justify-center animate-pulse-slow">
                      <Sparkles size={20} />
                    </div>
                  </div>
                </div>

                <div className="mt-8 lg:pl-4">
                  <span className="text-accent-cta font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">
                    {hotels[1].location}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-dark-section mb-4">
                    {hotels[1].title}
                  </h3>
                  <p className="text-dark-section/60 font-light leading-relaxed">
                    {hotels[1].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only Conditions (Visible at bottom on mobile) */}
        <div className="grid grid-cols-2 gap-6 mt-16 md:hidden">
          <div className="p-6 bg-accent-cta/5 rounded-2xl border border-accent-cta/10">
            <Users className="text-accent-cta mb-4" size={24} />
            <p className="text-xs font-bold text-dark-section/80 uppercase tracking-tighter">
              Двухместное <br /> проживание
            </p>
          </div>
          <div className="p-6 bg-accent-cta/5 rounded-2xl border border-accent-cta/10">
            <Star className="text-accent-cta mb-4" size={24} />
            <p className="text-xs font-bold text-dark-section/80 uppercase tracking-tighter">
              Премиум <br /> сервис
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
