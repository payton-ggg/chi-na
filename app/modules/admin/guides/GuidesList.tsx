"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Guide } from "@/app/data/tours";
import {
  saveGuideAction,
  updateGuideAction,
  deleteGuideAction,
} from "@/app/actions/guidesAction";

export default function GuidesList({
  guides,
}: {
  guides: (Guide & { id: number })[];
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Guide>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = (guide: Guide & { id: number }) => {
    setEditingId(guide.id);
    setIsCreating(false);
    setFormData(guide);
    setError(null);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({ name: "", role: "", telegram: "", price: "", avatar: "" });
    setError(null);
  };

  const cancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({});
    setError(null);
  };

  const save = async () => {
    setLoading(true);
    setError(null);

    const inputData = {
      name: formData.name!,
      role: formData.role || "",
      telegram: formData.telegram || "",
      price: formData.price || "",
      avatar: formData.avatar || "",
    };

    let result;
    if (isCreating) {
      result = await saveGuideAction(inputData);
    } else if (editingId) {
      result = await updateGuideAction(editingId, inputData);
    }

    if (result && !result.success) {
      setError(result.error || "Ошибка сохранения");
    } else {
      cancel();
    }
    setLoading(false);
  };

  const del = async (id: number) => {
    if (confirm("Точно удалить гида?")) {
      await deleteGuideAction(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Гиды
          </h1>
        </div>
        {!isCreating && !editingId && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 px-6 py-3 bg-accent-cta hover:bg-accent-cta/80 text-white rounded-xl font-bold transition-colors"
          >
            <Plus size={18} /> Добавить гида
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <AnimatePresence>
        {(isCreating || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">
                {isCreating ? "Новый гид" : "Редактировать гида"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Имя"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-5 py-3 text-white placeholder-white/20 focus:outline-hidden focus:border-accent-cta/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Роль (напр. Авторский гид)"
                  value={formData.role || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-5 py-3 text-white placeholder-white/20 focus:outline-hidden focus:border-accent-cta/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Ссылка на Telegram"
                  value={formData.telegram || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, telegram: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-5 py-3 text-white placeholder-white/20 focus:outline-hidden focus:border-accent-cta/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Цена (число)"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-5 py-3 text-white placeholder-white/20 focus:outline-hidden focus:border-accent-cta/50 transition-colors"
                />
              </div>
              <div className="flex gap-4 justify-end mt-4">
                <button
                  onClick={cancel}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white"
                >
                  Отмена
                </button>
                <button
                  onClick={save}
                  disabled={loading || !formData.name}
                  className="flex items-center gap-2 px-6 py-2.5 bg-accent-cta text-white rounded-xl disabled:opacity-50"
                >
                  <CheckCircle size={16} /> Сохранить
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((g) => (
          <div
            key={g.id}
            className="p-6 rounded-3xl bg-white/3 border border-white/5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{g.name}</h3>
              <p className="text-white/40 mb-1">{g.role}</p>
              {g.price && <p className="text-accent-cta mb-2">${g.price}</p>}
              {g.telegram && (
                <a
                  href={g.telegram}
                  target="_blank"
                  className="text-xs text-white/20 hover:text-white truncate block underline pb-2"
                >
                  {g.telegram}
                </a>
              )}
            </div>

            <div className="flex gap-2 mt-6 border-t border-white/5 pt-4">
              <button
                onClick={() => startEdit(g)}
                className="flex items-center justify-center flex-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => del(g.id)}
                className="flex items-center justify-center flex-1 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500/60 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {guides.length === 0 && (
          <div className="col-span-full py-20 text-center text-white/30 border border-dashed border-white/10 rounded-3xl">
            Нет гидов. Добавьте первого.
          </div>
        )}
      </div>
    </div>
  );
}
