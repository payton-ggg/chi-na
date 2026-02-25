import { useFormContext } from "react-hook-form";
import { Image as ImageIcon, Film, Check } from "lucide-react";
import type { TourFormData } from "./constants/types";
import { inputClass } from "./constants/constants";
import SectionCard from "@/app/shared/ui/SectionCard";
import FormField from "@/app/shared/ui/FormField";

export default function MediaSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<TourFormData>();

  const imageSrc = watch("image");
  const videoSrc = watch("video");

  return (
    <SectionCard title="Медиа" icon={<ImageIcon size={18} />}>
      <FormField
        label="Изображение"
        hint="путь в папке /public"
        error={errors.image?.message}
      >
        <div className="flex gap-3 items-center">
          <input
            className={inputClass}
            placeholder="/beijing.png"
            {...register("image", { required: "Укажите путь к изображению" })}
          />
          {imageSrc && (
            <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.opacity = "0")}
              />
            </div>
          )}
        </div>
      </FormField>

      <FormField
        label="YouTube embed"
        hint="необязательно"
        error={errors.video?.message}
      >
        <div className="flex gap-3 items-center">
          <Film size={16} className="text-white/25 shrink-0" />
          <input
            className={inputClass}
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
            {...register("video")}
          />
        </div>
        {videoSrc && (
          <p className="text-xs text-green-400/70 flex items-center gap-1 pt-1">
            <Check size={12} /> Видео добавлено
          </p>
        )}
      </FormField>
    </SectionCard>
  );
}
