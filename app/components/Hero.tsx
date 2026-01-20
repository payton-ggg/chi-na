"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="China Landscape"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center md:text-left pt-20">
        <div className="max-w-4xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
            Авторские туры по Китаю.{" "}
            <span className="block text-primary-scarlet-200">
              Открой страну по-настоящему
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md">
            Индивидуальное сопровождение, продуманная до мелочей программа и
            глубокая локальная экспертиза. Мы покажем Китай, который невозможно
            найти в путеводителях.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary-scarlet-600 hover:bg-primary-scarlet-700 text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary-scarlet-900/30 flex items-center justify-center gap-2">
              Посмотреть туры
              <ArrowRight size={20} />
            </button>

            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/80 hover:bg-white/10 text-white rounded-full font-semibold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2">
              <MessageCircle size={20} />
              Получить консультацию
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
