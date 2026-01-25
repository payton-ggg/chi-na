"use client";

import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "../ui/PrimaryButton";
import { useEffect, useRef, useState } from "react";

const tours = [
  {
    id: 1,
    title: "Шанхай",
    description:
      "Футуристический мегаполис, Диснейленд и водные города. Контраст будущего и прошлого.",
    duration: "День 1-4",
    image: "/shangai.png",
    highlights: ["Shanghai Tower", "Bund", "Водные города"],
  },
  {
    id: 2,
    title: "Горы Аватара",
    description:
      "Аватар-парк Чжанцзяцзе, горы Хуаншань и стеклянные мосты. Для любителей природы.",
    duration: "День 5-8",
    image: "/avatar.png",
    highlights: ["Парк Чжанцзяцзе", "Стеклянный мост", "Желтые горы"],
  },
  {
    id: 3,
    title: "Восточная Венеция",
    description:
      "Сучжоу и Ханчжоу — города садов, шелка и чая. Классика Китая.",
    duration: "День 9-12",
    image: "/venice.png",
    highlights: ["Сучжоу", "Ханчжоу", "Шелк", "Чай"],
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
          <div className="relative bg-linear-to-br from-light-surface/[0.07] to-light-surface/3 backdrop-blur-xl rounded-[28px] overflow-hidden border border-light-surface/10 shadow-2xl shadow-black/20">
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
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-dark-section/60 lg:to-dark-section/80" />

                {/* Animated glow */}
                <div
                  className="absolute inset-0 bg-linear-to-tr from-accent-cta/20 via-accent-cta/10 to-transparent transition-opacity duration-700"
                  style={{ opacity: scrollProgress * 0.5 }}
                />

                {/* Tour number */}
                <div className="absolute bottom-8 left-8">
                  <div
                    className="text-8xl font-black text-light-surface/10 leading-none transition-opacity duration-700"
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
                  className="absolute top-0 right-0 w-40 h-40 bg-accent-cta/5 rounded-full blur-3xl transition-all duration-700"
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
                      <div className="w-12 h-[2px] bg-linear-to-r from-accent-cta to-transparent rounded-full" />
                      <span className="text-sm font-bold text-accent-cta tracking-widest uppercase">
                        Этап #{tour.id}
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
                        className="px-4 py-2 bg-light-surface/5 border border-light-surface/10 rounded-full text-sm text-light-surface/80 hover:bg-light-surface/10 hover:border-accent-cta/30 hover:text-light-surface transition-all duration-300"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA - appears last */}
                  {/* CTA - appears last */}
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8 border-t border-light-surface/10 transition-all duration-1000 ease-out delay-300"
                    style={{
                      opacity: priceProgress,
                      transform: `translateX(${(1 - priceProgress) * 50}px)`,
                    }}
                  >
                    <PrimaryButton className="w-full sm:w-auto">
                      Подробнее об этапе
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
              <div className="absolute inset-0 bg-linear-to-br from-accent-cta/[0.07] via-transparent to-accent-cta/[0.07]" />
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-accent-cta/50 to-transparent" />
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-accent-cta/50 to-transparent" />
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
    <section id="tours" className="relative bg-dark-section overflow-hidden">
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

      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent-cta/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div
        className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent-cta/8 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/20 mb-6">
              <Sparkles size={16} className="text-accent-cta" />
              <span className="text-sm font-semibold text-accent-cta tracking-wide uppercase">
                Гран-тур по Китаю
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-light-surface mb-6 leading-[1.1]">
              Программа{" "}
              <span className="bg-linear-to-r from-accent-cta via-brand-gold to-accent-cta bg-clip-text text-transparent">
                Тура
              </span>
            </h2>
            <p className="text-light-surface/70 text-xl leading-relaxed">
              Три уникальные локации за одно путешествие. Шанхай, Горы Аватара и
              Восточная Венеция в одной поездке.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-light-surface/80 hover:text-light-surface font-semibold transition-all group px-6 py-3 rounded-full border border-light-surface/10 hover:border-accent-cta/50 hover:bg-light-surface/5">
            <span>Полная программа</span>
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
