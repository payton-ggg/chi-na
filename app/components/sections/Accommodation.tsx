"use client";

import { Bed, Star, Users, Sparkles } from "lucide-react";
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
      amenities: ["5 звезд", "Центр города", "Панорамный вид"],
    },
    {
      title: "Mountain Resort Zhangjiajie",
      location: "Горы Аватара",
      description:
        "Эко-отель с потрясающим видом на песчаниковые столбы прямо из окна вашего номера.",
      image: "/hotel-avatar.png",
      amenities: ["Близко к парку", "Природа", "Уют"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="accommodation"
      className="py-24 md:py-40 bg-main-bg relative overflow-hidden"
    >
      {/* Decorative details */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent-cta/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent-cta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/20 mb-8">
            <Bed size={16} className="text-accent-cta" />
            <span className="text-sm font-semibold text-accent-cta tracking-wide uppercase">
              Проживание
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-dark-section mb-8 leading-[1.1]">
            Где мы будем <span className="text-accent-cta">жить?</span>
          </h2>

          <p className="text-xl md:text-2xl text-dark-section/70 leading-relaxed font-light mb-8">
            Во время тура мы будем жить в отелях высокого уровня, где комфорт и
            сервис стоят на первом месте.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-cta/10 flex items-center justify-center shrink-0">
                <Users className="text-accent-cta" />
              </div>
              <div>
                <h4 className="font-bold text-dark-section mb-1">
                  Двухместное размещение
                </h4>
                <p className="text-sm text-dark-section/60">
                  По два человека в номере (twin/double)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-cta/10 flex items-center justify-center shrink-0">
                <Star className="text-accent-cta" />
              </div>
              <div>
                <h4 className="font-bold text-dark-section mb-1">
                  Гибкие условия
                </h4>
                <p className="text-sm text-dark-section/60">
                  Возможна доплата за отдельное проживание
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {hotels.map((hotel, idx) => (
            <div
              key={idx}
              className={`group relative transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-[2.5rem] shadow-2xl mb-8">
                <Image
                  src={hotel.image}
                  alt={hotel.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark-section/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest text-white font-bold border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4">
                <div className="flex items-center gap-2 text-accent-cta uppercase tracking-widest text-xs font-bold mb-4">
                  <Sparkles size={14} />
                  <span>{hotel.location}</span>
                </div>
                <h3 className="text-3xl font-bold text-dark-section mb-4 group-hover:text-accent-cta transition-colors">
                  {hotel.title}
                </h3>
                <p className="text-dark-section/60 leading-relaxed max-w-md">
                  {hotel.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
