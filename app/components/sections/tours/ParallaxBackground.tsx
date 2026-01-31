"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ParallaxBackground() {
  const monachRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const bambooRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (monachRef.current) {
            monachRef.current.style.transform = `translate3d(-${
              scrollY * 0.05
            }px, ${scrollY * 0.02}px, 0) rotate(10deg)`;
          }
          if (flashRef.current) {
            flashRef.current.style.transform = `translate3d(${
              scrollY * 0.08
            }px, -50%, 0) rotate(-20deg)`;
          }
          if (bambooRef.current) {
            bambooRef.current.style.transform = `translate3d(${
              scrollY * 0.12
            }px, -${scrollY * 0.04}px, 0)`;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Decorative Atmosphere Elements - Optimized with will-change-transform */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          ref={monachRef}
          className="absolute top-40 -right-20 w-80 h-80 opacity-20 will-change-transform"
        >
          <Image
            src="/monach.png"
            alt="Monach"
            fill
            className="object-contain"
          />
        </div>

        <div
          ref={flashRef}
          className="absolute top-[33%] -left-20 w-64 h-64 opacity-15 will-change-transform"
        >
          <Image src="/flash.png" alt="Flash" fill className="object-contain" />
        </div>

        <div
          ref={bambooRef}
          className="absolute bottom-40 -left-10 w-96 h-96 opacity-25 will-change-transform"
        >
          <Image
            src="/bamboo.png"
            alt="Bamboo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent-cta/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div
        className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent-cta/8 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/2 rounded-full blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.08;
          }
          50% {
            opacity: 0.15;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}
