"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";

import type { TourFormData } from "./constants/types";
import { defaultValues } from "./constants/types";
import { saveTourAction, updateTourAction } from "@/app/actions/toursAction";

import BasicInfoSection from "./sections/BasicInfoSection";
import MediaSection from "./sections/MediaSection";
import HighlightsSection from "./sections/HighlightsSection";
import LocationsSection from "./sections/LocationsSection";
import GuideSection from "./sections/GuideSection";
import PreviewPanel from "./sections/PreviewPanel";

type SaveState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; slug: string }
  | { status: "error"; message: string };

export default function TourForm({
  initialData,
  tourId,
}: {
  initialData?: any;
  tourId?: number;
}) {
  const [preview, setPreview] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>({ status: "idle" });

  const methods = useForm<TourFormData>({
    defaultValues: initialData
      ? {
          slug: initialData.slug || "",
          title: initialData.title || "",
          description: initialData.description || "",
          fullDescription: initialData.fullDescription || "",
          image: initialData.image || "",
          video: initialData.video || "",
          highlights: (Math.random(), initialData.highlights || []).map(
            (h: string) => ({ id: Math.random().toString(), value: h })
          ),
          locations: (initialData.locations || []).map((l: any) => ({
            name: l.name || "",
            description: l.description || "",
            x: l.coordinates?.x || 50,
            y: l.coordinates?.y || 50,
          })),
          guideName: initialData.guide?.name || "",
          guideRole: initialData.guide?.role || "",
          guideTelegram: initialData.guide?.telegram || "",
        }
      : defaultValues,
    mode: "onChange",
  });

  const {
    watch,
    reset,
    formState: { isValid: rhfValid },
  } = methods;
  const values = watch();

  const canSave = !!(
    values.title?.trim() &&
    values.description?.trim() &&
    values.image?.trim()
  );

  const handleSave = async () => {
    if (!canSave) return;
    setSaveState({ status: "loading" });

    const inputData = {
      slug:
        values.slug ||
        values.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      title: values.title,
      description: values.description,
      fullDescription: values.fullDescription || undefined,
      image: values.image,
      video: values.video || undefined,
      highlights: values.highlights.map((h) => h.value).filter(Boolean),
      locations: values.locations
        .filter((l) => l.name.trim())
        .map((l) => ({
          name: l.name,
          description: l.description,
          coordinates: { x: l.x, y: l.y },
        })),
      guide: {
        name: values.guideName,
        role: values.guideRole,
        telegram: values.guideTelegram,
      },
    };

    let result;
    if (tourId) {
      result = await updateTourAction(tourId, inputData);
    } else {
      result = await saveTourAction(inputData);
    }

    if (result.success) {
      setSaveState({ status: "success", slug: result.slug! });
      if (!tourId) {
        reset(defaultValues); // clear form for next tour only if adding new
      }
    } else {
      setSaveState({ status: "error", message: result.error! });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} noValidate className="pb-24">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
          <div>
            <p className="text-accent-cta text-xs font-black uppercase tracking-[0.4em] mb-2">
              Панель управления
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-light-surface">
              {tourId ? "Редактировать тур" : "Новый концепт"}
            </h1>
            <p className="text-light-surface/40 mt-2 text-sm">
              {tourId
                ? "Измените данные и сохраните, чтобы обновить концепт на сайте"
                : "Заполните форму и сохраните — концепт мгновенно появится на сайте"}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                preview
                  ? "bg-light-surface/10 border-light-surface/20 text-light-surface"
                  : "border-light-surface/10 text-light-surface/50 hover:text-light-surface hover:border-light-surface/20"
              }`}
            >
              {preview ? <EyeOff size={15} /> : <Eye size={15} />}
              {preview ? "Скрыть" : "Превью"}
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave || saveState.status === "loading"}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                !canSave || saveState.status === "loading"
                  ? "bg-light-surface/5 border border-light-surface/5 text-light-surface/20 cursor-not-allowed"
                  : saveState.status === "success"
                  ? "bg-green-500/20 border border-green-500/40 text-green-400"
                  : saveState.status === "error"
                  ? "bg-red-500/20 border border-red-500/40 text-red-400"
                  : "bg-accent-cta hover:bg-accent-cta/80 text-light-surface shadow-[0_0_20px_rgba(194,56,28,0.35)]"
              }`}
            >
              {saveState.status === "loading" ? (
                <Loader size={15} className="animate-spin" />
              ) : saveState.status === "success" ? (
                <CheckCircle size={15} />
              ) : saveState.status === "error" ? (
                <AlertCircle size={15} />
              ) : (
                <Save size={15} />
              )}
              {saveState.status === "loading"
                ? "Сохранение..."
                : saveState.status === "success"
                ? "Сохранено!"
                : saveState.status === "error"
                ? "Ошибка"
                : tourId
                ? "Сохранить изменения"
                : "Сохранить в БД"}
            </button>
          </div>
        </div>

        {saveState.status === "success" && (
          <div className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-start gap-3">
            <CheckCircle size={18} className="text-green-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-green-400 font-semibold text-sm">
                Концепт успешно {tourId ? "обновлен" : "добавлен"}!
              </p>
              <p className="text-green-400/60 text-xs mt-1">
                Доступен по адресу{" "}
                <a
                  href={`/tours/${saveState.slug}`}
                  className="underline hover:text-green-300"
                  target="_blank"
                >
                  /tours/{saveState.slug}
                </a>{" "}
                {tourId
                  ? "· Данные успешно обновлены"
                  : "· Форма очищена для нового концепта"}
              </p>
            </div>
          </div>
        )}

        {saveState.status === "error" && (
          <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
            <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-red-400 font-semibold text-sm">
                Не удалось сохранить
              </p>
              <p className="text-red-400/60 text-xs mt-1">
                {saveState.message}
              </p>
            </div>
          </div>
        )}

        <div
          className={`grid gap-10 ${
            preview
              ? "grid-cols-1 lg:grid-cols-12"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
        >
          <div className={`space-y-6 ${preview ? "lg:col-span-7" : ""}`}>
            <BasicInfoSection />
            <MediaSection />
            <HighlightsSection />
            <LocationsSection />
            <GuideSection />
          </div>

          {preview && <PreviewPanel />}
        </div>
      </form>
    </FormProvider>
  );
}
