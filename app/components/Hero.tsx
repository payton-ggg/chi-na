"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="China Landscape"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/30 bg-linear-to-b from-black/60 via-transparent to-black/60 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center pt-10">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-2 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary-scarlet-500 animate-pulse" />
            <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
              Премиальные путешествия
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
            Авторские туры по{" "}
            <span className="relative inline-block px-5 py-2 mx-2">
              <span className="absolute inset-0 border-[3px] border-primary-scarlet-500 rounded-[100%] transform -rotate-2 scale-110" />
              <span className="relative z-10">Китаю</span>
            </span>
            <span className="block mt-4 text-2xl md:text-4xl lg:text-5xl font-light text-white/90">
              Открой страну по-настоящему
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            Индивидуальное сопровождение, продуманная до мелочей программа и
            глубокая локальная экспертиза. Мы покажем Китай, который невозможно
            найти в путеводителях.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full">
            <button className="group relative w-full sm:w-auto px-10 py-5 bg-primary-scarlet-600 hover:bg-primary-scarlet-700 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-scarlet-600/40 flex items-center justify-center gap-3 overflow-hidden">
              <span className="relative z-10">Посмотреть туры</span>
              <ArrowRight
                size={20}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />
              <div className="absolute inset-0 bg-linear-to-r from-primary-scarlet-500 to-primary-scarlet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="group w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10">
              <MessageCircle
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Получить консультацию</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
