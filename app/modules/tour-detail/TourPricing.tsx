"use client";

import { useState } from "react";
import { Guide } from "@/app/data/tours";

export default function TourPricing({ defaultGuide }: { defaultGuide: Guide }) {
  const guides = [
    {
      id: "default",
      name: defaultGuide.name,
      price: 2500,
    },
    {
      id: "local",
      name: "Местный гид",
      price: 1800,
    },
  ];

  const [selectedGuideId, setSelectedGuideId] = useState(guides[0].id);
  const selectedGuide =
    guides.find((g) => g.id === selectedGuideId) || guides[0];

  return (
    <div className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-6 pt-6 border-t border-white/5">
      <div className="flex flex-col">
        <span className="text-lg uppercase text-white/40 mb-1">
          Ориентировочная стоимость
        </span>
        <span className="text-xl tracking-tight text-white/80 font-light">
          ${selectedGuide.price.toLocaleString()}{" "}
          <span className="text-md text-white/40">/ чел.</span>
        </span>
      </div>

      <div className="hidden md:block w-px h-8 bg-white/10" />

      <div className="flex flex-col w-full md:w-auto">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
          Сопровождение
        </span>
        <div className="flex flex-wrap gap-2">
          {guides.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGuideId(g.id)}
              className={`px-3 cursor-pointer py-1.5 text-xl rounded-full border transition-all duration-300 flex items-center gap-2 ${
                selectedGuideId === g.id
                  ? "border-accent-cta/50 text-accent-cta bg-accent-cta/5"
                  : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70 bg-transparent"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
