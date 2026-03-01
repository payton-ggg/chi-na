// Server Component — static branding + back link, no state needed.
import Link from "next/link";
import { ArrowLeft, Sparkles, Settings, LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/authAction";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 bg-dark-section/85 backdrop-blur-xl border-b border-light-surface/8">
      <div className="container mx-auto px-6 flex items-center h-16 gap-5">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          На сайт
        </Link>

        <div className="w-px h-5 bg-white/10" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-cta flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-black uppercase tracking-widest text-sm text-white hidden md:inline">
            TSUNAMI TRAVEL ADMIN
          </span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/admin/settings"
            className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            <Settings size={16} />
            <span className="hidden md:inline">Настройки</span>
          </Link>

          <div className="w-px h-5 bg-white/10" />

          <form action={logoutAction}>
            <button
              type="submit"
              className="text-white/40 hover:text-red-400 transition-colors text-sm flex items-center gap-2"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Выйти</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
