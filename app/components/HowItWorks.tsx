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
      icon: <MessageSquare size={24} />,
      title: "Заявка",
      desc: "Вы оставляете заявку на сайте или пишете нам в мессенджеры. Мы связываемся в течение 10 минут.",
    },
    {
      icon: <Compass size={24} />,
      title: "Подбор тура",
      desc: "Наш эксперт предлагает идеальный маршрут, учитывая ваши даты, бюджет и пожелания.",
    },
    {
      icon: <ClipboardCheck size={24} />,
      title: "Оформление",
      desc: "Подписываем договор, помогаем с визой и страховкой. Берем на себя всю бюрократию.",
    },
    {
      icon: <Plane size={24} />,
      title: "Путешествие",
      desc: "Вы летите в Китай. Мы встречаем вас в аэропорту и сопровождаем на каждом этапе.",
    },
    {
      icon: <FileText size={24} />,
      title: "Поддержка 24/7",
      desc: "Мы всегда на связи во время вашей поездки, чтобы решить любой вопрос мгновенно.",
    },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Glows - Adjusted for light theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-scarlet-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-scarlet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Как мы работаем
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Прозрачный процесс от первого сообщения до возвращения домой. Мы
            заботимся о каждой детали вашего путешествия.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 md:-translate-x-1/2">
            <div className="absolute inset-0 bg-primary-scarlet-500/10 blur-[1px]" />
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
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
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      {/* Central Node for Mobile & Desktop */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] z-10 group transition-all duration-300 hover:border-primary-scarlet-500/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.15)]">
        <div className="absolute inset-0 bg-primary-scarlet-500/0 rounded-full blur-md group-hover:bg-primary-scarlet-500/10 transition-colors duration-500" />
        <div className="relative z-10 text-gray-400 group-hover:text-primary-scarlet-600 group-hover:scale-110 transition-all duration-300">
          {step.icon}
        </div>
      </div>

      {/* Content Side */}
      <div
        className={`ml-20 md:ml-0 md:w-1/2 flex ${
          isEven
            ? "md:justify-end md:pr-16"
            : "md:justify-start md:pl-16 md:order-last"
        }`}
      >
        <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary-scarlet-500/5 hover:border-primary-scarlet-500/20 transition-all duration-500 group w-full md:max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl font-black text-gray-100 group-hover:text-primary-scarlet-500/10 transition-colors duration-500">
              0{index + 1}
            </span>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-scarlet-600 transition-colors">
              {step.title}
            </h3>
          </div>
          <p className="text-gray-500 group-hover:text-gray-600 transition-colors leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>

      {/* Empty Spacer Side for Desktop layout balance */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}
