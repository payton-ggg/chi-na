"use client";

import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="py-32 bg-dark-section text-light-surface relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          {/* Left Side: Form */}
          <div className="w-full lg:w-1/2 max-w-xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-light-surface tracking-tight">
              Напишите нам
            </h2>

            <div className="relative mb-12">
              <input
                type="email"
                placeholder="Ваш email адрес"
                className="w-full bg-transparent border-b border-light-surface/10 py-4 text-xl md:text-2xl text-light-surface placeholder:text-gray-600 focus:outline-none focus:border-accent-cta transition-all duration-300"
              />
            </div>

            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4 cursor-pointer group">
                <div className="w-5 h-5 rounded-full border border-gray-600 shrink-0 group-hover:border-accent-cta transition-colors" />
                <p className="text-sm text-gray-500 max-w-xs leading-relaxed group-hover:text-gray-400 transition-colors">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <span className="underline decoration-gray-600 underline-offset-4">
                    политикой конфиденциальности
                  </span>
                </p>
              </div>

              <button className="w-14 h-14 rounded-full border border-light-surface/20 flex items-center justify-center hover:bg-light-surface hover:text-dark-section transition-all duration-300 group shrink-0">
                <ArrowUpRight
                  size={24}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              </button>
            </div>
          </div>

          {/* Right Side: Button from Hero */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <button className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-2 border-light-surface/10 flex items-center justify-center backdrop-blur-sm animate-float-slow cursor-pointer group transition-all duration-700 z-20 hover:scale-105 hover:border-accent-cta/30 shadow-2xl">
              <div className="absolute inset-3 rounded-full border border-light-surface/10 group-hover:border-accent-cta/30 transition-all duration-700" />

              <div className="absolute inset-0 rounded-full bg-linear-to-br from-accent-cta/0 via-accent-cta/0 to-transparent group-hover:from-accent-cta/20 group-hover:via-accent-cta/30 group-hover:to-transparent transition-all duration-700" />

              <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(194,56,28,0.0)] group-hover:shadow-[0_0_100px_rgba(194,56,28,0.3)] transition-all duration-700" />

              <span className="text-sm sm:text-base uppercase tracking-widest text-light-surface/50 group-hover:text-light-surface text-center relative z-10 font-bold transition-all duration-500 leading-relaxed">
                Оставить
                <br />
                Заявку
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
