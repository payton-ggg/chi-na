import { useFormContext } from "react-hook-form";
import { User, CheckSquare, Square } from "lucide-react";
import type { TourFormData } from "../constants/types";
import SectionCard from "@/app/shared/ui/SectionCard";
import type { Guide } from "@/app/data/tours";

export default function GuideSection({
  guides = [],
}: {
  guides?: (Guide & { id: number })[];
}) {
  const { watch, setValue } = useFormContext<TourFormData>();
  const guideIds = watch("guideIds") || [];

  const toggleGuide = (id: number) => {
    if (guideIds.includes(id)) {
      setValue(
        "guideIds",
        guideIds.filter((gid) => gid !== id),
        { shouldValidate: true }
      );
    } else {
      setValue("guideIds", [...guideIds, id], { shouldValidate: true });
    }
  };

  return (
    <SectionCard title="Гиды экспедиции" icon={<User size={18} />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guides.map((g) => {
          const isSelected = guideIds.includes(g.id);
          return (
            <div
              key={g.id}
              onClick={() => toggleGuide(g.id)}
              className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-colors ${
                isSelected
                  ? "bg-accent-cta/10 border-accent-cta/50 text-white"
                  : "bg-black/20 border-white/5 text-white/60 hover:border-white/20"
              }`}
            >
              <div className="shrink-0 flex items-center justify-center">
                {isSelected ? (
                  <CheckSquare size={20} className="text-accent-cta" />
                ) : (
                  <Square size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-semibold text-sm truncate ${
                    isSelected ? "text-white" : ""
                  }`}
                >
                  {g.name}
                </p>
                <p className="text-xs text-white/40 truncate">{g.role}</p>
              </div>
            </div>
          );
        })}
        {guides.length === 0 && (
          <div className="col-span-full py-6 text-center text-white/40 text-sm">
            Нет доступных гидов. Сначала добавьте гидов в разделе "Гиды".
          </div>
        )}
      </div>
    </SectionCard>
  );
}
