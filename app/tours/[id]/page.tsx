import { tours } from "@/app/data/tours";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/app/components/ui/PrimaryButton";

export function generateStaticParams() {
  return tours.map((tour) => ({
    id: tour.id.toString(),
  }));
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = tours.find((t) => t.id === parseInt(id));

  if (!tour) {
    return (
      <div className="min-h-screen bg-dark-section flex items-center justify-center text-white">
        Тур не найден
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-dark-section text-light-surface relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Link
            href="/#tours"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Назад к турам</span>
          </Link>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight">
            {tour.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Calendar size={18} className="text-accent-cta" />
              <span>{tour.duration}</span>
            </div>
            {tour.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
              >
                <Sparkles size={18} className="text-accent-cta" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 bg-dark-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              О туре
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-12">
              {tour.fullDescription || tour.description}
            </p>

            {tour.schedule && (
              <div className="space-y-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Программа по дням
                </h3>
                <div className="border-l border-white/10 pl-8 space-y-12">
                  {tour.schedule.map((day, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-accent-cta border-4 border-dark-section" />
                      <span className="text-accent-cta font-bold uppercase tracking-wider mb-2 block">
                        {day.day}
                      </span>
                      <h4 className="text-xl font-bold text-white mb-3">
                        {day.title}
                      </h4>
                      <p className="text-white/60 leading-relaxed">
                        {day.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 flex justify-center">
              <Link href="/booking">
                <PrimaryButton>Забронировать тур</PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
