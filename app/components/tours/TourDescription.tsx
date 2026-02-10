import { Tour } from "@/app/data/tours";
import Link from "next/link";
import PrimaryButton from "@/app/components/ui/PrimaryButton";

export default function TourDescription({ tour }: { tour: Tour }) {
  return (
    <section className="py-32 bg-dark-section relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-cta/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-cta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Main Description */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight uppercase">
              О путешествии
            </h2>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              {tour.fullDescription || tour.description}
            </p>
          </div>

          {/* Video Section */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-video group">
            <div className="absolute inset-0 bg-accent-cta/5 group-hover:bg-accent-cta/10 transition-colors pointer-events-none z-10" />

            {tour.video ? (
              <iframe
                src={tour.video}
                title={`${tour.title} video`}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto opacity-50">
                    <div className="w-0 h-0 border-t-10 border-t-transparent border-l-18 border-l-white/50 border-b-10 border-b-transparent ml-1" />
                  </div>
                  <p className="text-white/30 uppercase tracking-widest text-sm font-medium">
                    Видео скоро появится
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Schedule Timeline */}
          {tour.schedule && (
            <div className="relative border-l-2 border-white/10 ml-4 md:ml-10 space-y-16 pl-12 md:pl-16">
              {tour.schedule.map((day, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[59px] md:-left-[75px] top-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-dark-section border-2 border-white/20 flex items-center justify-center text-white/50 font-bold text-sm group-hover:border-accent-cta group-hover:text-accent-cta transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10">
                      {day.day}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl hover:bg-white/[0.07] hover:border-accent-cta/30 transition-all duration-300 group-hover:translate-x-2">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-cta transition-colors">
                      {day.title}
                    </h3>
                    <p className="text-lg text-white/60 font-light leading-relaxed">
                      {day.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="flex justify-center pt-12">
            <Link href="/booking">
              <PrimaryButton className="px-12 py-5 text-lg uppercase tracking-widest font-black hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(194,56,28,0.3)] hover:shadow-[0_20px_60px_rgba(194,56,28,0.5)]">
                Забронировать место
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
