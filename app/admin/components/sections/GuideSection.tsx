"use client";

import { useFormContext } from "react-hook-form";
import { User } from "lucide-react";
import type { TourFormData } from "../../lib/types";
import { inputClass } from "../../lib/constants";
import SectionCard from "../ui/SectionCard";
import FormField from "../ui/FormField";

export default function GuideSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TourFormData>();

  return (
    <SectionCard title="Гид экспедиции" icon={<User size={18} />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Имя гида" error={errors.guideName?.message}>
          <input
            className={inputClass}
            placeholder="Лев Логачев"
            {...register("guideName")}
          />
        </FormField>

        <FormField label="Роль" error={errors.guideRole?.message}>
          <input
            className={inputClass}
            placeholder="Авторский гид · Шанхай"
            {...register("guideRole")}
          />
        </FormField>
      </div>

      <FormField label="Telegram" error={errors.guideTelegram?.message}>
        <input
          className={inputClass}
          placeholder="https://t.me/username"
          {...register("guideTelegram")}
        />
      </FormField>
    </SectionCard>
  );
}
