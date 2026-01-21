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
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Glows - Adjusted for light theme */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-scarlet-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-scarlet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            Как мы работаем
          </h2>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Прозрачный процесс от первого сообщения до возвращения домой. Мы
            заботимся о каждой детали вашего путешествия.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-1/2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-primary-scarlet-500/20 via-primary-scarlet-500/50 to-primary-scarlet-500/20 animate-pulse-slow" />
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
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-10 group transition-all duration-300 hover:border-primary-scarlet-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.25)] hover:scale-110">
        <div className="absolute inset-0 bg-primary-scarlet-500/0 rounded-full blur-md group-hover:bg-primary-scarlet-500/10 transition-colors duration-500" />
        <div className="relative z-10 text-gray-400 group-hover:text-primary-scarlet-600 transition-all duration-300">
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
        <div className="bg-white border border-gray-100 p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(220,38,38,0.1)] hover:border-primary-scarlet-500/30 transition-all duration-500 group w-full md:max-w-lg cursor-default relative overflow-hidden">
          {/* Subtle gradient background on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-primary-scarlet-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-baseline gap-4 mb-4 border-b border-gray-100 pb-4 group-hover:border-primary-scarlet-500/20 transition-colors duration-500">
              <span className="text-5xl font-black text-gray-100 group-hover:text-primary-scarlet-500/20 transition-colors duration-500">
                0{index + 1}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-scarlet-700 transition-colors tracking-tight">
                {step.title}
              </h3>
            </div>
            <p className="text-gray-500 text-lg group-hover:text-gray-700 transition-colors leading-relaxed">
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
