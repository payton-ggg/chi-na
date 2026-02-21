"use client";

import { useState } from "react";
import { ArrowUpRight, Compass, Shield, Users, Map } from "lucide-react";
import Image from "next/image";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const features = [
    {
      title: "Наша экспертиза",
      short: "Лев Логачев и команда знатоков Китая.",
      description: `Мы не просто агентство, мы — команда исследователей. Лев Логачев прожил в Китае несколько лет, снял 10+ авторских фильмов и теперь открывает эту страну для вас через призму своего опыта и личного участия в каждой детали.`,
      icon: <Compass size={20} />,
    },
    {
      title: "Экспедиционный подход",
      short: "Вне протоптанных троп в мини-группах.",
      description: `Мы против массового туризма. Наш подход — это экспедиционный формат в группах до 5 человек. Это дает нам свободу быть гибкими: зайти в аутентичную чайную, которую не знают туристы, или подняться на гору чуть раньше ради идеального света без толп. Мы выбираем только лучшие локации и лучший транспорт.`,
      icon: <Users size={20} />,
    },
    {
      title: "Наше сообщество",
      short: "Для тех, кто ценит смыслы и глубину.",
      description: `Наши путешественники — это люди, ищущие перезагрузки и аутентичного опыта. Мы создаем среду, где качественное общение и общие интересы значат больше, чем просто осмотр достопримечательностей. Это сообщество эстетов, готовых к новым открытиям и глубокому погружению в культуру.`,
      icon: <Shield size={20} />,
    },
    {
      title: "Философия открытий",
      short: "Там, где инновации встречаются с вечностью.",
      description: `Наша цель — показать Китай во всей его многогранности. От футуристического Шанхая, обгоняющего время, до магических туманов Чжанцзяцзе, замерших в вечности. Мы ведем диалог с культурой без посредников, создавая путешествия, которые меняют видение мира и самих себя.`,
      icon: <Map size={20} />,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-34 bg-main-bg relative overflow-hidden"
    >
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap z-0">
        <span className="text-[25vw] font-black leading-none tracking-tighter text-dark-section">
          TsunamiTravel Team
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-accent-cta mb-6">
              Эксклюзивный подход
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-dark-section leading-[0.9] tracking-tighter">
              Больше, чем <br />
              <span className="text-accent-cta italic font-serif pr-4">
                просто
              </span>{" "}
              путешествия.
            </h2>
          </div>
          <div className="md:max-w-xs pb-4">
            <p className="text-sm text-dark-section/40 font-medium leading-relaxed">
              Мы создаем путешествия, которые меняют восприятие мира. Никаких
              шаблонов — только глубокое погружение.
            </p>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start scale-90  ">
          {/* Left Column - Titles & Short Info */}
          <div className="lg:col-span-6 space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                onClick={() => setActiveFeature(index)}
                className={`group cursor-pointer rounded-3xl p-6 md:p-8 transition-all duration-500 border ${
                  activeFeature === index
                    ? "bg-dark-section border-dark-section shadow-2xl translate-x-2"
                    : "bg-transparent border-dark-section/10 hover:border-accent-cta/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                        activeFeature === index
                          ? "bg-accent-cta text-white"
                          : "bg-dark-section/5 text-dark-section/40 group-hover:text-accent-cta"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-lg md:text-3xl font-bold tracking-tight transition-all duration-300 ${
                          activeFeature === index
                            ? "text-white"
                            : "text-dark-section/60"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`text-xs md:text-sm mt-1 transition-all duration-300 ${
                          activeFeature === index
                            ? "text-white/40"
                            : "text-dark-section/20 opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {feature.short}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ${
                      activeFeature === index
                        ? "text-accent-cta opacity-100 scale-125"
                        : "text-dark-section/20 opacity-0 group-hover:opacity-100 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Elaborated Description */}
          <div className="lg:col-span-6 relative lg:min-h-[400px]">
            <div className="lg:sticky lg:top-40">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-in-out ${
                    activeFeature === index
                      ? "opacity-100 grid-rows-[1fr] lg:relative lg:z-10"
                      : "opacity-0 grid-rows-[0fr] lg:absolute lg:inset-0 lg:pointer-events-none"
                  } grid lg:block`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`backdrop-blur-xl border rounded-4xl md:rounded-[3rem] p-6 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 mb-4 ${
                        index === 0 || index === 2
                          ? "border-accent-cta border-[3px]"
                          : "bg-accent-cta border-transparent text-white"
                      }`}
                    >
                      {/* Decorative Image */}
                      {index !== 2 && (
                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                          <Image
                            src={index === 0 ? "/lev.png" : "/torch.png"}
                            alt=""
                            width={index === 0 ? 400 : 250}
                            height={index === 0 ? 400 : 250}
                            className={`absolute object-contain transition-all duration-1000 ${
                              index === 0
                                ? "bottom-0 right-0 opacity-100 translate-x-8 translate-y-8 scale-110 grayscale hover:grayscale-0"
                                : "-top-10 -right-10 opacity-10 scale-125 rotate-12"
                            }`}
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10">
                        <div
                          className={`text-6xl md:text-8xl font-black mb-6 md:mb-10 opacity-10 leading-none ${
                            index === 0 || index === 2
                              ? "text-accent-cta"
                              : "text-white"
                          }`}
                        >
                          0{index + 1}
                        </div>

                        <h4
                          className={`text-2xl md:text-4xl font-bold mb-6 md:mb-8 leading-tight ${
                            index === 0 || index === 2
                              ? "text-dark-section"
                              : "text-white"
                          }`}
                        >
                          {feature.title}
                        </h4>

                        <p
                          className={`text-base md:text-xl font-light leading-relaxed ${
                            index === 0 || index === 2
                              ? "text-dark-section/70 max-w-[85%]"
                              : "text-white/90"
                          }`}
                        >
                          {feature.description}
                        </p>

                        <div
                          className={`mt-8 md:mt-12 w-20 h-1.5 rounded-full ${
                            index === 0 || index === 2
                              ? "bg-accent-cta"
                              : "bg-white/30"
                          }`}
                        />
                      </div>
                    </div>
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
