import { ArrowDown, Sparkles } from "lucide-react";

export default function ScheduleHero() {
  return (
    <section className="pt-40 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/20 mb-10">
          <Sparkles size={16} className="text-accent-cta" />
          <span className="text-sm font-semibold text-accent-cta tracking-wide uppercase">
            План путешествия
          </span>
        </div>

        <h1 className="text-6xl md:text-[9vw] lg:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] text-white select-none">
          Программа <br />
          <span className="text-accent-cta italic font-serif lowercase font-medium">
            по дням
          </span>
        </h1>

        <p className="mt-12 text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
          Каждый день — это новая глава. От неоновых огней Шанхая до мистических
          вершин Аватара.
        </p>

        <div className="mt-16 flex justify-center animate-bounce">
          <ArrowDown className="text-accent-cta" size={32} />
        </div>
      </div>

      {/* Background Decorative patterns */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/2 select-none pointer-events-none whitespace-nowrap z-0">
        SCHEDULE
      </div>
    </section>
  );
}
