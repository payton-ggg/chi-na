"use client";

import { useWatch, useFormContext } from "react-hook-form";
import { useState } from "react";
import {
  Image as ImageIcon,
  Map,
  Sparkles,
  Send,
  ArrowUpRight,
} from "lucide-react";
import type { TourFormData } from "../constants/types";
import type { LocationInfo, Guide } from "@/app/data/tours";
import ChinaMap from "@/app/modules/tour-detail/ChinaMap";

export default function PreviewPanel({
  guides = [],
}: {
  guides?: (Guide & { id: number })[];
}) {
  const { control } = useFormContext<TourFormData>();
  const [imageError, setImageError] = useState(false);

  const data = useWatch({ control }) as TourFormData;
  const highlights = data.highlights?.map((h) => h.value).filter(Boolean) ?? [];

  const mapLocations: LocationInfo[] = (data.locations ?? [])
    .filter((l) => l.name?.trim())
    .map((l) => ({
      name: l.name,
      description: l.description ?? "",
      coordinates: { x: l.x ?? 70, y: l.y ?? 50 },
    }));

  return (
    <div>
      <div className="sticky top-24 space-y-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-light-surface/30">
          Предпросмотр
        </p>

        <div className="group relative flex flex-col  overflow-hidden rounded-3xl border border-white/10 bg-white/3 hover:border-accent-cta/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(194,56,28,0.15)]">
          <div className="absolute top-6 left-6 z-20 text-white/20 font-black text-5xl leading-none select-none pointer-events-none">
            01
          </div>
          <div className="relative w-full h-64 md:h-auto min-h-64 shrink-0 overflow-hidden bg-white/5">
            {(!data.image || imageError) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/10 z-10">
                <ImageIcon size={40} />
                {imageError && (
                  <span className="text-xs text-red-400/40">
                    Не удалось загрузить
                  </span>
                )}
              </div>
            )}
            {data.image && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={data.image}
                src={data.image}
                alt={data.title || ""}
                className="absolute left-0 top-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onLoad={() => setImageError(false)}
                onError={() => setImageError(true)}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-dark-section/80 hidden md:block" />
            <div className="absolute inset-0 bg-linear-to-t from-dark-section/80 to-transparent md:hidden" />
          </div>
          <div className="flex flex-col justify-between p-8 md:p-10 flex-1">
            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-accent-cta transition-colors duration-300">
                {data.title || (
                  <span className="text-white/20 font-normal italic">
                    Название...
                  </span>
                )}
              </h2>

              <p className="text-white/60 text-base leading-relaxed">
                {data.description || (
                  <span className="italic text-white/20">
                    Короткое описание...
                  </span>
                )}
              </p>

              <div className="flex flex-wrap gap-2">
                {highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10 text-white/60 bg-white/5"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent-cta/20 border border-accent-cta/30 flex items-center justify-center shrink-0">
                  <Sparkles size={14} className="text-accent-cta" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">
                    {data.guideIds && data.guideIds.length > 0
                      ? guides.find((g) => g.id === data.guideIds![0])?.name
                      : "Выбрано 0 гидов"}
                  </p>
                  <p className="text-white/40 text-xs">
                    {data.guideIds && data.guideIds.length > 0
                      ? guides.find((g) => g.id === data.guideIds![0])?.role
                      : "Выберите гидов"}
                  </p>
                </div>
                {data.guideIds &&
                  data.guideIds.length > 0 &&
                  guides.find((g) => g.id === data.guideIds![0])?.telegram && (
                    <div className="ml-1 p-1.5 rounded-full bg-white/5 hover:bg-accent-cta/20 border border-white/10 hover:border-accent-cta/40 text-white/40 hover:text-accent-cta transition-all">
                      <Send size={12} />
                    </div>
                  )}
              </div>

              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-cta/10 hover:bg-accent-cta border border-accent-cta/30 hover:border-accent-cta text-accent-cta hover:text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 group/btn whitespace-nowrap">
                Подробнее
                <ArrowUpRight
                  size={16}
                  className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Map size={14} className="text-light-surface/30" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-light-surface/30">
              Карта маршрута
            </p>
          </div>

          {mapLocations.length > 0 ? (
            <ChinaMap locations={mapLocations} compact />
          ) : (
            <div className="rounded-2xl border border-dashed border-light-surface/10 p-8 flex items-center justify-center text-light-surface/20 text-sm">
              Добавьте локацию с названием — карта появится здесь
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
