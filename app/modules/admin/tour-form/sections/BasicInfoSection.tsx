"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FileText } from "lucide-react";
import type { TourFormData } from "../constants/types";
import { inputClass, textareaClass } from "../constants/constants";
import SectionCard from "@/app/shared/ui/SectionCard";
import FormField from "@/app/shared/ui/FormField";

/** Cyrillic → Latin transliteration map */
const TRANSLIT: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

/** Converts any string (including Cyrillic) into a URL-safe slug */
function toSlug(raw: string): string {
  return raw
    .toLowerCase()
    .split("")
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join("")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function BasicInfoSection() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TourFormData>();

  const titleValue = watch("title") ?? "";
  const slugValue = watch("slug") ?? "";

  /**
   * Reactively mirror title → slug.
   * Only overwrites the slug if it's still "in sync" with the title
   * (i.e. the user hasn't manually customised it yet).
   */
  useEffect(() => {
    const generated = toSlug(titleValue);

    // Consider the slug "auto" as long as it equals what we'd generate
    // from the CURRENT title, OR from any prefix of the title
    // (covers the case where the user is still typing).
    const isAutoSlug =
      slugValue === "" ||
      slugValue === generated ||
      generated.startsWith(slugValue);

    if (isAutoSlug) {
      setValue("slug", generated, {
        shouldDirty: false,
        shouldValidate: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue]);

  return (
    <SectionCard title="Основная информация" icon={<FileText size={18} />}>
      <FormField
        label="Название"
        hint="отображается в заголовке"
        error={errors.title?.message}
      >
        <input
          className={inputClass}
          placeholder="Пекин"
          {...register("title", { required: "Обязательное поле" })}
        />
      </FormField>

      <FormField
        label="Slug (URL)"
        hint="авто·генерируется из названия, можно изменить вручную"
        error={errors.slug?.message}
      >
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-surface/20 text-sm select-none pointer-events-none">
            /tours/
          </span>
          <input
            className={inputClass + " pl-16"}
            placeholder="beijing"
            {...register("slug")}
          />
        </div>
        {slugValue && (
          <p className="text-[11px] text-light-surface/30 pt-1">
            Страница:{" "}
            <span className="text-accent-cta/60">/tours/{slugValue}</span>
          </p>
        )}
      </FormField>

      <FormField
        label="Короткое описание"
        hint="1–2 предложения для карточки"
        error={errors.description?.message}
      >
        <textarea
          className={textareaClass}
          placeholder="Запретный город, Великая стена и утиная грудка по-пекински. Культурная столица за один день."
          rows={2}
          {...register("description", { required: "Обязательное поле" })}
        />
      </FormField>

      <FormField
        label="Полное описание"
        hint="раскрывается на странице тура"
        error={errors.fullDescription?.message}
      >
        <textarea
          className={textareaClass}
          placeholder="Развёрнутое описание — что увидит участник, история места, что сделает этот концепт особенным..."
          rows={4}
          {...register("fullDescription")}
        />
      </FormField>
    </SectionCard>
  );
}
