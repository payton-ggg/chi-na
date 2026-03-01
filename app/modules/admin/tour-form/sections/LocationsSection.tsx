"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, MapPin } from "lucide-react";
import type { TourFormData } from "../constants/types";
import { inputClass, textareaClass } from "../constants/constants";
import SectionCard from "@/app/shared/ui/SectionCard";
import FormField from "@/app/shared/ui/FormField";

export default function LocationsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TourFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  return (
    <SectionCard title="Локации на карте" icon={<MapPin size={18} />}>
      <p className="text-white/30 text-xs -mt-1 mb-1">
        Координаты X/Y в процентах (0–100). Шанхай ≈ x:67 y:58
      </p>

      <div className="space-y-6">
        {fields.map((field, i) => (
          <div
            key={field.id}
            className="p-5 rounded-2xl bg-white/5 border border-white/8 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-accent-cta/70">
                Локация {i + 1}
              </span>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/30 flex items-center justify-center transition-all"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Название"
                error={errors.locations?.[i]?.name?.message}
              >
                <input
                  className={inputClass}
                  placeholder="Пекин"
                  {...register(`locations.${i}.name`)}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-2">
                <FormField label="X (%)">
                  <input
                    type="number"
                    className={inputClass}
                    min={0}
                    max={100}
                    step={0.5}
                    {...register(`locations.${i}.x`, { valueAsNumber: true })}
                  />
                </FormField>
                <FormField label="Y (%)">
                  <input
                    type="number"
                    className={inputClass}
                    min={0}
                    max={100}
                    step={0.5}
                    {...register(`locations.${i}.y`, { valueAsNumber: true })}
                  />
                </FormField>
              </div>
            </div>

            <FormField label="Описание (тултип на карте)">
              <textarea
                className={textareaClass}
                placeholder="Краткое описание, которое появится в тултипе на карте..."
                rows={2}
                {...register(`locations.${i}.description`)}
              />
            </FormField>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ name: "", description: "", x: 70, y: 50 })}
        className="mt-3 flex items-center gap-2 text-sm text-white/40 hover:text-accent-cta transition-colors"
      >
        <Plus size={15} /> Добавить локацию
      </button>
    </SectionCard>
  );
}
