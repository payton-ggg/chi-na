"use client";

import {
  FileText,
  Plane,
  Compass,
  MessageSquare,
  ClipboardCheck,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquare size={24} />,
      title: "Заявка",
      desc: "Вы оставляете заявку или пишете нам в мессенджеры.",
    },
    {
      icon: <Compass size={24} />,
      title: "Подбор тура",
      desc: "Мы предлагаем маршрут под ваши даты и пожелания.",
    },
    {
      icon: <ClipboardCheck size={24} />,
      title: "Документы",
      desc: "Помогаем с визой, страховкой и всеми формальностями.",
    },
    {
      icon: <Plane size={24} />,
      title: "Путешествие",
      desc: "Вы наслаждаетесь Китаем, а мы контролируем логистику.",
    },
    {
      icon: <FileText size={24} />,
      title: "Поддержка",
      desc: "24/7 на связи по любым вопросам во время поездки.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Как проходит{" "}
            <span className="text-primary-scarlet-600">путешествие</span>
          </h2>
          <p className="text-gray-600">
            Все просто, прозрачно и четко организовано
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-100 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-primary-scarlet-500 group-hover:bg-primary-scarlet-50 group-hover:shadow-lg">
                  <div className="text-gray-400 group-hover:text-primary-scarlet-600 transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 max-w-[150px] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
