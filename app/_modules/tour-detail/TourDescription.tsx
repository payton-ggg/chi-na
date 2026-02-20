import { Tour } from "@/app/data/tours";
import Link from "next/link";
import PrimaryButton from "@/app/_shared/ui/PrimaryButton";
import ChinaMap from "./ChinaMap";

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
              Детали концепта
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

          {/* Map Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white mb-8">
              Ключевые точки
            </h3>
            <ChinaMap tour={tour} />
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-12">
            <Link href="/booking">
              <PrimaryButton className="px-12 py-5 text-lg uppercase tracking-widest font-black hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(194,56,28,0.3)] hover:shadow-[0_20px_60px_rgba(194,56,28,0.5)]">
                Обсудить участие
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
