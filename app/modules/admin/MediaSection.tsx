"use client";

import { useFormContext } from "react-hook-form";
import {
  Image as ImageIcon,
  Film,
  Check,
  Link as LinkIcon,
  FolderOpen,
} from "lucide-react";
import { useState } from "react";
import type { TourFormData } from "./constants/types";
import { inputClass } from "./constants/constants";
import SectionCard from "@/app/shared/ui/SectionCard";
import FormField from "@/app/shared/ui/FormField";

/** Converts any YouTube URL variant to an embed URL.
 *  Handles: watch?v=, youtu.be/, shorts/, and already-embed URLs. */
function toYoutubeEmbed(raw: string): string {
  if (!raw) return raw;

  // Already an embed link — return as is
  if (raw.includes("youtube.com/embed/")) return raw;

  // Regex to extract video ID from all known YouTube URL patterns
  const match = raw.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  if (match) {
    // Preserve si= parameter if present
    const siMatch = raw.match(/[?&]si=([^&]+)/);
    const si = siMatch ? `?si=${siMatch[1]}` : "";
    return `https://www.youtube.com/embed/${match[1]}${si}`;
  }

  return raw;
}

function isExternalUrl(val: string) {
  return val.startsWith("http://") || val.startsWith("https://");
}

export default function MediaSection() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TourFormData>();

  const imageSrc = watch("image");
  const videoSrc = watch("video");

  // When user leaves the video field — auto-convert to embed URL
  const handleVideoBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const converted = toYoutubeEmbed(e.target.value.trim());
    if (converted !== e.target.value) {
      setValue("video", converted);
    }
  };

  const imageIsExternal = isExternalUrl(imageSrc ?? "");

  return (
    <SectionCard title="Медиа" icon={<ImageIcon size={18} />}>
      {/* Image */}
      <FormField
        label="Изображение"
        hint="локальный путь или внешняя ссылка"
        error={errors.image?.message}
      >
        <div className="flex gap-3 items-start">
          <div className="flex-1 space-y-2">
            <div className="relative">
              {/* Icon: link or folder depending on content */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light-surface/25 pointer-events-none">
                {imageIsExternal ? (
                  <LinkIcon size={15} />
                ) : (
                  <FolderOpen size={15} />
                )}
              </div>
              <input
                className={inputClass + " pl-10"}
                placeholder="/beijing.png  или  https://..."
                {...register("image", {
                  required: "Укажите путь или ссылку на изображение",
                })}
              />
            </div>

            {/* Hint chips */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-[10px] px-2 py-1 rounded-full bg-light-surface/5 border border-light-surface/10 text-light-surface/30">
                /public/beijing.png
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-light-surface/5 border border-light-surface/10 text-light-surface/30">
                https://images.example.com/photo.jpg
              </span>
            </div>
          </div>

          {/* Live thumbnail */}
          {imageSrc && (
            <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-light-surface/10 bg-light-surface/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.opacity = "0.2";
                  e.currentTarget.style.filter = "grayscale(1)";
                }}
                onLoad={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.filter = "none";
                }}
              />
            </div>
          )}
        </div>
      </FormField>

      {/* Video */}
      <FormField
        label="Видео"
        hint="YouTube ссылка любого формата (необязательно)"
        error={errors.video?.message}
      >
        <div className="relative">
          <Film
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-light-surface/25 pointer-events-none"
          />
          <input
            className={inputClass + " pl-10"}
            placeholder="https://youtu.be/...  или  youtube.com/watch?v=..."
            {...register("video")}
            onBlur={handleVideoBlur}
          />
        </div>

        {videoSrc && (
          <>
            <p className="text-xs text-green-400/70 flex items-center gap-1.5 pt-1">
              <Check size={12} />
              {videoSrc.includes("youtube.com/embed/")
                ? "Embed-ссылка готова"
                : "Видео добавлено"}
            </p>
            {/* Mini embed preview */}
            {videoSrc.includes("youtube.com/embed/") && (
              <div className="mt-3 rounded-xl overflow-hidden border border-light-surface/10 aspect-video">
                <iframe
                  src={videoSrc}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </>
        )}
      </FormField>
    </SectionCard>
  );
}
