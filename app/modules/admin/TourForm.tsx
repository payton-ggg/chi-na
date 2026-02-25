"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Eye, EyeOff, Copy, Check } from "lucide-react";

import type { TourFormData } from "./constants/types";
import { defaultValues } from "./constants/types";
import { generateTsCode } from "./constants/codeGenerator";
import { NEXT_TOUR_ID } from "./constants/constants";

import BasicInfoSection from "./BasicInfoSection";
import MediaSection from "./MediaSection";
import HighlightsSection from "./HighlightsSection";
import LocationsSection from "./LocationsSection";
import GuideSection from "./GuideSection";
import PreviewPanel from "./PreviewPanel";

export default function TourForm() {
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const methods = useForm<TourFormData>({
    defaultValues,
    mode: "onChange",
  });

  const { watch } = methods;
  const values = watch();

  const isValid = !!(
    values.title?.trim() &&
    values.description?.trim() &&
    values.image?.trim()
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTsCode(values, NEXT_TOUR_ID));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} noValidate className="pb-24">
        {/* Page header + action bar */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
          <div>
            <p className="text-accent-cta text-xs font-black uppercase tracking-[0.4em] mb-2">
              Панель управления
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              Новый концепт
            </h1>
            <p className="text-white/40 mt-2 text-sm">
              Заполните форму — скопируйте код и вставьте в{" "}
              <code className="text-accent-cta/80 bg-white/5 px-1.5 py-0.5 rounded text-xs">
                app/data/tours.ts
              </code>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                preview
                  ? "bg-white/10 border-white/20 text-white"
                  : "border-white/10 text-white/50 hover:text-white hover:border-white/20"
              }`}
            >
              {preview ? <EyeOff size={15} /> : <Eye size={15} />}
              {preview ? "Скрыть" : "Превью"}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              disabled={!isValid}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                isValid
                  ? copied
                    ? "bg-green-500/20 border border-green-500/40 text-green-400"
                    : "bg-accent-cta hover:bg-accent-cta/80 text-white shadow-[0_0_20px_rgba(194,56,28,0.35)]"
                  : "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Скопировано!" : "Копировать код"}
            </button>
          </div>
        </div>

        {/* Main layout */}
        <div
          className={`grid gap-10 ${
            preview
              ? "grid-cols-1 lg:grid-cols-12"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
        >
          {/* Sections column */}
          <div className={`space-y-6 ${preview ? "lg:col-span-7" : ""}`}>
            <BasicInfoSection />
            <MediaSection />
            <HighlightsSection />
            <LocationsSection />
            <GuideSection />
          </div>

          {/* Preview column */}
          {preview && <PreviewPanel copied={copied} onCopy={handleCopy} />}
        </div>
      </form>
    </FormProvider>
  );
}
