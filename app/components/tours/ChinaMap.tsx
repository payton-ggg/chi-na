"use client";

import { Tour } from "@/app/data/tours";
import { useState } from "react";

export default function ChinaMap({ tour }: { tour: Tour }) {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  // SVG Map of Eastern China (Simplified coordinates for key cities)
  // Shanghai: ~85, 55
  // Zhangjiajie: ~58, 60
  // Suzhou: ~82, 53
  // Hangzhou: ~80, 58
  // Beijing (Reference): ~75, 25
  // Xian (Reference): ~60, 45

  return (
    <div className="relative w-full aspect-4/3 md:aspect-video bg-[#0B0C10] rounded-3xl border border-white/10 overflow-hidden group shadow-2xl">
      {/* Map Background - Tech/Dark Style */}
      <div className="absolute inset-0 opacity-80 mix-blend-screen pointer-events-none p-4 md:p-12">
        {/* Realistic Simplified China Map SVG */}
        <svg
          viewBox="0 0 1024 850"
          className="w-full h-full fill-dark-section stroke-white/20 stroke-[1.5] drop-shadow-[0_0_15px_rgba(194,56,28,0.3)]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* China Mainland + Islands Path (Simplified) */}
          <path
            d="M862.5,420.5l-3.2-5.7l9.5-4.4l2.5,3.2l-1.9,6.3L862.5,420.5z M896.6,400.3l5.1,1.3l0.6,3.8l-5.1,3.2l-5.7-0.6
	l-3.2-5.7L896.6,400.3z M885.2,525.4l5.1-5.1l7,4.4l-1.3,7l-6.3,1.3l-2.5-3.8L885.2,525.4z M214.6,368.6l10.1,1.9l8.2,12l6.3-1.9
	l11.4,12l12.6,3.8l5.1,11.4l15.2-1.9l5.1,5.1l6.3-4.4l-3.2-12l7.6-1.3l15.8-14.5l14.5-3.2l5.1,3.2l-0.6,13.9l3.8,4.4l12.6-3.8
	l7.6,3.8l4.4,12.6l10.7-3.2l12.6,5.1l8.8-5.1l5.1,12l-1.3,9.5l7,13.3l17.7,6.3l3.8,11.4l5.7,2.5l9.5-2.5l6.3,9.5l14.5,1.9l5.7-7
	l2.5-12l15.8-2.5l7,4.4l7.6-5.7l13.9,0.6l3.8-5.7l9.5-0.6l9.5,8.8l-3.2,7l10.1,6.3l-3.2,10.1l7.6,3.2l3.8,14.5l10.1,2.5l5.1,16.4
	l-1.3,10.7l10.7,3.2l4.4,8.8l-0.6,8.2l-6.3,10.1l-1.3,13.3l7,7.6l2.5,8.2l10.7,6.3l3.2,9.5l9.5-1.9l4.4,3.2l-3.8,10.7l-9.5,8.8
	l-8.2-1.3l-4.4,3.8l-3.2,8.2l-8.8,1.3l-5.7,7l2.5,10.7l-2.5,7l2.5,10.7l-3.8,10.1l6.3,6.3l-1.9,12l-10.7,5.7l-5.1-3.2l-8.8,3.2
	l-15.8,15.2l-2.5-1.3l-9.5,12l-2.5,14.5l-2.5,2.5l-6.3-1.9l-13.9,7l-3.2,28.4l2.5,1.9l-3.8,15.8l-12-0.6l-5.7-6.3l-6.3,11.4
	l-10.7,11.4l-20.2-12.6l-13.3,1.3l-13.3-8.8l-1.9-8.8l-10.7-3.8l-9.5,6.3l-13.9-3.2l-6.3,2.5l-3.8-3.2l-6.3,1.9l-10.1-5.7
	l-3.2-10.7l-5.7-0.6l-9.5,8.8l-7.6,1.3l-10.7-5.1l-5.7,3.2l-7.6-1.9l-5.7-9.5l-8.2-1.9l-12-8.2l-9.5,1.9l-10.7-7l-15.8-3.2
	l-10.7,0.6l-8.8-8.8l-16.4,3.2l-12,8.8l-2.5-3.8l-10.1,12.6l-13.9,0.6l-3.8-5.1l-10.7,3.8l-2.5-3.2l-10.1-2.5l-3.8-8.8l-8.2-4.4
	l-8.8,1.3l-5.7-10.7l-0.6-22.1l-8.8-13.3l5.1-26.5l-4.4-15.8l6.3-12l3.2-15.8l-6.3-3.8l-30.3-6.3l-9.5-8.2l-8.2-1.9l-4.4-8.8
	l-11.4-8.8l-3.8-8.8l-10.7-9.5l-12-5.7l-10.1-0.6l-8.2,3.8l-5.1,12.6l-7,2.5l-3.8,7.6l-8.2-1.3l-10.7,3.8l-10.1-3.2l-1.9,7.6
	l-7,3.2l-6.3-6.3l-12,5.1l-5.1-3.8l-6.3-0.6l-8.8-12.6l4.4-15.2l-10.1-8.2l-1.9-7.6l7.6-14.5l-3.2-12.6L77,419.8l2.5-12.6
	l10.1-8.2l12.6-2.5l3.8-7l9.5-3.8l4.4-10.1l-1.3-13.3l9.5-11.4l11.4-0.6l23.4-12.6l5.7,1.9l0.6-5.1l9.5-7l5.1,1.3l3.8-7.6
	l17.7-10.1l5.7-8.2l0.6-12l-5.1-15.2l15.8-1.3l8.2,5.7l4.4-3.2l6.3,3.8l4.4-6.3l12.6-3.8l10.7-7l6.3,1.9l5.1-7.6l8.2-1.3l9.5-12
	l2.5-15.2l8.8-12.6l20.2-1.9l8.8-7.6l10.1,3.8l6.3,10.7l8.8,1.3l9.5-2.5l8.8,7.6l8.2-3.2l6.3,10.1l11.4-3.2l2.5-9.5l-4.4-8.2
	l7.6-6.3l8.2,6.3L524.2,229l2.5-5.1l-8.2-7l2.5-12l-6.3-5.7l3.8-6.3l8.8-6.3l5.7,1.3l5.1-5.1L546.9,193l-1.9-8.2l5.7-16.4
	l10.7-9.5l9.5,4.4l3.8-1.3l1.3-7.6l9.5-2.5l1.9-7.6l8.8-4.4l12,1.3l8.2,5.7l11.4-3.8l10.7,8.2l12.6-1.3l6.3-6.3l-3.2-5.7
	l10.1-5.7l6.3,3.2l5.7,14.5l8.8-1.3l3.2,5.7l13.3,1.3l20.2-11.4l17.1,5.1l14.5,0.6l10.7,5.7l1.9,7.6l-5.1,7l8.2,12l-5.1,7.6
	l3.2,8.8l-5.1,11.4l9.5,9.5l9.5,1.9l1.3,7l-6.3,10.1l4.4,7.6l2.5,7l26.5-15.8l7.6,18.9l-3.2,8.8l-8.8,3.2l-3.2,10.7l10.1,5.7
	l-3.8,6.3l2.5,5.7l-9.5,5.7l-11.4-0.6l-13.9,13.9l-9.5,5.7l-5.7-2.5l-19.6,12l-9.5-1.9l-22.1,8.2l-4.4,14.5L711.2,354l-5.7,4.4
	l-4.4,12l-8.2,6.3l-2.5,13.3l8.2,8.2l0.6,13.9l6.3,1.3l5.1,2.5l6.3,12l10.7,2.5l3.8,11.4l4.4,0.6l3.2-3.8l8.2,5.1l6.3-3.2
	l7.6,5.1l15.2-7l1.3,4.4l-7.6,7.6l7,9.5l13.3-1.3l9.5,3.8l9.5-1.9l5.1-5.7l13.3,6.3l5.7-8.2l3.8,7.6l8.2,3.2l3.2-4.4l5.1,5.7
	l13.9-6.3l1.3-9.5l-5.1-5.7l-5.7,2.5l-3.2-7l-8.2-1.3l-1.3-8.8l5.1-1.3l11.4,1.3l15.2,16.4l20.8-12.6l3.8,4.4l-11.4,30.3
	L862.5,420.5z"
          />
          {/* Taiwan Path */}
          <path
            d="M895,650 Q900,640 910,645 T915,660 T900,670 T895,650 Z"
            className="fill-dark-section stroke-white/20 stroke-[1.5]"
          />
          {/* Hainan Path */}
          <path
            d="M720,780 Q730,770 745,775 T750,790 T730,800 T720,780 Z"
            className="fill-dark-section stroke-white/20 stroke-[1.5]"
          />
        </svg>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />

        {/* Radar Scan Effect - Adjusted opacity */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-accent-cta/5 to-transparent animate-scan" />
      </div>

      {/* Markers Layer */}
      <div className="absolute inset-0 z-10">
        {tour.locations.map((loc, index) => (
          <div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2 group/marker z-20"
            style={{
              left: `${loc.coordinates.x}%`,
              top: `${loc.coordinates.y}%`,
            }}
            onMouseEnter={() => setActiveLocation(index)}
            onMouseLeave={() => setActiveLocation(null)}
          >
            {/* Ping Animation - Wider area for better effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent-cta opacity-20 rounded-full animate-ping pointer-events-none" />

            {/* Core Dot with Glow */}
            <div className="relative w-4 h-4 bg-accent-cta rounded-full shadow-[0_0_15px_rgba(194,56,28,0.8)] border-2 border-white/80 cursor-pointer transition-all duration-300 hover:scale-125 hover:border-white z-30" />

            {/* Tooltip Card - Using visibility instead of conditional rendering for smoother transition */}
            <div
              className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 md:w-80 bg-dark-section/95 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl transition-all duration-300 origin-top z-50 pointer-events-none ${
                activeLocation === index
                  ? "opacity-100 scale-100 translate-y-0 visible"
                  : "opacity-0 scale-95 -translate-y-2 invisible"
              }`}
            >
              {/* Arrow */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-dark-section border-t border-l border-white/10 rotate-45" />

              <h4 className="relative text-lg font-bold text-accent-cta mb-2 uppercase tracking-wide">
                {loc.name}
              </h4>
              <p className="relative text-sm text-white/80 leading-relaxed font-light">
                {loc.description.length > 120
                  ? loc.description.substring(0, 120) + "..."
                  : loc.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Map Legend */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none bg-dark-section/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
        <h3 className="text-white/60 font-black uppercase tracking-[0.2em] text-[10px]">
          Карта маршрута
        </h3>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
