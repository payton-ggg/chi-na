"use client";

import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useRef, useState } from "react";

const tours = [
  {
    id: 1,
    title: "Величие Империи",
    description:
      "Пекин, Сиань и Великая Китайская стена. Погружение в историю древней цивилизации.",
    duration: "10 дней",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2070&auto=format&fit=crop",
    price: "от $2,450",
    highlights: ["Запретный город", "Терракотовая армия", "Великая стена"],
  },
  {
    id: 2,
    title: "Мистические Горы",
    description:
      "Аватар-парк Чжанцзяцзе, горы Хуаншань и стеклянные мосты. Для любителей природы.",
    duration: "12 дней",
    image: "https://media.vand.ru/tourgallery/121299/ib17068689283633.webp",
    price: "от $2,800",
    highlights: ["Парк Чжанцзяцзе", "Стеклянный мост", "Желтые горы"],
  },
  {
    id: 3,
    title: "Шанхайский Модерн",
    description:
      "Футуристический мегаполис, Диснейленд и водные города. Контраст будущего и прошлого.",
    duration: "8 дней",
    image:
      "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=2070&auto=format&fit=crop",
    price: "от $1,950",
    highlights: ["Shanghai Tower", "Bund", "Водные города"],
  },
  {
    id: 4,
    title: "Тайны Тибета",
    description:
      "Дворцы Лхасы, базовый лагерь Эвереста и духовные практики в горах.",
    duration: "14 дней",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
    price: "от $3,100",
    highlights: ["Потала", "Эверест BC", "Монастыри"],
  },
];

