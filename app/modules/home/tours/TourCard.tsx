"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/app/_shared/ui/PrimaryButton";
import { Tour } from "@/app/data/tours";

interface TourCardProps {
  tour: Tour;
  index: number;
}

export default function TourCard({ tour, index }: TourCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate when card enters viewport
      const cardTop = rect.top;
      const cardHeight = rect.height;

      // Start animation when card is 80% in viewport
      const triggerPoint = windowHeight * 0.8;

      if (cardTop < triggerPoint && cardTop > -cardHeight) {
        // Calculate progress (0 to 1)
        const progress = Math.min(
          Math.max((triggerPoint - cardTop) / (cardHeight * 0.8), 0),
          1
        );
        setScrollProgress(progress);
      } else if (cardTop >= triggerPoint) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Calculate individual element animations based on scroll progress
  const titleProgress = Math.min(scrollProgress * 2, 1);
  const descProgress = Math.min(Math.max((scrollProgress - 0.2) * 2, 0), 1);
  const highlightsProgress = Math.min(
    Math.max((scrollProgress - 0.4) * 2, 0),
    1
  );
  const priceProgress = Math.min(Math.max((scrollProgress - 0.6) * 2, 0), 1);

  return (
    <div
      ref={cardRef}
      className="min-h-screen flex items-center py-12 sticky top-0"
      style={{
        zIndex: 10 - index,
      }}
    >
      <div className="container mx-auto px-6">
        <div className="relative">
          {/* Animated border gradient */}
          <div
            className="absolute -inset-px bg-linear-to-r from-primary-scarlet-600/0 via-primary-scarlet-500/30 to-primary-scarlet-600/0 rounded-[28px] blur-sm transition-opacity duration-700"
            style={{ opacity: scrollProgress * 0.8 }}
          />

          {/* Main card */}
          <div className="relative bg-linear-to-br from-light-surface/[0.07] to-light-surface/3 backdrop-blur-xl rounded-[28px] overflow-hidden border border-light-surface/10 shadow-2xl shadow-black/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative min-h-[600px]">
              {/* Fixed Image Section - Left */}
              <div className="relative h-[400px] lg:h-full overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-1000 ease-out"
                  style={{
                    transform: `scale(${1 + scrollProgress * 0.1})`,
                  }}
                >
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    quality={95}
                  />
                </div>

                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-dark-section/60 lg:to-dark-section/80" />

                {/* Animated glow */}
                <div
                  className="absolute inset-0 bg-linear-to-tr from-accent-cta/20 via-accent-cta/10 to-transparent transition-opacity duration-700"
                  style={{ opacity: scrollProgress * 0.5 }}
                />

                {/* Tour number */}
                <div className="absolute bottom-8 left-8">
                  <div
                    className="text-8xl font-black text-light-surface/10 leading-none transition-opacity duration-700"
                    style={{ opacity: scrollProgress }}
                  >
                    0{tour.id}
                  </div>
                </div>
              </div>

              {/* Animated Content Section - Right */}
              <div className="p-10 lg:p-14 flex flex-col justify-center relative">
                {/* Decorative element */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 bg-accent-cta/5 rounded-full blur-3xl transition-all duration-700"
                  style={{ opacity: scrollProgress * 0.5 }}
                />

                <div className="relative space-y-6">
                  {/* Title */}
                  <div>
                    <h3 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                      {tour.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-gray-400 text-lg lg:text-xl leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 bg-light-surface/5 border border-light-surface/10 rounded-full text-sm text-light-surface/80 hover:bg-light-surface/10 hover:border-accent-cta/30 hover:text-light-surface transition-all duration-300"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8 border-t border-light-surface/10">
                    <PrimaryButton
                      href={`/tours/${tour.slug}`}
                      className="w-full sm:w-auto"
                    >
                      Подробнее об этапе
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium hover glow effect */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{ opacity: scrollProgress * 0.5 }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent-cta/[0.07] via-transparent to-accent-cta/[0.07]" />
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-accent-cta/50 to-transparent" />
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-accent-cta/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
