"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SectionCard({
  title,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-8 py-6 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-cta/15 flex items-center justify-center text-accent-cta">
            {icon}
          </div>
          <span className="text-white font-bold text-lg uppercase tracking-wider">
            {title}
          </span>
        </div>
        {open ? (
          <ChevronUp className="text-white/30" size={20} />
        ) : (
          <ChevronDown className="text-white/30" size={20} />
        )}
      </button>

      {open && <div className="px-8 pb-8 space-y-5">{children}</div>}
    </div>
  );
}
