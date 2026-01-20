"use client";

import { Star } from "lucide-react";

export default function Trust() {
  return (
    <section id="reviews" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Stats & Header */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Нам доверяют <br />
              <span className="text-primary-scarlet-600">свои впечатления</span>
            </h2>
            <p className="text-gray-600 mb-10 text-lg">
              Мы гордимся тем, что 98% наших клиентов возвращаются к нам за
              новыми приключениями или рекомендуют TSUNAMI TRAVEL друзьям.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-4xl font-bold text-primary-scarlet-600 mb-2">
                  7+
                </p>
                <p className="text-gray-700 font-medium">Лет работы с Китаем</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-4xl font-bold text-primary-scarlet-600 mb-2">
                  1000+
                </p>
                <p className="text-gray-700 font-medium">Счастливых туристов</p>
              </div>
            </div>
          </div>

          {/* Right: Review Card */}
          <div className="relative">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-primary-scarlet-100 rounded-full opacity-50 blur-xl" />
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-gray-200 rounded-full opacity-50 blur-xl" />

            <div className="relative bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={20} />
                ))}
              </div>
              <p className="text-gray-800 text-lg md:text-xl italic mb-8 leading-relaxed">
                "Это была лучшая поездка в моей жизни! Организация на высшем
                уровне. Гиды знают каждый камень, отели — просто космос.
                Особенно впечатлил ужин в небоскребе Шанхая и прогулка на лодке
                в Гуйлине. Спасибо, TSUNAMI!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  {/* Placeholder avatar */}
                  <div className="w-full h-full bg-linear-to-br from-gray-400 to-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Александр Волков</p>
                  <p className="text-sm text-gray-500">
                    Тур "Величие Империи", Август 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
