"use client";

import { Bed, Star, Users, Sparkles, Home, Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function HotelCard({
  hotel,
  isVisible,
  index,
}: {
  hotel: {
    title: string;
    location: string;
    description: string;
    amenities: string[];
    gallery: string[];
  };
  isVisible: boolean;
  index: number;
}) {
  const [activeImage, setActiveImage] = useState(hotel.gallery[0]);

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Hotel Info & Gallery Collage */}
      <div
        className={`lg:col-span-5 ${
          index % 2 === 0 ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="space-y-8">
          <div>
            <span className="text-accent-cta font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">
              {hotel.location}
            </span>
            <h3 className="text-4xl md:text-5xl font-bold text-dark-section mb-6">
              {hotel.title}
            </h3>
            <p className="text-dark-section/60 font-light leading-relaxed text-lg mb-8 max-w-md">
              {hotel.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {hotel.amenities.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-1.5 rounded-full bg-accent-cta/5 border border-accent-cta/10 text-[10px] font-bold text-accent-cta uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* MINI GALLERY COLLAGE */}
          <div className="relative h-48 md:h-64 grid grid-cols-4 gap-3">
            {hotel.gallery.map((img: string, i: number) => (
              <div
                key={i}
                onMouseEnter={() => setActiveImage(img)}
                className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:z-20 hover:scale-110 cursor-pointer border-2 ${
                  activeImage === img
                    ? "border-accent-cta"
                    : "border-transparent"
                } ${i % 2 === 0 ? "mt-4" : "mb-4"}`}
              >
                <Image
                  src={img}
                  alt={`${hotel.title} photo ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-accent-cta/10 transition-opacity ${
                    activeImage === img
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-50"
                  }`}
                />
              </div>
            ))}

            {/* Tiny decorative label */}
            <div className="absolute -bottom-6 left-0 flex items-center gap-2 text-[10px] font-bold text-dark-section/30 uppercase tracking-widest">
              <Camera size={12} />
              <span>Наведите, чтобы сменить фото</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image - Changes on Hover */}
      <div
        className={`lg:col-span-7 ${
          index % 2 === 0 ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="relative group">
          <div className="relative aspect-16/10 md:aspect-video overflow-hidden rounded-4xl shadow-2xl transition-transform duration-700 hover:-translate-y-2 border-x-8 border-main-bg">
            <div className="absolute inset-0 transition-opacity duration-500">
              <Image
                src={activeImage}
                alt={hotel.title}
                fill
                className="object-cover transition-transform duration-2000 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-dark-section/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Floating Badge */}
            <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <Sparkles size={24} className="animate-pulse-slow" />
            </div>
          </div>

          {/* Decorative background element */}
          <div
            className={`absolute -inset-4 bg-accent-cta/5 rounded-[3rem] -z-10 blur-xl transition-all duration-700 group-hover:bg-accent-cta/10 ${
              index % 2 === 0 ? "rotate-2" : "-rotate-2"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

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

  const hotels: {
    title: string;
    location: string;
    description: string;
    amenities: string[];
    gallery: string[];
  }[] = [
    {
      title: "Radisson Blu New World",
      location: "Центр Шанхая",
      description:
        "Пятизвездочный отель с панорамным видом на город и легендарной вращающейся крышей.",
      amenities: ["5 звезд", "Центр города", "Панорама"],
      gallery: ["/hotel/1.png", "/hotel/2.png", "/hotel/3.png", "/hotel/4.png"],
    },
    {
      title: "Mountain Resort Zhangjiajie",
      location: "Горы Аватара",
      description:
        "Эко-отель с потрясающим видом на песчаниковые столбы прямо из окна вашего номера.",
      amenities: ["Nature", "Eco-luxury", "Quiet"],
      gallery: ["/hotel/5.png", "/hotel/6.png", "/hotel/7.png", "/hotel/8.png"],
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
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 md:mb-32 gap-8 md:gap-12">
          <div className="w-full lg:max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/20 mb-6 md:mb-8">
              <Home size={16} className="text-accent-cta" />
              <span className="text-sm font-semibold text-accent-cta tracking-wide uppercase">
                Премиальное проживание
              </span>
            </div>

            <h2 className="text-5xl md:text-[5.5rem] font-bold text-dark-section mb-0 leading-[0.9] tracking-tight">
              Где мы <br /> будем
              <span className="text-accent-cta italic font-serif pr-4">
                {} жить?
              </span>
            </h2>
          </div>

          <div className="lg:max-w-sm text-left lg:text-right lg:pb-4">
            <p className="text-lg text-dark-section/60 leading-relaxed font-light">
              Мы отобрали отели, которые сами по себе являются частью
              путешествия. Комфорт высшего класса в самых знаковых локациях.
            </p>
          </div>
        </div>

        {/* Hotels Display */}
        <div className="space-y-40 md:space-y-64">
          {hotels.map((hotel, hotelIdx) => (
            <HotelCard
              key={hotelIdx}
              hotel={hotel}
              isVisible={isVisible}
              index={hotelIdx}
            />
          ))}
        </div>

        {/* Global Conditions Footer */}
        <div className="mt-32 md:mt-48 pt-20 border-t border-dark-section/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <p className="text-xs font-black text-accent-cta uppercase tracking-[0.3em] mb-4">
                Условия
              </p>
              <h4 className="text-xl font-bold text-dark-section mb-2">
                Двухместное проживание
              </h4>
              <p className="text-sm text-dark-section/50 font-light">
                Размещение по 2 человека в номере. Мы подберем вам отличного
                соседа!
              </p>
            </div>
            <div>
              <p className="text-xs font-black text-accent-cta uppercase tracking-[0.3em] mb-4">
                Премиум
              </p>
              <h4 className="text-xl font-bold text-dark-section mb-2">
                Высокий сервис
              </h4>
              <p className="text-sm text-dark-section/50 font-light">
                Только проверенные отели с высокими рейтингами и лучшим
                расположением.
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <div className="bg-dark-section text-white p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-accent-cta transition-colors">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                    Нужeн Single?
                  </p>
                  <p className="font-bold">Доплата за отдельный номер</p>
                </div>
                <Star className="group-hover:rotate-45 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
