"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Send, Sparkles } from "lucide-react";
import { Tour } from "@/app/data/tours";

interface TourListCardProps {
  tour: Tour;
  index: number;
}

export default function TourListCard({ tour, index }: TourListCardProps) {
  return (
    <div className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl border border-white/10 bg-white/3 hover:border-accent-cta/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(194,56,28,0.15)]">
      {/* Index label */}
      <div className="absolute top-6 left-6 z-20 text-white/20 font-black text-5xl leading-none select-none pointer-events-none">
        0{index + 1}
      </div>

      {/* Image */}
      <div className="relative w-full md:w-2/5 h-64 md:h-auto min-h-64 shrink-0 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-dark-section/80 hidden md:block" />
        <div className="absolute inset-0 bg-linear-to-t from-dark-section/80 to-transparent md:hidden" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-8 md:p-10 flex-1">
        {/* Top: title + highlights */}
        <div className="space-y-5">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-accent-cta transition-colors duration-300">
            {tour.title}
          </h2>

          <p className="text-white/60 text-base leading-relaxed">
            {tour.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {tour.highlights.map((h) => (
              <span
                key={h}
                className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10 text-white/60 bg-white/5"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: guide + CTA */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Guide chip */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent-cta/20 border border-accent-cta/30 flex items-center justify-center shrink-0">
              <Sparkles size={14} className="text-accent-cta" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">
                {tour.guide.name}
              </p>
              <p className="text-white/40 text-xs">{tour.guide.role}</p>
            </div>
            {tour.guide.telegram && (
              <a
                href={tour.guide.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 p-1.5 rounded-full bg-white/5 hover:bg-accent-cta/20 border border-white/10 hover:border-accent-cta/40 text-white/40 hover:text-accent-cta transition-all"
                aria-label="Telegram гида"
                onClick={(e) => e.stopPropagation()}
              >
                <Send size={12} />
              </a>
            )}
          </div>

          {/* CTA */}
          <Link
            href={`/tours/${tour.slug}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-cta/10 hover:bg-accent-cta border border-accent-cta/30 hover:border-accent-cta text-accent-cta hover:text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 group/btn whitespace-nowrap"
          >
            Подробнее
            <ArrowUpRight
              size={16}
              className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
