"use client";

import { useState } from "react";
import { loginAction } from "@/app/actions/authAction";
import { Lock } from "lucide-react";
import PrimaryButton from "@/app/shared/ui/PrimaryButton";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const res = await loginAction(formData);
      if (res?.success) {
        window.location.href = "/admin";
      } else {
        setError(res?.error || "Произошла ошибка");
      }
    } catch {
      setError("Сетевая ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-light-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cta/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10 space-y-4">
          <div className="w-20 h-20 bg-accent-cta/10 rounded-full flex items-center justify-center mx-auto border border-accent-cta/20 mb-6">
            <Lock className="text-accent-cta h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight">
            Вход в систему
          </h1>
          <p className="text-light-surface/50 text-sm">
            Введите данные администратора
          </p>
        </div>

        <form
          action={onSubmit}
          className="bg-light-surface/5 border border-light-surface/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-light-surface/50">
              Логин
            </label>
            <input
              name="login"
              type="text"
              required
              className="w-full bg-black/40 border border-light-surface/10 rounded-xl px-4 py-3 text-white focus:border-accent-cta focus:outline-none transition-colors"
              placeholder="admin"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-light-surface/50">
              Пароль
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-black/40 border border-light-surface/10 rounded-xl px-4 py-3 text-white focus:border-accent-cta focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm tracking-widest uppercase font-black"
            >
              {loading ? "Вход..." : "Войти"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
