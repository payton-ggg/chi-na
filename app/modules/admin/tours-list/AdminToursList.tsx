"use client";

import Link from "next/link";
import { Plus, Edit2, Trash2, MapPin } from "lucide-react";
import { useState } from "react";
import { deleteTourAction } from "@/app/actions/toursAction";

export default function AdminToursList({ tours }: { tours: any[] }) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Вы уверены, что хотите удалить этот тур? Это действие нельзя отменить."
      )
    )
      return;
    setIsDeleting(id);
    const res = await deleteTourAction(id);
    if (!res.success) {
      alert(res.error || "Ошибка удаления");
    }
    setIsDeleting(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-light-surface uppercase">
            Туры
          </h1>
          <p className="text-light-surface/40 mt-2 text-sm">
            Управление маршрутами и экскурсиями
          </p>
        </div>

        <Link
          href="/admin/tours/create"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-cta hover:bg-accent-cta/90 text-light-surface font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(194,56,28,0.35)] shrink-0"
        >
          <Plus size={16} />
          Создать новый
        </Link>
      </div>

      {tours.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center border border-dashed border-light-surface/10 rounded-4xl bg-light-surface/5">
          <MapPin className="text-light-surface/20 w-12 h-12 mb-4" />
          <p className="text-light-surface/40 font-semibold">
            У вас пока нет добавленных туров
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-light-surface/5 border border-light-surface/10 rounded-3xl overflow-hidden group hover:border-light-surface/20 transition-all flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-black text-white">
                    {tour.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <p className="text-light-surface/60 text-sm line-clamp-3 mb-6 flex-1">
                  {tour.description}
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-light-surface/10">
                  <Link
                    href={`/admin/tours/edit/${tour.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-light-surface/10 hover:bg-light-surface/20 text-light-surface font-semibold text-sm transition-colors"
                  >
                    <Edit2 size={16} /> Редактировать
                  </Link>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    disabled={isDeleting === tour.id}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors shrink-0 disabled:opacity-50"
                    title="Удалить тур"
                  >
                    {isDeleting === tour.id ? (
                      <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
