import { Sunrise, Sun, Moon } from "lucide-react";

export interface ScheduleDayData {
  day: number;
  title: string;
  morning: string;
  dayPart: string;
  evening: string;
}

export default function DaySchedule({ data }: { data: ScheduleDayData }) {
  return (
    <article className="group relative pl-8 md:pl-0 border-l border-white/10 md:border-none pb-24 last:pb-0">
      <div className="md:grid md:grid-cols-12 md:gap-10">
        {/* Sticky Day Number & Line */}
        <div className="hidden md:flex flex-col items-center col-span-2 lg:col-span-3 relative">
          <div className="sticky top-40 flex flex-col items-center">
            <span className="text-sm font-black text-accent-cta uppercase tracking-widest mb-4 transform -rotate-90 origin-center absolute -left-12 top-8 w-24">
              День 0{data.day}
            </span>
            <div className="w-16 h-16 rounded-2xl bg-accent-cta flex items-center justify-center text-3xl font-black text-white shadow-[0_0_30px_rgba(194,56,28,0.4)] z-10">
              {data.day}
            </div>
            <div className="w-px h-[calc(100%+6rem)] bg-linear-to-b from-accent-cta via-white/10 to-transparent absolute top-16 z-0" />
          </div>
        </div>

        {/* Mobile Day Number */}
        <div className="absolute -left-5 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent-cta text-white font-black text-lg md:hidden shadow-[0_0_20px_rgba(194,56,28,0.4)] z-10">
          {data.day}
        </div>

        {/* Content */}
        <div className="col-span-10 lg:col-span-9 space-y-8">
          <header className="mb-8 relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {data.title}
            </h2>
            <div className="absolute -bottom-4 left-0 w-20 h-1 bg-accent-cta rounded-full opacity-50" />
            <div className="absolute -inset-4 bg-white/5 blur-2xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </header>

          <div className="space-y-6">
            <TimeSection
              icon={<Sunrise size={20} />}
              title="Утро"
              text={data.morning}
            />
            <TimeSection
              icon={<Sun size={20} />}
              title="День"
              text={data.dayPart}
            />
            <TimeSection
              icon={<Moon size={20} />}
              title="Вечер"
              text={data.evening}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function TimeSection({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="relative pl-8 md:pl-10 group/section">
      <div className="absolute left-0 top-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent-cta transition-colors group-hover/section:bg-accent-cta group-hover/section:text-white">
        {icon}
      </div>
      <div className="absolute left-3 md:left-4 top-8 -bottom-6 w-px bg-white/5 group-last/section:hidden" />

      <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-3">
        {title}
      </h3>
      <p className="text-lg text-white/60 font-light leading-relaxed whitespace-pre-line group-hover/section:text-white/80 transition-colors">
        {text}
      </p>
    </div>
  );
}
