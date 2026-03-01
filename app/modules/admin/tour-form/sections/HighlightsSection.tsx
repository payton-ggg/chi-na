"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Tag } from "lucide-react";
import type { TourFormData } from "../constants/types";
import { inputClass } from "../constants/constants";
import SectionCard from "@/app/shared/ui/SectionCard";

export default function HighlightsSection() {
  const { register, control } = useFormContext<TourFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
  });

  return (
    <SectionCard title="Особенности (Highlights)" icon={<Tag size={18} />}>
      <p className="text-white/30 text-xs -mt-1 mb-1">
        До 3 ключевых меток — показываются на карточке тура
      </p>

      <div className="space-y-3">
        {fields.map((field, i) => (
          <div key={field.id} className="flex gap-3 items-center">
            <span className="text-accent-cta font-black text-sm w-5 shrink-0">
              {i + 1}.
            </span>
            <input
              className={inputClass}
              placeholder="Великая стена"
              {...register(`highlights.${i}.value`)}
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/30 flex items-center justify-center transition-all shrink-0"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>

      {fields.length < 5 && (
        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="mt-3 flex items-center gap-2 text-sm text-white/40 hover:text-accent-cta transition-colors"
        >
          <Plus size={15} /> Добавить
        </button>
      )}
    </SectionCard>
  );
}
