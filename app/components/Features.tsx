"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const features = [
    {
      title: "Глубокая экспертиза",
      description:
        "Мы знаем Китай изнутри. Локальные маршруты, скрытые жемчужины и места без толп туристов. Наши гиды – это местные эксперты с многолетним опытом, которые откроют вам настоящий Китай.",
    },
    {
      title: "Проверенные гиды",
      description:
        "Только профессионалы, которые живут в Китае, говорят на языке и знают менталитет. Все наши гиды прошли тщательный отбор и имеют лицензии. Они не просто показывают достопримечательности – они рассказывают истории.",
    },
    {
      title: "Безопасность 24/7",
      description:
        "Мы на связи круглосуточно. Решаем любые вопросы от визы до внезапной смены погоды. Наша команда поддержки всегда рядом, чтобы ваше путешествие было комфортным и безопасным.",
    },
    {
      title: "С душой и комфортом",
      description:
        "Авторские программы, лучшие отели и транспорт. Ваше путешествие будет безупречным. Мы тщательно отбираем каждый элемент тура, чтобы создать незабываемые впечатления.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
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
                        : "text-gray-400 group-hover:text-gray-600"
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
                  <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg">
                    {/* Number */}
                    <div className="text-6xl md:text-7xl font-bold text-black mb-6">
                      0{index + 1}
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                      {feature.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Decorative line */}
                    <div className="mt-8 w-16 h-1 bg-primary-scarlet-500 rounded-full" />
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
