"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Reset state on path change
    setIsLoading(true);
    setIsExiting(false);

    // Force scroll to top immediately to prevent "black" areas
    window.scrollTo(0, 0);

    // Give browser time to paint the new page
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsLoading(false), 800);
    }, 1500); // Increased to 1.5s to ensure full loading/painting

    return () => clearTimeout(timer);
  }, [pathname]);

  // Lock scroll when loading
  useEffect(() => {
    if (!isExiting) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.scrollBehavior = "auto"; // Prevent native smooth scroll conflict
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.scrollBehavior = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, [isExiting]);

  if (isExiting && !isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-99999 flex items-center justify-center bg-dark-section transition-opacity duration-500 ease-in-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <div className="text-[12rem] md:text-[18rem] font-serif text-accent-cta leading-none select-none animate-hieroglyph-glow">
            旅
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-accent-cta/10 rounded-full animate-ping-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-accent-cta/5 rounded-full animate-ping-slower" />
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="w-48 h-px bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent-cta animate-loading-bar" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-cta animate-pulse">
            Tsunami Travel
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes hieroglyph-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 20px rgba(194, 56, 28, 0.3));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(194, 56, 28, 0.6));
            transform: scale(1.05);
          }
        }
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes ping-slow {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }
        @keyframes ping-slower {
          0% {
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }
        .animate-hieroglyph-glow {
          animation: hieroglyph-glow 4s ease-in-out infinite;
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
        .animate-ping-slower {
          animation: ping-slower 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
