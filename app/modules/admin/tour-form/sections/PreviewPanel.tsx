"use client";

import { useWatch, useFormContext } from "react-hook-form";
import { useState } from "react";
import { Image as ImageIcon, Map } from "lucide-react";
import type { TourFormData } from "../constants/types";
import type { LocationInfo } from "@/app/data/tours";
import ChinaMap from "@/app/modules/tour-detail/ChinaMap";

export default function PreviewPanel() {
  const { control } = useFormContext<TourFormData>();
  const [imageError, setImageError] = useState(false);

  // Reactively subscribe to all values for instant live preview
  const data = useWatch({ control }) as TourFormData;
  const highlights = data.highlights?.map((h) => h.value).filter(Boolean) ?? [];

  // Convert form locations → LocationInfo[] (what ChinaMap expects)
  const mapLocations: LocationInfo[] = (data.locations ?? [])
    .filter((l) => l.name?.trim())
    .map((l) => ({
      name: l.name,
      description: l.description ?? "",
      coordinates: { x: l.x ?? 70, y: l.y ?? 50 },
    }));

  return (
    <div className="lg:col-span-5">
      <div className="sticky top-24 space-y-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-light-surface/30">
          Предпросмотр
        </p>

        {/* ── Tour Card ───────────────────────────────────────── */}
        <div className="rounded-3xl overflow-hidden border border-light-surface/10 bg-light-surface/5 shadow-2xl">
          {/* Image */}
          <div className="aspect-video relative bg-light-surface/5 overflow-hidden">
            {/* Placeholder — shown when no image or image fails to load */}
            {(!data.image || imageError) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-light-surface/10">
                <ImageIcon size={40} />
                {imageError && (
                  <span className="text-xs text-red-400/40">
                    Не удалось загрузить
                  </span>
                )}
              </div>
            )}

            {/* Image — key forces remount when src changes, clearing the error state */}
            {data.image && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={data.image}
                src={data.image}
                alt=""
                className="w-full h-full object-cover"
                onLoad={() => setImageError(false)}
                onError={() => setImageError(true)}
              />
            )}

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <h2 className="text-3xl font-black text-light-surface tracking-tight">
                {data.title || (
                  <span className="text-light-surface/20 font-normal italic">
                    Название...
                  </span>
                )}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <p className="text-light-surface/60 text-sm leading-relaxed">
              {data.description || (
                <span className="italic text-light-surface/20">
                  Короткое описание...
                </span>
              )}
            </p>

            {highlights.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-accent-cta/10 border border-accent-cta/20 text-accent-cta font-medium"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-light-surface/8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-cta/20 flex items-center justify-center text-accent-cta text-xs font-black">
                {data.guideName?.charAt(0) || "Г"}
              </div>
              <div>
                <p className="text-light-surface text-sm font-semibold">
                  {data.guideName || "Имя гида"}
                </p>
                <p className="text-light-surface/30 text-xs">
                  {data.guideRole || "Роль"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Interactive Map Preview ─────────────────────────── */}
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
