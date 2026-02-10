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
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        {/* Simple geometric representation of East China coastline could go here via SVG.
            This is a very abstract simplified path for visual context */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-white/5 stroke-white/10 stroke-1"
        >
          <path d="M60,10 Q80,20 75,40 T80,60 T70,80 T60,90 L20,90 L20,10 Z" />
        </svg>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Radar Scan Effect */}
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
