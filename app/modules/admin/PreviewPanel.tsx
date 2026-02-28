"use client";

import { useWatch, useFormContext } from "react-hook-form";
import { Image as ImageIcon } from "lucide-react";
import type { TourFormData } from "./constants/types";

export default function PreviewPanel() {
  const { control } = useFormContext<TourFormData>();

  // Reactively subscribe to all values for live preview
  const data = useWatch({ control }) as TourFormData;
  const highlights = data.highlights?.map((h) => h.value).filter(Boolean) ?? [];

  return (
    <div className="lg:col-span-5">
      <div className="sticky top-24 space-y-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-light-surface/30">
          Предпросмотр карточки
        </p>

        {/* Card preview */}
        <div className="rounded-3xl overflow-hidden border border-light-surface/10 bg-light-surface/5 shadow-2xl">
          <div className="aspect-video relative bg-light-surface/5 overflow-hidden">
            {data.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={data.image}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.opacity = "0")}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-light-surface/10">
                <ImageIcon size={48} />
              </div>
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

        {/* Locations list */}
        {data.locations?.filter((l) => l.name).length > 0 && (
          <div className="rounded-2xl border border-light-surface/8 p-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-light-surface/30">
              Локации на карте
            </p>
            {data.locations
              .filter((l) => l.name)
              .map((loc, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-cta shrink-0" />
                  <span className="text-light-surface/70 text-sm">
                    {loc.name}
                  </span>
                  <span className="text-light-surface/30 text-xs ml-auto">
                    x:{loc.x} y:{loc.y}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
