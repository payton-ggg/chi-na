"use client";

import {
  Calendar,
  Users,
  MessageSquare,
  Send,
  Mail,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import { useState } from "react";
import { sendBookingToTelegram } from "../../actions/bookingAction";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    date: "",
    people: "1",
    email: "",
    telegram: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await sendBookingToTelegram(formData);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Произошла ошибка при отправке");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Сетевая ошибка");
    }
  };

  if (status === "success") {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto p-12 rounded-[3.5rem] bg-white/5 border border-accent-cta/30 backdrop-blur-xl space-y-8 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-accent-cta rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-accent-cta/50">
              <Sparkles className="text-white" size={48} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Заявка принята!
            </h2>
            <p className="text-xl text-white/50 font-light leading-relaxed">
              Спасибо за ваш интерес! Лев или наш менеджер свяжется с вами в
              Telegram или по Email в течение ближайшего времени.
            </p>
            <div className="pt-6">
              <button
                onClick={() => setStatus("idle")}
                className="text-accent-cta font-bold uppercase tracking-widest text-xs hover:underline"
              >
                Отправить еще одну заявку
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-stretch">
          {/* Form Side */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Date Selection */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-cta">
                    <Calendar size={14} /> Желаемая дата начала
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-white/5 border-b border-white/10 py-4 px-2 text-xl focus:border-accent-cta outline-none transition-all text-white appearance-none"
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>

                {/* People Count */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-cta">
                    <Users size={14} /> Количество человек
                  </label>
                  <select
                    className="w-full bg-white/5 border-b border-white/10 py-4 px-2 text-xl focus:border-accent-cta outline-none transition-all text-white appearance-none"
                    onChange={(e) =>
                      setFormData({ ...formData, people: e.target.value })
                    }
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-dark-section">
                        {num} {num === 1 ? "человек" : "человека"}
                      </option>
                    ))}
                    <option value="7+" className="bg-dark-section">
                      5+ человек
                    </option>
                  </select>
                </div>

                {/* Email */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-cta">
                    <Mail size={14} /> Электронная почта
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-xl focus:border-accent-cta outline-none transition-all text-white placeholder:text-white/10"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {/* Telegram */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-cta">
                    <Send size={14} /> Telegram для связи
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@username"
                    className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-xl focus:border-accent-cta outline-none transition-all text-white placeholder:text-white/10"
                    onChange={(e) =>
                      setFormData({ ...formData, telegram: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Message / Question */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-cta">
                  <MessageSquare size={14} /> Ваш вопрос или комментарий
                </label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о своих пожеланиях..."
                  className="w-full bg-white/5 rounded-2xl border border-white/10 p-6 text-xl focus:border-accent-cta outline-none transition-all text-white placeholder:text-white/10 resize-none"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-12">
                <p className="text-sm text-white/30 max-w-sm leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с условиями обработки
                  персональных данных и политикой конфиденциальности.
                </p>

                {/* User's requested Button style */}
                <div className="relative group">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`relative w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-light-surface/10 flex items-center justify-center backdrop-blur-sm animate-float-slow group transition-all duration-700 z-20 shadow-2xl ${
                      status === "loading"
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:scale-110 hover:border-accent-cta/30"
                    }`}
                  >
                    <div className="absolute inset-3 rounded-full border border-light-surface/10 group-hover:border-accent-cta/30 transition-all duration-700" />
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-accent-cta/0 via-accent-cta/0 to-transparent group-hover:from-accent-cta/20 group-hover:via-accent-cta/30 group-hover:to-transparent transition-all duration-700" />
                    <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(194,56,28,0.0)] group-hover:shadow-[0_0_100px_rgba(194,56,28,0.3)] transition-all duration-700" />

                    <span className="text-sm md:text-base uppercase tracking-widest text-light-surface/70 group-hover:text-light-surface text-center relative z-10 font-black transition-all duration-500 leading-tight">
                      {status === "loading" ? (
                        "Отправляем..."
                      ) : (
                        <>
                          Отправить <br /> заявку
                        </>
                      )}
                    </span>
                  </button>

                  {status === "error" && (
                    <p className="absolute top-full mt-4 left-1/2 -translate-x-1/2 text-red-500 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar / Info Side */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles size={100} className="text-accent-cta" />
              </div>

              <h3 className="text-3xl font-bold text-white relative z-10">
                Почему стоит <br /> ехать с нами?
              </h3>

              <ul className="space-y-6 relative z-10">
                {[
                  "Авторские маршруты Льва Логачева",
                  "Мини-группы до 5 человек",
                  "Премиальные отели 5*",
                  "Полное сопровождение 24/7",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-cta" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-white/10">
                <p className="text-accent-cta font-bold text-sm mb-2">
                  Остались вопросы?
                </p>
                <a
                  href="https://t.me/Lihach57"
                  target="_blank"
                  className="text-white hover:text-accent-cta transition-colors font-medium"
                >
                  Связаться в Telegram
                </a>
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-accent-cta/10 border border-accent-cta/20">
              <p className="text-white font-bold mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-accent-cta" />
                Важное уточнение
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                После отправки заявки наш менеджер свяжется с вами в течение 24
                часов для подтверждения наличия мест и обсуждения деталей
                оплаты.
              </p>
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
