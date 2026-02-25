"use client";

import { useWatch, useFormContext } from "react-hook-form";
import { Image as ImageIcon, Copy, Check } from "lucide-react";
import type { TourFormData } from "../../lib/types";
import { generateTsCode } from "../../lib/codeGenerator";
import { NEXT_TOUR_ID } from "../../lib/constants";

interface PreviewPanelProps {
  copied: boolean;
  onCopy: () => void;
}

export default function PreviewPanel({ copied, onCopy }: PreviewPanelProps) {
  const { control } = useFormContext<TourFormData>();

  // Reactively watch all form values for live preview
  const data = useWatch({ control }) as TourFormData;

  const highlights = data.highlights?.map((h) => h.value).filter(Boolean) ?? [];

  return (
    <div className="lg:col-span-5">
      <div className="sticky top-24 space-y-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30">
          Предпросмотр
        </p>

        {/* Tour Card Preview */}
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
          {/* Image */}
          <div className="aspect-video relative bg-white/5 overflow-hidden">
            {data.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.image}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.opacity = "0")}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/10">
                <ImageIcon size={48} />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <h2 className="text-3xl font-black text-white tracking-tight">
                {data.title || (
                  <span className="text-white/20 font-normal italic">
                    Название...
                  </span>
                )}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <p className="text-white/60 text-sm leading-relaxed">
              {data.description || (
                <span className="italic text-white/20">
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

            <div className="pt-4 border-t border-white/8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-cta/20 flex items-center justify-center text-accent-cta text-xs font-black">
                {data.guideName?.charAt(0) || "Г"}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  {data.guideName || "Имя гида"}
                </p>
                <p className="text-white/30 text-xs">
                  {data.guideRole || "Роль гида"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Code */}
        <div className="rounded-3xl border border-white/8 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border-b border-white/8">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-white/30 text-xs font-mono flex-1">
              tours.ts
            </span>
            <button
              type="button"
              onClick={onCopy}
              className="text-xs text-white/30 hover:text-accent-cta flex items-center gap-1 transition-colors"
            >
              {copied ? (
                <Check size={11} className="text-green-400" />
              ) : (
                <Copy size={11} />
              )}
              {copied ? "Скопировано" : "Копировать"}
            </button>
          </div>
          <pre className="p-5 text-xs text-green-400/70 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap bg-[#0a0c0f] max-h-72 overflow-y-auto">
            {generateTsCode(data, NEXT_TOUR_ID)}
          </pre>
        </div>
      </div>
    </div>
  );
}
