import { Sparkles, ArrowDown } from "lucide-react";

export default function BookingHero() {
  return (
    <section className="pt-40 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/20 mb-10 animate-fade-in">
          <Sparkles size={16} className="text-accent-cta" />
          <span className="text-sm font-semibold text-accent-cta tracking-wide uppercase">
            Начните своё приключение
          </span>
        </div>

        <h1 className="text-5xl md:text-[9vw] lg:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] text-white select-none animate-slide-up">
          Записаться <br />
          <span className="text-accent-cta italic font-serif lowercase font-medium">
            на тур
          </span>
        </h1>

        <p className="mt-12 text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in delay-200">
          Заполните форму ниже, и мы забронируем ваше место в{" "}
          <br className="hidden md:block" />
          самом запоминающемся путешествии по Китаю.
        </p>

        <div className="mt-16 flex justify-center animate-bounce">
          <ArrowDown className="text-accent-cta" size={32} />
        </div>
      </div>

      {/* Background Decorative patterns */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/2 select-none pointer-events-none whitespace-nowrap z-0">
        RESERVATION
      </div>
    </section>
  );
}
