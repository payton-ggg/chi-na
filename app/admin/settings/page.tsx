"use client";

import { useState } from "react";
import { changeCredentialsAction } from "@/app/actions/authAction";
import { Save, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import AdminHeader from "@/app/modules/admin/AdminHeader";

export default function AdminSettingsPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Simple validation
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    if (password !== passwordConfirm) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }

    try {
      const res = await changeCredentialsAction(formData);
      if (res?.success) {
        setSuccess(true);
        // Usually, credentials change means relogin:
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 2000);
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
    <div className="min-h-screen bg-dark-section text-light-surface">
      <AdminHeader />

      <main className="container mx-auto px-6 py-12 lg:py-24 max-w-2xl relative z-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-light-surface/40 hover:text-light-surface transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Назад в админку
        </Link>

        <div className="space-y-4 mb-12">
          <div className="w-16 h-16 bg-accent-cta/10 rounded-2xl flex items-center justify-center border border-accent-cta/20 mb-6">
            <KeyRound className="text-accent-cta h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Настройки доступа
          </h1>
          <p className="text-light-surface/50 text-lg">
            Измените логин и пароль для входа в панель
          </p>
        </div>

        <form
          action={onSubmit}
          className="bg-light-surface/5 border border-light-surface/8 rounded-4xl p-8 md:p-12 space-y-8"
        >
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-accent-cta/80">
              Новый логин
            </label>
            <input
              name="login"
              type="text"
              required
              className="w-full bg-black/30 border border-light-surface/10 rounded-xl px-4 py-4 text-white focus:border-accent-cta focus:outline-none transition-colors"
              placeholder="Например: admin"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-accent-cta/80">
              Новый пароль
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={5}
              className="w-full bg-black/30 border border-light-surface/10 rounded-xl px-4 py-4 text-white focus:border-accent-cta focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-accent-cta/80">
              Повторите пароль
            </label>
            <input
              name="passwordConfirm"
              type="password"
              required
              minLength={5}
              className="w-full bg-black/30 border border-light-surface/10 rounded-xl px-4 py-4 text-white focus:border-accent-cta focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl text-center">
              Данные успешно изменены! Перенаправление на страницу входа...
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading || success}
              className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black hover:bg-white/90 disabled:opacity-50 transition-colors uppercase font-black tracking-widest text-sm shadow-xl rounded-full"
            >
              <Save size={18} />
              {loading ? "Сохранение..." : "Сохранить новые данные"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
