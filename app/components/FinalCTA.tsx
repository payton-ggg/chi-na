"use client";

import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-primary-scarlet-600 text-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Готовы открыть Китай?
        </h2>
        <p className="text-xl text-primary-scarlet-100 mb-10 max-w-2xl mx-auto font-light">
          Оставьте заявку, и мы составим для вас идеальный маршрут путешествия.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-10 py-5 bg-white text-primary-scarlet-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl transform hover:scale-105 duration-300">
            Оставить заявку
          </button>
          <button className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            Связаться в WhatsApp <ArrowRight size={20} />
          </button>
        </div>

        <p className="mt-8 text-sm text-primary-scarlet-200 opacity-80">
          Мы ответим в течение 15 минут
        </p>
      </div>
    </section>
  );
}
