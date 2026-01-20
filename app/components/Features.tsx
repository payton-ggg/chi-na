"use client";

import { Map, Shield, UserCheck, Heart } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Map className="w-8 h-8 text-primary-scarlet-600" />,
      title: "Глубокая экспертиза",
      description:
        "Мы знаем Китай изнутри. Локальные маршруты, скрытые жемчужины и места без толп туристов.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary-scarlet-600" />,
      title: "Проверенные гиды",
      description:
        "Только профессионалы, которые живут в Китае, говорят на языке и знают менталитет.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-scarlet-600" />,
      title: "Безопасность 24/7",
      description:
        "Мы на связи круглосуточно. Решаем любые вопросы от визы до внезапной смены погоды.",
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-scarlet-600" />,
      title: "С душой и комфортом",
      description:
        "Авторские программы, лучшие отели и транспорт. Ваше путешествие будет безупречным.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают{" "}
            <span className="text-primary-scarlet-600">TSUNAMI TRAVEL</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы не просто продаем туры — мы создаем впечатления, которые остаются
            в памяти навсегда.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-primary-scarlet-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary-scarlet-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-scarlet-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
