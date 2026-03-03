"use client";

import { LocationInfo } from "@/app/data/tours";
import { useState } from "react";
import Image from "next/image";

interface ChinaMapProps {
  locations: LocationInfo[];
  compact?: boolean;
}

export default function ChinaMap({
  locations,
  compact = false,
}: ChinaMapProps) {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  return (
    <div className={`relative w-full ${compact ? "pb-0" : "pb-48 md:pb-64"}`}>
      <div className="relative w-full aspect-video bg-[#0B0C10] rounded-3xl border border-white/10 overflow-visible group shadow-2xl">
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <Image
            src="/china_map.png"
            alt="Map of Eastern China"
            fill
            className="object-contain opacity-30 mix-blend-screen"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-br from-[#0B0C10]/60 via-transparent to-[#0B0C10]/60" />

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

          <div className="absolute inset-0 bg-linear-to-r from-transparent via-accent-cta/5 to-transparent animate-scan pointer-events-none" />
        </div>

        <div
          className="absolute inset-0 z-10"
          onClick={() => setActiveLocation(null)}
        >
          {locations.map((loc, index) => {
            const { x, y } = loc.coordinates;

            // Edge-aware tooltip alignment: prevent overflow on left/right sides
            const tooltipStyle: React.CSSProperties =
              x < 28
                ? { left: 0, transform: "translateX(0)" }      // near left edge → push right
                : x > 72
                ? { right: 0, left: "auto", transform: "translateX(0)" } // near right edge → push left
                : { left: "50%", transform: "translateX(-50%)" };         // center otherwise

            return (
              <div
                key={index}
                className="absolute -translate-x-1/2 -translate-y-1/2 group/marker z-20"
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => setActiveLocation(index)}
                onMouseLeave={() => setActiveLocation(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLocation((prev) => (prev === index ? null : index));
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent-cta/20 rounded-full blur-xl animate-pulse" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent-cta/30 rounded-full animate-ping" />

                <div className="relative w-5 h-5 bg-accent-cta rounded-full shadow-[0_0_20px_rgba(194,56,28,1),0_0_40px_rgba(194,56,28,0.6)] border-2 border-white/90 cursor-pointer transition-all duration-300 hover:scale-150 hover:shadow-[0_0_30px_rgba(194,56,28,1),0_0_60px_rgba(194,56,28,0.8)] z-30 animate-pulse" />

                {/* Tooltip – edge-safe position, same appearance on all screens */}
                <div
                  className={`absolute top-full mt-4 w-max ${
                    compact ? "max-w-[220px]" : "max-w-[260px] sm:max-w-xs"
                  } transition-all duration-500 origin-top z-50 pointer-events-none ${
                    activeLocation === index
                      ? "opacity-100 scale-100 translate-y-0 visible"
                      : "opacity-0 scale-95 -translate-y-2 invisible"
                  }`}
                  style={tooltipStyle}
                >
                  <div className="absolute inset-0 bg-accent-cta/20 blur-2xl rounded-3xl" />

                  <div className="relative bg-linear-to-br from-accent-cta/95 via-accent-cta/90 to-accent-cta/80 backdrop-blur-xl border-2 border-white/20 p-4 rounded-3xl shadow-[0_20px_60px_rgba(194,56,28,0.6)]">
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-2xl" />

                    <div className="relative">
                      <h4
                        className={`font-black text-white mb-2 uppercase tracking-wider drop-shadow-lg ${
                          compact ? "text-sm" : "text-base sm:text-lg"
                        }`}
                      >
                        {loc.name}
                      </h4>
                      {loc.description && (
                        <p
                          className={`text-white/90 leading-relaxed font-normal ${
                            compact ? "text-xs" : "text-xs sm:text-sm"
                          }`}
                        >
                          {loc.description.length > (compact ? 80 : 130)
                            ? loc.description.substring(0, compact ? 80 : 130) +
                              "..."
                            : loc.description}
                        </p>
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/40 to-transparent rounded-b-3xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute top-4 left-4 z-20 pointer-events-none bg-dark-section/60 backdrop-blur-md px-4 py-2 rounded-full border border-accent-cta/20 shadow-lg">
          <h3 className="text-white/80 font-black uppercase tracking-[0.2em] text-[10px]">
            Карта маршрута
          </h3>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none bg-accent-cta/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-accent-cta/30">
          <span className="text-accent-cta font-bold text-xs">
            {locations.length} {locations.length === 1 ? "локация" : "локации"}
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
