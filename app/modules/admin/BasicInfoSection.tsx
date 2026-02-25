"use client";

import { useFormContext } from "react-hook-form";
import { FileText } from "lucide-react";
import type { TourFormData } from "./constants/types";
import { inputClass, textareaClass } from "./constants/constants";
import SectionCard from "@/app/shared/ui/SectionCard";
import FormField from "@/app/shared/ui/FormField";

export default function BasicInfoSection() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TourFormData>();

  const titleValue = watch("title");
  const slugValue = watch("slug");

  const autoSlug = (raw: string) =>
    raw
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValue("title", next, { shouldValidate: true });
    // Only mirror slug while it still matches the last auto-generated value
    if (!slugValue || slugValue === autoSlug(titleValue)) {
      setValue("slug", autoSlug(next));
    }
  };

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
          value={titleValue}
          onChange={handleTitleChange}
        />
      </FormField>

      <FormField
        label="Slug (URL)"
        hint="авто·генерируется, можно изменить"
        error={errors.slug?.message}
      >
        <input
          className={inputClass}
          placeholder="beijing"
          {...register("slug")}
        />
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
