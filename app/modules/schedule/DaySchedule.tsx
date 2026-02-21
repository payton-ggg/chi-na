import { Sunrise, Sun, Moon, Sparkles } from "lucide-react";
import Image from "next/image";

export interface ScheduleDayData {
  day: number;
  title: string;
  morning: string;
  dayPart: string;
  evening: string;
  image?: string;
  highlights?: string[];
}

export default function DaySchedule({ data }: { data: ScheduleDayData }) {
  return (
    <article
      id={`day-${data.day}`}
      className="group relative pl-8 md:pl-0 border-l border-white/10 md:border-none pb-32 last:pb-0"
    >
      <div className="md:grid md:grid-cols-12 md:gap-10">
        {/* Sticky Day Number & Line */}
        <div className="hidden md:flex flex-col items-center col-span-2 lg:col-span-3 relative">
          <div className="sticky top-40 flex flex-col items-center">
            <span className="text-sm font-black text-accent-cta uppercase tracking-widest mb-4 transform -rotate-90 origin-center absolute -left-12 top-8 w-24"></span>
            <div className="w-16 h-16 rounded-2xl bg-accent-cta flex items-center justify-center text-xl leading-none text-center font-black text-white shadow-[0_0_30px_rgba(194,56,28,0.4)] z-10 relative">
              {data.day} день
              {/* Pulse effect */}
              <div className="absolute inset-0 bg-accent-cta rounded-2xl animate-ping opacity-20" />
            </div>
            <div className="w-px h-[calc(100%+8rem)] bg-linear-to-b from-accent-cta via-white/10 to-transparent absolute top-16 z-0" />
          </div>
        </div>

        {/* Mobile Day Number */}
        <div className="absolute -left-5 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent-cta text-white font-black text-lg md:hidden shadow-[0_0_20px_rgba(194,56,28,0.4)] z-10">
          {data.day}
        </div>

        {/* Content */}
        <div className="col-span-10 lg:col-span-9 space-y-10 relative">
          {/* Decorative Giant Number Background */}
          <div className="absolute -top-20 -right-10 text-[15rem] font-black text-white/2 select-none pointer-events-none leading-none z-0">
            {data.day}
          </div>

          <header className="mb-8 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              {data.title}
            </h2>

            {/* Highlights Pills */}
            {data.highlights && (
              <div className="flex flex-wrap gap-3 mb-6">
                {data.highlights.map((tag, i) => (
                  <div
                    key={i}
                    className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/70 uppercase tracking-wide flex items-center gap-2 hover:border-accent-cta/50 hover:text-white transition-colors cursor-default"
                  >
                    <Sparkles size={10} className="text-accent-cta" />
                    {tag}
                  </div>
                ))}
              </div>
            )}

            <div className="h-px w-20 bg-accent-cta rounded-full opacity-50" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Timeline Sections */}
            <div className="lg:col-span-2 space-y-8 relative z-10">
              <TimeSection
                icon={<Sunrise size={20} />}
                title="Утро"
                text={data.morning}
              />
              
              {data.day !== 7 && (
                <>
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
                </>
              )}
            </div>

            {/* Optional Side Image */}
            {data.image && (
              <div className="lg:col-span-1 hidden lg:block relative pt-4">
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-out group/image shadow-2xl skew-y-2 hover:skew-y-0">
                  <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-dark-section via-transparent to-transparent opacity-60" />
                </div>
              </div>
            )}
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
      <div className="absolute left-0 top-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent-cta transition-colors duration-300 group-hover/section:bg-accent-cta group-hover/section:text-white group-hover/section:scale-110 group-hover/section:shadow-[0_0_15px_rgba(194,56,28,0.5)]">
        {icon}
      </div>
      <div className="absolute left-3 md:left-4 top-8 -bottom-8 w-px bg-white/5 group-last/section:hidden" />

      <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-3">
        {title}
      </h3>
      <p className="text-lg text-white/60 font-light leading-relaxed whitespace-pre-line group-hover/section:text-white/90 transition-colors duration-300">
        {text}
      </p>
    </div>
  );
}
