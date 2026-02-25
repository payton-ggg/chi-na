// Server Component — static branding + back link, no state needed.
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0C10]/90 backdrop-blur-xl border-b border-white/8">
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
          <span className="font-black uppercase tracking-widest text-sm text-white">
            TSUNAMI TRAVEL ADMIN
          </span>
        </div>
      </div>
    </header>
  );
}
