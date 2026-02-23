"use client";

import { Sparkles, MapPin, ArrowDown } from "lucide-react";

export default function ToursHero() {
  return (
    <section className="pt-40 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/20 mb-10">
          <MapPin size={16} className="text-accent-cta" />
          <span className="text-sm font-semibold text-accent-cta tracking-wide uppercase">
            Индивидуальные экскурсии
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-[9vw] lg:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] text-white select-none">
          Все <br />
          <span className="text-accent-cta italic font-serif lowercase font-medium">
            туры
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-12 text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
          Авторские экскурсии с русскоязычным гидом. Шанхай и окрестности —
          Восточная Венеция, Ханчжоу и не только.
        </p>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { value: "3", label: "Маршрута" },
            { value: "1", label: "Гид" },
            { value: "5–9ч", label: "Продолжительность" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center animate-bounce">
          <ArrowDown className="text-accent-cta" size={32} />
        </div>
      </div>

      {/* Decorative background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/2 select-none pointer-events-none whitespace-nowrap z-0">
        TOURS
      </div>
    </section>
  );
}
