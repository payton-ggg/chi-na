import Navbar from "../components/layout/Navbar";

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-dark-section text-light-surface flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(194,56,28,0.1)_0%,transparent_70%)]">
      <Navbar />
      <div className="max-w-2xl text-center space-y-8 mt-20 transition-all duration-1000 animate-in fade-in slide-in-from-bottom-10">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
          Расписание <br />
          <span className="text-accent-cta font-serif italic lowercase font-normal leading-normal">
            по дням
          </span>
        </h1>
        <p className="text-xl text-light-surface/60 font-light leading-relaxed">
          Детальный план нашего приключения. Каждый день наполнен уникальными
          событиями и локациями, которые мы скоро здесь опубликуем.
        </p>
        <div className="pt-12">
          <a
            href="/"
            className="px-10 py-5 border border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-full bg-white/5 hover:bg-white/10 transition-all"
          >
            Вернуться на главную
          </a>
        </div>
      </div>
    </main>
  );
}
