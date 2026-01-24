"use client";

import {
  FileText,
  Plane,
  Compass,
  MessageSquare,
  ClipboardCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquare size={28} />,
      title: "Заявка",
      desc: "Вы оставляете заявку на сайте или пишете нам в мессенджеры. Мы связываемся в течение 10 минут.",
    },
    {
      icon: <Compass size={28} />,
      title: "Подбор тура",
      desc: "Наш эксперт предлагает идеальный маршрут, учитывая ваши даты, бюджет и пожелания.",
    },
    {
      icon: <ClipboardCheck size={28} />,
      title: "Оформление",
      desc: "Подписываем договор, помогаем с визой и страховкой. Берем на себя всю бюрократию.",
    },
    {
      icon: <Plane size={28} />,
      title: "Путешествие",
      desc: "Вы летите в Китай. Мы встречаем вас в аэропорту и сопровождаем на каждом этапе.",
    },
    {
      icon: <FileText size={28} />,
      title: "Поддержка 24/7",
      desc: "Мы всегда на связи во время вашей поездки, чтобы решить любой вопрос мгновенно.",
    },
  ];

  return (
    <section className="py-32 bg-main-bg relative overflow-hidden">
      {/* Background Glows - Adjusted for light theme */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-cta/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-cta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-7xl font-bold text-dark-section mb-8 tracking-tight">
            Как мы работаем
          </h2>
          <p className="text-dark-section/70 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Прозрачный процесс от первого сообщения до возвращения домой. Мы
            заботимся о каждой детали вашего путешествия.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-0.5 bg-dark-section/10 md:-translate-x-1/2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-accent-cta/20 via-accent-cta/50 to-accent-cta/20 animate-pulse-slow" />
          </div>

          <div className="space-y-20 md:space-y-32">
            {steps.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

function StepItem({
  step,
  index,
}: {
  step: { icon: React.ReactNode; title: string; desc: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Trigger slightly earlier
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-0 transition-all duration-1000 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-95"
      }`}
    >
      {/* Central Node for Mobile & Desktop */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-light-surface border-2 border-dark-section/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-10 group transition-all duration-300 hover:border-accent-cta hover:shadow-[0_0_30px_rgba(194,56,28,0.25)] hover:scale-110">
        <div className="absolute inset-0 bg-accent-cta/0 rounded-full blur-md group-hover:bg-accent-cta/10 transition-colors duration-500" />
        <div className="relative z-10 text-dark-section/50 group-hover:text-accent-cta transition-all duration-300">
          {step.icon}
        </div>
      </div>

      {/* Content Side */}
      <div
        className={`ml-24 md:ml-0 md:w-1/2 flex ${
          isEven
            ? "md:justify-end md:pr-24"
            : "md:justify-start md:pl-24 md:order-last"
        }`}
      >
        <div className="bg-transparent backdrop-blur-sm border border-dark-section/10 p-10 rounded-3xl shadow-none hover:shadow-[0_20px_60px_rgba(194,56,28,0.1)] hover:borer-accent-cta/30 transition-all duration-500 group w-full md:max-w-lg cursor-default relative overflow-hidden">
          {/* Subtle gradient background on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-accent-cta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-baseline gap-4 mb-4 border-b border-dark-section/10 pb-4 group-hover:border-accent-cta/20 transition-colors duration-500">
              <span className="text-5xl font-black text-dark-section/10 group-hover:text-accent-cta/20 transition-colors duration-500">
                0{index + 1}
              </span>
              <h3 className="text-2xl font-bold text-dark-section group-hover:text-accent-cta transition-colors tracking-tight">
                {step.title}
              </h3>
            </div>
            <p className="text-dark-section/70 text-lg group-hover:text-dark-section transition-colors leading-relaxed">
              {step.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Empty Spacer Side for Desktop layout balance */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}
