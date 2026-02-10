import { ArrowLeft, Calendar, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/app/data/tours";

export default function TourHero({ tour }: { tour: Tour }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-dark-section" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <Link
          href="/#tours"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-all hover:-translate-x-2 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:text-accent-cta transition-colors"
          />
          <span className="uppercase tracking-widest text-xs font-bold">
            Назад к турам
          </span>
        </Link>

        <h1 className="text-6xl md:text-9xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
          {tour.title}
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-white/90 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:border-accent-cta/50 transition-colors duration-300">
            <Calendar size={20} className="text-accent-cta" />
            <span className="font-medium tracking-wide">{tour.duration}</span>
          </div>
          {tour.highlights.slice(0, 3).map((highlight, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:border-accent-cta/50 transition-colors duration-300"
            >
              <Sparkles size={16} className="text-accent-cta animate-pulse" />
              <span className="font-medium tracking-wide uppercase text-sm">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-24 bg-linear-to-b from-accent-cta to-transparent opacity-50" />
      </div>
    </section>
  );
}
