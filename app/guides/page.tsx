import Navbar from "../_shared/layout/Navbar";

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-dark-section text-light-surface flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(194,56,28,0.1)_0%,transparent_70%)]">
      <Navbar />
      <div className="max-w-2xl text-center space-y-8 mt-20 transition-all duration-1000 animate-in fade-in slide-in-from-bottom-10">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
          Наши <br />
          <span className="text-accent-cta">Гайды</span>
        </h1>
        <p className="text-xl text-light-surface/60 font-light leading-relaxed">
          Полезные советы, инструкции и путеводители, которые помогут вам
          подготовиться к путешествию и узнать Китай ещё глубже.
        </p>
        <div className="pt-12">
          <a
            href="/"
            className="px-10 py-5 bg-white text-dark-section font-black uppercase tracking-widest text-sm rounded-full hover:bg-accent-cta hover:text-white transition-all shadow-2xl"
          >
            Вернуться на главную
          </a>
        </div>
      </div>
    </main>
  );
}
