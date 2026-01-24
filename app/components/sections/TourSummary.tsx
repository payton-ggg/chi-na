"use client";

import { MapPin, ShieldCheck, Ticket, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function TourSummary() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const details = [
    {
      icon: <MapPin className="text-accent-cta" size={32} />,
      label: "Старт и окончание",
      value: "аэропорт Шанхая",
      sub: "Встречаем и провожаем",
    },
    {
      icon: <ShieldCheck className="text-accent-cta" size={32} />,
      label: "Тариф",
      value: "Все включено",
      sub: "*билет в Китай не входит",
    },
    {
      icon: <Ticket className="text-accent-cta" size={32} />,
      label: "Виза в Китай",
      value: "Не нужна",
      sub: "Для граждан РФ",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 bg-dark-section relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-cta/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-cta/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left Column: Narrative */}
            <div className="lg:w-3/5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/20 mb-8">
                <Sparkles size={16} className="text-accent-cta" />
                <span className="text-sm font-semibold text-accent-cta tracking-wide uppercase">
                  Ваше приключение
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold text-light-surface mb-8 leading-[1.1]">
                Шанхай и <br />
                <span className="bg-linear-to-r from-accent-cta to-accent-cta/70 bg-clip-text text-transparent">
                  горы Аватара
                </span>
              </h2>

              <p className="text-2xl font-medium text-light-surface/80 mb-6 italic">
                Мы отправляемся в новое путешествие с Tsunami Travel!
              </p>

              <div className="space-y-6 text-xl text-light-surface/70 leading-relaxed font-light">
                <p>
                  Будем восхищаться красотой и инновациями современного Шанхая.
                  Познакомимся с исторической частью города и окунемся в будни
                  местных жителей.
                </p>
                <p>
                  Освоим мастерство китайской каллиграфии в Шанхайской Венеции и
                  словим дзен на высотах гор Аватара.
                </p>
                <p>
                  А напоследок вместе побываем в сказке Диснея. <br />
                  <span className="font-bold text-light-surface">
                    Будет сказочно!
                  </span>
                </p>
              </div>
            </div>

            {/* Right Column: Info Cards */}
            <div className="lg:w-2/5 w-full space-y-6">
              {details.map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl transition-all duration-500 hover:border-accent-cta/30 hover:shadow-2xl hover:shadow-accent-cta/10 group delay-[${
                    idx * 150
                  }ms]`}
                >
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent-cta/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-widest text-light-surface/40 font-bold mb-1">
                        {item.label}
                      </p>
                      <p className="text-2xl font-bold text-light-surface">
                        {item.value}
                      </p>
                      <p className="text-sm text-light-surface/50">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Special CTA Card */}
              <div className="bg-linear-to-br from-accent-cta/20 to-transparent border border-white/10 p-8 rounded-3xl text-light-surface overflow-hidden relative group">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-2">Готовы к поездке?</h4>
                  <p className="text-light-surface/60 mb-6 font-light">
                    Забронируйте свое место в группе прямо сейчас. Количество
                    мест ограничено.
                  </p>
                  <button className="w-full bg-accent-cta hover:bg-accent-cta/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-accent-cta/20 transform hover:-translate-y-1">
                    Забронировать тур
                  </button>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-accent-cta/30 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
