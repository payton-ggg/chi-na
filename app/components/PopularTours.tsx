"use client";

import { ArrowUpRight, MapPin, Calendar, Sparkles } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

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
    image:
      "https://images.unsplash.com/photo-1518022525094-218fc0eb7f95?q=80&w=1974&auto=format&fit=crop",
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

export default function PopularTours() {
  return (
    <section id="tours" className="py-32 bg-[#121417] relative overflow-hidden">
      {/* Enhanced Decorative elements */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary-scarlet-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div
        className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-primary-scarlet-500/8 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/2 rounded-full blur-3xl pointer-events-none" />

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header with premium styling */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
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

        {/* Premium tour cards */}
        <div className="space-y-8">
          {tours.map((tour, index) => (
            <div key={tour.id} className="group relative">
              {/* Animated border gradient */}
              <div className="absolute -inset-px bg-linear-to-r from-primary-scarlet-600/0 via-primary-scarlet-500/30 to-primary-scarlet-600/0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />

              {/* Main card */}
              <div className="relative bg-linear-to-br from-white/[0.07] to-white/3 backdrop-blur-xl rounded-[28px] overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-700 shadow-2xl shadow-black/20 group-hover:shadow-primary-scarlet-900/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
                  {/* Premium Image Section */}
                  <div className="lg:col-span-5 relative h-80 lg:h-[500px] overflow-hidden">
                    {/* Image with parallax effect */}
                    <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-1000 ease-out">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover"
                        quality={95}
                      />
                    </div>

                    {/* Multi-layer gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-black/30 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#121417]/80 lg:to-[#121417]" />

                    {/* Animated glow effect on hover */}
                    <div className="absolute inset-0 bg-linear-to-tr from-primary-scarlet-600/0 via-primary-scarlet-500/0 to-primary-scarlet-400/0 group-hover:from-primary-scarlet-600/20 group-hover:via-primary-scarlet-500/10 group-hover:to-transparent transition-all duration-700" />

                    {/* Premium Duration Badge */}
                    <div className="absolute top-8 left-8">
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

                    {/* Tour number with premium styling */}
                    <div className="absolute bottom-8 left-8">
                      <div className="text-8xl font-black text-white/5 leading-none">
                        0{tour.id}
                      </div>
                    </div>
                  </div>

                  {/* Premium Content Section */}
                  <div className="lg:col-span-7 p-10 lg:p-14 flex flex-col justify-center relative">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary-scarlet-500/5 rounded-full blur-3xl group-hover:bg-primary-scarlet-500/10 transition-colors duration-700" />

                    <div className="relative">
                      {/* Category badge */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-primary-scarlet-400 tracking-widest uppercase">
                          <div className="w-12 h-[2px] bg-linear-to-r from-primary-scarlet-500 to-transparent rounded-full" />
                          <span>Тур #{tour.id}</span>
                        </div>
                      </div>

                      {/* Title with gradient on hover */}
                      <h3 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        <span className="text-white group-hover:bg-linear-to-r group-hover:from-white group-hover:via-primary-scarlet-200 group-hover:to-white group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                          {tour.title}
                        </span>
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-lg lg:text-xl leading-relaxed mb-8">
                        {tour.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-10">
                        {tour.highlights.map((highlight, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-primary-scarlet-500/30 hover:text-white transition-all duration-300 cursor-default"
                          >
                            {highlight}
                          </div>
                        ))}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8 border-t border-white/10">
                        <div className="relative">
                          <div className="absolute -inset-4 bg-primary-scarlet-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative">
                            <div className="flex items-baseline gap-2 mb-1">
                              <div className="text-sm text-gray-500 font-medium">
                                Стоимость
                              </div>
                            </div>
                            <div className="text-4xl lg:text-5xl font-black bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              {tour.price}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              на человека
                            </div>
                          </div>
                        </div>

                        <PrimaryButton className="w-full sm:w-auto group-hover:scale-105 transition-transform duration-300">
                          Подробнее о туре
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-linear-to-br from-primary-scarlet-500/[0.07] via-transparent to-primary-scarlet-700/[0.07]" />
                  <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-primary-scarlet-400/50 to-transparent" />
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-primary-scarlet-400/50 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/10 hover:border-primary-scarlet-500/50 text-white/80 hover:text-white font-semibold transition-all group hover:bg-white/5 md:hidden">
            <span>Все туры</span>
            <ArrowUpRight
              size={20}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>

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
