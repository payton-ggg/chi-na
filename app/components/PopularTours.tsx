"use client";

import { Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const tours = [
  {
    id: 1,
    title: "Величие Империи",
    description:
      "Пекин, Сиань и Великая Китайская стена. Погружение в историю древней цивилизации.",
    duration: "10 дней",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2070&auto=format&fit=crop", // Forbidden City / Wall
    price: "от $2,450",
  },
  {
    id: 2,
    title: "Мистические Горы",
    description:
      "Аватар-парк Чжанцзяцзе, горы Хуаншань и стеклянные мосты. Для любителей природы.",
    duration: "12 дней",
    image:
      "https://images.unsplash.com/photo-1518022525094-218fc0eb7f95?q=80&w=1974&auto=format&fit=crop", // Mountains
    price: "от $2,800",
  },
  {
    id: 3,
    title: "Шанхайский Модерн",
    description:
      "Футтуристический мегаполис, Диснейленд и водные города. Контраст будущего и прошлого.",
    duration: "8 дней",
    image:
      "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=2070&auto=format&fit=crop", // Shanghai
    price: "от $1,950",
  },
  {
    id: 4,
    title: "Тайны Тибета",
    description:
      "Дворцы Лхасы, базовый лагерь Эвереста и духовные практики в горах.",
    duration: "14 дней",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop", // Tibet
    price: "от $3,100",
  },
];

export default function PopularTours() {
  return (
    <section id="tours" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Популярные{" "}
              <span className="text-primary-scarlet-600">Направления</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Выбранные маршруты, которые раскрывают Китай с лучших сторон.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-primary-scarlet-600 font-semibold hover:text-primary-scarlet-700 transition-colors">
            Все туры <ArrowUpRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full ring-1 ring-gray-100 hover:ring-primary-scarlet-100"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                  {tour.duration}
                </div>
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-scarlet-600 transition-colors">
                  {tour.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 grow">
                  {tour.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <span className="text-lg font-bold text-gray-900">
                    {tour.price}
                  </span>
                  <button className="text-sm font-semibold text-white bg-black hover:bg-primary-scarlet-600 px-4 py-2 rounded-lg transition-colors duration-300">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="inline-flex items-center gap-2 text-primary-scarlet-600 font-semibold hover:text-primary-scarlet-700 transition-colors">
            Все туры <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
