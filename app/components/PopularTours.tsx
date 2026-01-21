"use client";

import { ArrowUpRight } from "lucide-react";
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
  },
];

export default function PopularTours() {
  return (
    <section id="tours" className="py-24 bg-[#121417] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-scarlet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary-scarlet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Популярные{" "}
              <span className="text-primary-scarlet-500">Направления</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Выбранные маршруты, которые раскрывают Китай с лучших сторон.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-white/80 hover:text-primary-scarlet-500 font-semibold transition-colors group">
            Все туры{" "}
            <ArrowUpRight
              size={20}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>

        <div className="space-y-6">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-primary-scarlet-500/30 transition-all duration-500 hover:bg-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image */}
                <div className="lg:col-span-5 relative h-64 lg:h-96 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#121417]/80 lg:to-[#121417]" />

                  {/* Duration Badge */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-gray-900 shadow-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-scarlet-500 animate-pulse" />
                    {tour.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-primary-scarlet-500 mb-3 tracking-wider uppercase">
                      Тур #{tour.id}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-primary-scarlet-400 transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Стоимость
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {tour.price}
                      </div>
                    </div>

                    <PrimaryButton className="w-full sm:w-auto">
                      Подробнее о туре
                    </PrimaryButton>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-br from-primary-scarlet-500/5 via-transparent to-primary-scarlet-700/5" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="inline-flex items-center gap-2 text-white/80 hover:text-primary-scarlet-500 font-semibold transition-colors group">
            Все туры{" "}
            <ArrowUpRight
              size={20}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