function TourCard({ tour, index }: { tour: (typeof tours)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate when card enters viewport
      const cardTop = rect.top;
      const cardHeight = rect.height;

      // Start animation when card is 80% in viewport
      const triggerPoint = windowHeight * 0.8;

      if (cardTop < triggerPoint && cardTop > -cardHeight) {
        // Calculate progress (0 to 1)
        const progress = Math.min(
          Math.max((triggerPoint - cardTop) / (cardHeight * 0.8), 0),
          1
        );
        setScrollProgress(progress);
      } else if (cardTop >= triggerPoint) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Calculate individual element animations based on scroll progress
  const titleProgress = Math.min(scrollProgress * 2, 1);
  const descProgress = Math.min(Math.max((scrollProgress - 0.2) * 2, 0), 1);
  const highlightsProgress = Math.min(
    Math.max((scrollProgress - 0.4) * 2, 0),
    1
  );
  const priceProgress = Math.min(Math.max((scrollProgress - 0.6) * 2, 0), 1);

  return (
    <div
      ref={cardRef}
      className="min-h-screen flex items-center py-12 sticky top-0"
      style={{
        zIndex: 10 - index,
      }}
    >
      <div className="container mx-auto px-6">
        <div className="relative">
          {/* Animated border gradient */}
          <div
            className="absolute -inset-px bg-linear-to-r from-primary-scarlet-600/0 via-primary-scarlet-500/30 to-primary-scarlet-600/0 rounded-[28px] blur-sm transition-opacity duration-700"
            style={{ opacity: scrollProgress * 0.8 }}
          />

          {/* Main card */}
          <div className="relative bg-linear-to-br from-white/[0.07] to-white/3 backdrop-blur-xl rounded-[28px] overflow-hidden border border-white/8 shadow-2xl shadow-black/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative min-h-[600px]">
              {/* Fixed Image Section - Left */}
              <div className="relative h-[400px] lg:h-full overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-1000 ease-out"
                  style={{
                    transform: `scale(${1 + scrollProgress * 0.1})`,
                  }}
                >
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    quality={95}
                  />
                </div>

                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#121417]/60 lg:to-[#121417]/80" />

                {/* Animated glow */}
                <div
                  className="absolute inset-0 bg-linear-to-tr from-primary-scarlet-600/20 via-primary-scarlet-500/10 to-transparent transition-opacity duration-700"
                  style={{ opacity: scrollProgress * 0.5 }}
                />

                {/* Premium Duration Badge */}
                <div
                  className="absolute top-8 left-8 transition-all duration-700"
                  style={{
                    opacity: scrollProgress,
                    transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full blur-sm" />
                    <div className="relative flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
                      <Calendar
                        size={16}
                        className="text-primary-scarlet-600"
                      />
                      <span className="text-sm font-bold text-gray-900">
                        {tour.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tour number */}
                <div className="absolute bottom-8 left-8">
                  <div
                    className="text-8xl font-black text-white/10 leading-none transition-opacity duration-700"
                    style={{ opacity: scrollProgress }}
                  >
                    0{tour.id}
                  </div>
                </div>
              </div>

              {/* Animated Content Section - Right */}
              <div className="p-10 lg:p-14 flex flex-col justify-center relative">
                {/* Decorative element */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 bg-primary-scarlet-500/5 rounded-full blur-3xl transition-all duration-700"
                  style={{ opacity: scrollProgress * 0.5 }}
                />

                <div className="relative space-y-6">
                  {/* Title - appears first */}
                  <div
                    className="transition-all duration-1000 ease-out"
                    style={{
                      opacity: titleProgress,
                      transform: `translateX(${(1 - titleProgress) * 50}px)`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-[2px] bg-linear-to-r from-primary-scarlet-500 to-transparent rounded-full" />
                      <span className="text-sm font-bold text-primary-scarlet-400 tracking-widest uppercase">
                        Тур #{tour.id}
                      </span>
                    </div>

                    <h3 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                      {tour.title}
                    </h3>
                  </div>

                  {/* Description - appears second */}
                  <div
                    className="transition-all duration-1000 ease-out delay-100"
                    style={{
                      opacity: descProgress,
                      transform: `translateX(${(1 - descProgress) * 50}px)`,
                    }}
                  >
                    <p className="text-gray-400 text-lg lg:text-xl leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  {/* Highlights - appears third */}
                  <div
                    className="flex flex-wrap gap-2 transition-all duration-1000 ease-out delay-200"
                    style={{
                      opacity: highlightsProgress,
                      transform: `translateX(${
                        (1 - highlightsProgress) * 50
                      }px)`,
                    }}
                  >
                    {tour.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-primary-scarlet-500/30 hover:text-white transition-all duration-300"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA - appears last */}
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8 border-t border-white/10 transition-all duration-1000 ease-out delay-300"
                    style={{
                      opacity: priceProgress,
                      transform: `translateX(${(1 - priceProgress) * 50}px)`,
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-primary-scarlet-500/10 rounded-2xl blur-xl" />
                      <div className="relative">
                        <div className="text-sm text-gray-500 font-medium mb-1">
                          Стоимость
                        </div>
                        <div className="text-4xl lg:text-5xl font-black bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {tour.price}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          на человека
                        </div>
                      </div>
                    </div>

                    <PrimaryButton className="w-full sm:w-auto">
                      Подробнее о туре
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium hover glow effect */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{ opacity: scrollProgress * 0.5 }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary-scarlet-500/[0.07] via-transparent to-primary-scarlet-700/[0.07]" />
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-primary-scarlet-400/50 to-transparent" />
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-primary-scarlet-400/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PopularTours() {
  const monachRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const bambooRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (monachRef.current) {
            // Optimized subtle movement for Monach
            monachRef.current.style.transform = `translate3d(-${
              scrollY * 0.05
            }px, ${scrollY * 0.02}px, 0) rotate(10deg)`;
          }
          if (flashRef.current) {
            flashRef.current.style.transform = `translate3d(${
              scrollY * 0.08
            }px, -50%, 0) rotate(-20deg)`;
          }
          if (bambooRef.current) {
            bambooRef.current.style.transform = `translate3d(${
              scrollY * 0.12
            }px, -${scrollY * 0.04}px, 0)`;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="tours" className="relative bg-[#121417] overflow-hidden">
      {/* Decorative Atmosphere Elements - Optimized with will-change-transform */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          ref={monachRef}
          className="absolute top-40 -right-20 w-80 h-80 opacity-20 will-change-transform"
        >
          <Image
            src="/monach.png"
            alt="Monach"
            fill
            className="object-contain"
          />
        </div>

        <div
          ref={flashRef}
          className="absolute top-[33%] -left-20 w-64 h-64 opacity-15 will-change-transform"
        >
          <Image src="/flash.png" alt="Flash" fill className="object-contain" />
        </div>

        <div
          ref={bambooRef}
          className="absolute bottom-40 -left-10 w-96 h-96 opacity-25 will-change-transform"
        >
          <Image
            src="/bamboo.png"
            alt="Bamboo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary-scarlet-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div
        className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-primary-scarlet-500/8 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/2 rounded-full blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container mx-auto px-6 pt-32 pb-12 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-scarlet-500/10 border border-primary-scarlet-500/20 mb-6">
              <Sparkles size={16} className="text-primary-scarlet-400" />
              <span className="text-sm font-semibold text-primary-scarlet-400 tracking-wide uppercase">
                Эксклюзивные маршруты
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Популярные{" "}
              <span className="bg-linear-to-r from-primary-scarlet-400 via-primary-scarlet-500 to-primary-scarlet-600 bg-clip-text text-transparent">
                Направления
              </span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              Выбранные маршруты, которые раскрывают Китай с лучших сторон.
              Каждый тур — это уникальная история.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-white/80 hover:text-white font-semibold transition-all group px-6 py-3 rounded-full border border-white/10 hover:border-primary-scarlet-500/50 hover:bg-white/5">
            <span>Все туры</span>
            <ArrowUpRight
              size={20}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Scroll-driven tour cards */}
      <div className="relative">
        {tours.map((tour, index) => (
          <TourCard key={tour.id} tour={tour} index={index} />
        ))}
      </div>

      {/* Add spacing at bottom */}
      <div className="h-32" />

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.08;
          }
          50% {
            opacity: 0.15;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
