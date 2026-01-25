"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const features = [
    {
      title: "Кто организатор тура",
      description: `Лев Логачев — блогер и знаток Китая, который живёт в стране уже несколько лет.
За это время он глубоко погрузился в местную культуру, быт и ритм жизни, снял более 10 авторских фильмов о Китае и его городах.
В этом туре Лев лично сопровождает группу, делится своим опытом и показывает страну не с туристической стороны, а такой, какой он знает её изнутри.`,
    },
    {
      title: "Формат путешествия",
      description: `Авторский тур в мини-группе, построенный без шаблонных маршрутов и жёсткого расписания.
В программе — редкие локации, продуманный, но гибкий ритм путешествия и внимание к каждому участнику.
Маршрут адаптируется под группу, настроение и интересы, создавая ощущение личного и комфортного путешествия.`,
    },
    {
      title: "Для кого этот тур",
      description: `Для тех, кто ценит смысл и глубину в путешествиях.
Кому важны атмосфера, личный подход и спокойный формат без суеты и туристических толп.`,
    },
    {
      title: "Что вас ожидает в путешествии",
      description: `Пять дней в Шанхае — городе контрастов, вкуса и живой энергии.
Не стандартный маршрут, а опыт, выстроенный под вас и ваши интересы.`,
    },
  ];

  return (
    <section className="py-24 md:py-56 bg-main-bg">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            НАШИ ПРЕИМУЩЕСТВА
          </p>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Titles */}
          <div className="space-y-0">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                className="group cursor-pointer border-t border-gray-200 first:border-t-0"
              >
                <div className="flex items-center justify-between py-8 md:py-10 transition-all duration-300">
                  <h3
                    className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-300 ${
                      activeFeature === index
                        ? "text-gray-900"
                        : "text-gray-600 group-hover:text-gray-800"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <ArrowUpRight
                    className={`w-6 h-6 md:w-8 md:h-8 transition-all duration-300 ${
                      activeFeature === index
                        ? "text-primary-scarlet-500 opacity-100 translate-x-0 translate-y-0"
                        : "text-gray-400 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Description */}
          <div className="relative lg:sticky lg:top-32 h-fit">
            <div className="relative">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    activeFeature === index
                      ? "opacity-100 translate-y-0 relative"
                      : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <div className="bg-accent-cta backdrop-blur-sm border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg relative overflow-hidden">
                    <Image
                      src="/torch.png"
                      alt="Torch"
                      width={200}
                      height={200}
                      className="absolute -top-2 right-5 opacity-20 object-contain pointer-events-none"
                    />

                    {/* Number */}
                    <div className="text-6xl md:text-7xl font-bold text-light-surface mb-6 relative z-10">
                      0{index + 1}
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl md:text-3xl font-bold text-light-surface mb-6">
                      {feature.title}
                    </h4>

                    {/* Description */}
                    <p className="text-lg text-light-surface leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative line */}
                    <div className="mt-8 w-16 h-1 bg-light-surface rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
