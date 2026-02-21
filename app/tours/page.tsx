import Navbar from "@/app/_shared/layout/Navbar";
import Footer from "@/app/_shared/layout/Footer";
import SmoothScroll from "@/app/_shared/common/SmoothScroll";
import ToursHero from "@/app/_modules/tours-list/ToursHero";
import TourListCard from "@/app/_modules/tours-list/TourListCard";
import { tours } from "@/app/data/tours";

export const metadata = {
  title: "Все туры | TSUNAMI TRAVEL",
  description:
    "Авторские экскурсии по Шанхаю и окрестностям с русскоязычным гидом Львом Логачевым.",
};

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-dark-section text-light-surface relative">
      <SmoothScroll />
      <Navbar />

      {/* Background ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cta/10 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-cta/5 rounded-full blur-[120px] opacity-10" />
      </div>

      <div className="relative z-10">
        <ToursHero />

        <div className="container mx-auto px-6 max-w-5xl pb-32">
          <div className="space-y-6">
            {tours.map((tour, index) => (
              <TourListCard key={tour.id} tour={tour} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 text-center p-12 rounded-3xl border border-white/10 bg-white/3">
            <p className="text-white/50 text-lg mb-2">Не нашли подходящий тур?</p>
            <p className="text-white font-bold text-2xl mb-8">
              Напишите нам — составим маршрут под вас
            </p>
            <a
              href="/booking"
              className="inline-flex items-center gap-2 px-10 py-4 bg-accent-cta hover:bg-accent-cta/80 text-white font-black uppercase tracking-widest text-sm rounded-full transition-all duration-300 shadow-[0_10px_40px_rgba(194,56,28,0.3)] hover:shadow-[0_20px_60px_rgba(194,56,28,0.5)] hover:scale-105"
            >
              Написать нам
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}