import { ArrowUpRight, Sparkles } from "lucide-react";
import TourCard, { Tour } from "./tours/TourCard";
import ParallaxBackground from "./tours/ParallaxBackground";

const tours: Tour[] = [
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

export default function PopularTours() {
  return (
    <section id="tours" className="relative bg-dark-section overflow-hidden">
      <ParallaxBackground />

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
    </section>
  );
}
