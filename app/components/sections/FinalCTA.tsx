"use client";

import {
  ArrowUpRight,
  Smartphone,
  ShieldCheck,
  MessageSquare,
  Globe,
  Banknote,
  Backpack,
  Youtube,
  Instagram,
  Send,
  MessageCircle,
} from "lucide-react";

export default function FinalCTA() {
  const preparationItems = [
    {
      icon: <Smartphone size={20} />,
      title: "Alipay",
      text: "Главный способ оплаты. Скачайте и подключите карту заранее.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "VPN",
      text: "Нужен для Google, Instagram, WhatsApp. Скачайте до поездки.",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "WeChat",
      text: "Ключевое приложение: общение, платежи, карты.",
    },
    {
      icon: <Globe size={20} />,
      title: "Интернет",
      text: "Лучше взять eSIM или местную SIM-карту по прилёту.",
    },
    {
      icon: <Banknote size={20} />,
      title: "Наличные юани",
      text: "Пригодятся в мелких кафе и уличных лавках.",
    },
    {
      icon: <Backpack size={20} />,
      title: "Экипировка",
      text: "Удобная обувь и лёгкая куртка обязательны для гор.",
    },
  ];

  const socialLinks = [
    {
      name: "YouTube",
      href: "https://www.youtube.com/@tsunami_surfer",
      icon: <Youtube size={18} />,
    },
    {
      name: "Instagram (личный)",
      href: "https://www.instagram.com/_tsunami_surfer",
      icon: <Instagram size={18} />,
    },
    {
      name: "Telegram-канал",
      href: "https://t.me/tsunamisurfer4ever",
      icon: <Send size={18} />,
    },
    {
      name: "Instagram турагентства",
      href: "https://www.instagram.com/tsunami_travel",
      icon: <Instagram size={18} />,
    },
    {
      name: "Личный Telegram для связи",
      href: "https://t.me/Lihach57",
      icon: <MessageCircle size={18} />,
    },
  ];

  return (
    <section
      id="contact"
      className="py-32 bg-dark-section text-light-surface relative overflow-hidden"
    >
      {/* Background Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-cta/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-cta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-24">
          {/* Top: Important Info */}
          <div>
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                Важная информация <br />
                <span className="text-accent-cta">перед поездкой</span>
              </h2>
              <p className="text-xl text-light-surface/60 font-light leading-relaxed">
                Чтобы ваше путешествие в Китай прошло максимально комфортно,
                подготовьтесь заранее. Всё это сделает поездку проще, а вы
                сможете сосредоточиться только на впечатлениях.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {preparationItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-4xl bg-white/5 border border-white/10 hover:border-accent-cta/30 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-cta/10 flex items-center justify-center text-accent-cta mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-light-surface/50 leading-relaxed font-light">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Contacts and Main CTA */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-20 pt-24 border-t border-white/10">
            {/* Form Side */}
            <div className="w-full lg:w-1/2 max-w-xl">
              <h3 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
                Напишите нам
              </h3>

              <div className="space-y-12">
                <div className="relative">
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

                  <button className="w-16 h-16 rounded-full border border-light-surface/20 flex items-center justify-center hover:bg-light-surface hover:text-dark-section transition-all duration-300 group shrink-0">
                    <ArrowUpRight
                      size={28}
                      className="group-hover:rotate-45 transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-20">
                <p className="text-xs font-bold text-accent-cta uppercase tracking-widest mb-8">
                  Наши соцсети и контакты
                </p>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-cta/50 transition-all text-sm font-medium"
                    >
                      {link.icon}
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Big Action Button Side */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <button className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-light-surface/10 flex items-center justify-center backdrop-blur-sm animate-float-slow cursor-pointer group transition-all duration-700 z-20 hover:scale-105 hover:border-accent-cta/30 shadow-2xl">
                <div className="absolute inset-4 rounded-full border border-light-surface/10 group-hover:border-accent-cta/30 transition-all duration-700" />
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-accent-cta/0 via-accent-cta/0 to-transparent group-hover:from-accent-cta/20 group-hover:via-accent-cta/30 group-hover:to-transparent transition-all duration-700" />

                <span className="text-base md:text-lg uppercase tracking-[0.2em] text-light-surface/50 group-hover:text-light-surface text-center relative z-10 font-black transition-all duration-500 leading-relaxed">
                  Оставить
                  <br />
                  Заявку
                </span>
              </button>
            </div>
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
            transform: translateY(-15px);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
