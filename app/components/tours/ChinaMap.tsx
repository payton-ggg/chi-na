"use client";

import { Tour } from "@/app/data/tours";
import { useState } from "react";
import Image from "next/image";

export default function ChinaMap({ tour }: { tour: Tour }) {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  const getCoordinatesForLoc = (name: string): { x: number; y: number } => {
    const map: Record<string, { x: number; y: number }> = {
      Шанхай: { x: 67, y: 58 },
      Чжуцзяцзяо: { x: 67, y: 63 },
      Ханчжоу: { x: 84, y: 57 },
      Чжанцзяцзе: { x: 59, y: 65 },
    };

    const key = Object.keys(map).find((k) => name.includes(k));
    if (key) return map[key];
    return { x: 70, y: 50 };
  };

  return (
    <div className="relative w-full pb-48 md:pb-64">
      <div className="relative w-full aspect-4/3 md:aspect-video bg-[#0B0C10] rounded-3xl border border-white/10 overflow-visible group shadow-2xl">
      {/* Map Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/china_map.png"
          alt="Map of Eastern China"
          fill
          className="object-contain opacity-30 mix-blend-screen"
          priority
        />

        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-linear-to-br from-[#0B0C10]/60 via-transparent to-[#0B0C10]/60" />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(circle at center, black 40%, transparent 85%)",
          }}
        />

        {/* Radar Scan Effect */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-accent-cta/5 to-transparent animate-scan pointer-events-none" />
      </div>

      {/* Interactive Markers */}
      <div className="absolute inset-0 z-10">
        {tour.locations.map((loc, index) => {
          const coords = getCoordinatesForLoc(loc.name);
          return (
            <div
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2 group/marker z-20"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
              }}
              onMouseEnter={() => setActiveLocation(index)}
              onMouseLeave={() => setActiveLocation(null)}
            >
              {/* Pulsing glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent-cta/20 rounded-full blur-xl animate-pulse" />

              {/* Ping Animation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent-cta/30 rounded-full animate-ping" />

              {/* Core glowing dot */}
              <div className="relative w-5 h-5 bg-accent-cta rounded-full shadow-[0_0_20px_rgba(194,56,28,1),0_0_40px_rgba(194,56,28,0.6)] border-2 border-white/90 cursor-pointer transition-all duration-300 hover:scale-150 hover:shadow-[0_0_30px_rgba(194,56,28,1),0_0_60px_rgba(194,56,28,0.8)] z-30 animate-pulse" />

              {/* Tooltip Card */}
              <div
                className={`absolute top-full mt-6 left-1/2 -translate-x-1/2 w-72 md:w-96 transition-all duration-500 origin-top z-50 pointer-events-none ${
                  activeLocation === index
                    ? "opacity-100 scale-100 translate-y-0 visible"
                    : "opacity-0 scale-95 -translate-y-2 invisible"
                }`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent-cta/20 blur-2xl rounded-3xl" />
                
                {/* Main card */}
                <div className="relative bg-linear-to-br from-accent-cta/95 via-accent-cta/90 to-accent-cta/80 backdrop-blur-xl border-2 border-white/20 p-6 rounded-3xl shadow-[0_20px_60px_rgba(194,56,28,0.6)]">
                  {/* Arrow */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-14 border-l-transparent border-r-14 border-r-transparent border-b-14 border-b-accent-cta/95" />
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-2xl" />
                  
                  {/* Content */}
                  <div className="relative">
                    <h4 className="text-xl md:text-2xl font-black text-white mb-3 uppercase tracking-wider drop-shadow-lg">
                      {loc.name}
                    </h4>
                    <p className="text-sm md:text-base text-white/95 leading-relaxed font-normal">
                      {loc.description.length > 150
                        ? loc.description.substring(0, 150) + "..."
                        : loc.description}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/40 to-transparent rounded-b-3xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Legend */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none bg-dark-section/60 backdrop-blur-md px-5 py-3 rounded-full border border-accent-cta/20 shadow-lg">
        <h3 className="text-white/80 font-black uppercase tracking-[0.2em] text-[10px]">
          Карта маршрута
        </h3>
      </div>

      {/* Location counter badge */}
      <div className="absolute top-6 right-6 z-20 pointer-events-none bg-accent-cta/10 backdrop-blur-md px-4 py-2 rounded-full border border-accent-cta/30">
        <span className="text-accent-cta font-bold text-sm">
          {tour.locations.length}{" "}
          {tour.locations.length === 1 ? "локация" : "локации"}
        </span>
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
          animation: scan 6s linear infinite;
        }
      `}</style>
      </div>
    </div>
  );
}
