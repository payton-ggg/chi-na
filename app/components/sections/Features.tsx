"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const features = [
    {
      title: "Кто организатор тура",
      description: `Лев Логачев — блогер и знаток Китая, живет там несколько лет, снял 10+ фильмов и теперь лично ведёт вас в своё любимое место.`,
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
            О нас
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
                  <div
                    className={`backdrop-blur-sm border rounded-2xl p-8 md:p-10 shadow-lg relative overflow-hidden transition-colors duration-500 ${
                      index === 0 || index === 2
                        ? "bg-transparent border-accent-cta border-2"
                        : "bg-accent-cta border-gray-200"
                    }`}
                  >
                    {index !== 2 && (
                      <Image
                        src={index === 0 ? "/lev.png" : "/torch.png"}
                        alt={index === 0 ? "Lev" : "Torch"}
                        width={index === 0 ? 300 : 200}
                        height={index === 0 ? 300 : 200}
                        className={`absolute object-contain pointer-events-none transition-all duration-500 ${
                          index === 0
                            ? "bottom-0 right-0 opacity-100 translate-x-4 translate-y-4 scale-110"
                            : "-top-2 right-5 opacity-20"
                        }`}
                      />
                    )}

                    {/* Number */}
                    <div
                      className={`text-6xl md:text-7xl font-bold mb-6 relative z-10 ${
                        index === 0 || index === 2
                          ? "text-accent-cta/20"
                          : "text-light-surface"
                      }`}
                    >
                      0{index + 1}
                    </div>

                    {/* Title */}
                    <h4
                      className={`text-2xl md:text-3xl font-bold mb-6 relative z-10 ${
                        index === 0 || index === 2
                          ? "text-dark-section"
                          : "text-light-surface"
                      }`}
                    >
                      {feature.title}
                    </h4>

                    {/* Description */}
                    <p
                      className={`text-lg leading-relaxed relative z-10 ${
                        index === 0 || index === 2
                          ? "text-dark-section/80 max-w-[70%]"
                          : "text-light-surface"
                      }`}
                    >
                      {feature.description}
                    </p>

                    {/* Decorative line */}
                    <div
                      className={`mt-8 w-16 h-1 rounded-full relative z-10 ${
                        index === 0 || index === 2
                          ? "bg-accent-cta"
                          : "bg-light-surface"
                      }`}
                    />
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
