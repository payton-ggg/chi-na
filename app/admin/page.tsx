"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Eye,
  Copy,
  Check,
  MapPin,
  User,
  Film,
  Image as ImageIcon,
  Tag,
  FileText,
  Globe,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface LocationDraft {
  name: string;
  description: string;
  x: number;
  y: number;
}

interface TourDraft {
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  image: string;
  video: string;
  highlights: string[];
  locations: LocationDraft[];
  guideName: string;
  guideRole: string;
  guideTelegram: string;
}

const emptyTour: TourDraft = {
  title: "",
  slug: "",
  description: "",
  fullDescription: "",
  image: "",
  video: "",
  highlights: [""],
  locations: [{ name: "", description: "", x: 70, y: 50 }],
  guideName: "Лев Логачев",
  guideRole: "Авторский гид · Шанхай",
  guideTelegram: "https://t.me/Lihach57",
};

function generateTsCode(tour: TourDraft, nextId: number): string {
  const slug =
    tour.slug ||
    tour.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  return `  {
    id: ${nextId},
    slug: "${slug}",
    title: "${tour.title}",
    description: "${tour.description}",
    image: "${tour.image}",${tour.video ? `\n    video: "${tour.video}",` : ""}
    highlights: [${tour.highlights
      .filter(Boolean)
      .map((h) => `"${h}"`)
      .join(", ")}],
    fullDescription: "${tour.fullDescription}",
    locations: [
${tour.locations
  .filter((l) => l.name)
  .map(
    (l) => `      {
        name: "${l.name}",
        description: "${l.description}",
        coordinates: { x: ${l.x}, y: ${l.y} },
      }`
  )
  .join(",\n")}
    ],
    guide: {
      name: "${tour.guideName}",
      role: "${tour.guideRole}",
      telegram: "${tour.guideTelegram}",
    },
  },`;
}

function SectionCard({
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

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-black uppercase tracking-[0.15em] text-white/50">
        {label}
        {hint && (
          <span className="ml-2 normal-case tracking-normal font-normal text-white/25">
            — {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/25 focus:outline-none focus:border-accent-cta/60 focus:bg-white/8 transition-all duration-200 text-sm";

const textareaClass = inputClass + " resize-none min-h-[100px] leading-relaxed";

export default function AdminPage() {
  const [tour, setTour] = useState<TourDraft>(emptyTour);
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState(false);
  const [nextId] = useState(4); // would normally come from API

  const set = (field: keyof TourDraft, value: unknown) =>
    setTour((prev) => ({ ...prev, [field]: value }));

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    set("title", value);
    if (!tour.slug || tour.slug === autoSlug(tour.title)) {
      set("slug", autoSlug(value));
    }
  };

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  // Highlights
  const setHighlight = (i: number, val: string) => {
    const arr = [...tour.highlights];
    arr[i] = val;
    set("highlights", arr);
  };
  const addHighlight = () => set("highlights", [...tour.highlights, ""]);
  const removeHighlight = (i: number) =>
    set(
      "highlights",
      tour.highlights.filter((_, idx) => idx !== i)
    );

  // Locations
  const setLocation = (
    i: number,
    field: keyof LocationDraft,
    val: string | number
  ) => {
    const arr = [...tour.locations];
    arr[i] = { ...arr[i], [field]: val };
    set("locations", arr);
  };
  const addLocation = () =>
    set("locations", [
      ...tour.locations,
      { name: "", description: "", x: 70, y: 50 },
    ]);
  const removeLocation = (i: number) =>
    set(
      "locations",
      tour.locations.filter((_, idx) => idx !== i)
    );

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTsCode(tour, nextId));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isValid =
    tour.title.trim() && tour.description.trim() && tour.image.trim();

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#0B0C10]/90 backdrop-blur-xl border-b border-white/8">
        <div className="container mx-auto px-6 flex items-center justify-between h-18 py-4">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Сайт
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-cta flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-black uppercase tracking-widest text-sm">
                TSUNAMI TRAVEL ADMIN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreview(!preview)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                preview
                  ? "bg-white/10 border-white/20 text-white"
                  : "border-white/10 text-white/50 hover:text-white hover:border-white/20"
              }`}
            >
              <Eye size={15} />
              Превью
            </button>

            <button
              onClick={handleCopy}
              disabled={!isValid}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                isValid
                  ? copied
                    ? "bg-green-500/20 border border-green-500/40 text-green-400"
                    : "bg-accent-cta hover:bg-accent-cta/80 text-white shadow-[0_0_20px_rgba(194,56,28,0.4)]"
                  : "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Скопировано!" : "Копировать код"}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div
          className={`grid gap-10 ${
            preview
              ? "grid-cols-1 lg:grid-cols-12"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
        >
          {/* Form */}
          <div className={`space-y-6 ${preview ? "lg:col-span-7" : ""}`}>
            {/* Page Title */}
            <div className="mb-10">
              <p className="text-accent-cta text-xs font-black uppercase tracking-[0.4em] mb-3">
                Панель управления
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                Новый концепт
              </h1>
              <p className="text-white/40 mt-3 text-sm">
                Заполните форму — затем скопируйте готовый TypeScript-код и
                вставьте в{" "}
                <code className="text-accent-cta/80 bg-white/5 px-1.5 py-0.5 rounded">
                  app/data/tours.ts
                </code>
              </p>
            </div>

            {/* Section: Basic Info */}
            <SectionCard
              title="Основная информация"
              icon={<FileText size={18} />}
            >
              <Field label="Название" hint="отображается в заголовке">
                <input
                  className={inputClass}
                  placeholder="Пример: Пекин"
                  value={tour.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </Field>

              <Field label="Slug (URL)" hint="заполняется автоматически">
                <input
                  className={inputClass}
                  placeholder="beijing"
                  value={tour.slug}
                  onChange={(e) => set("slug", e.target.value)}
                />
              </Field>

              <Field
                label="Короткое описание"
                hint="1–2 предложения для карточки"
              >
                <textarea
                  className={textareaClass}
                  placeholder="Запретный город, Великая стена и утиная грудка по-пекински. Культурная столица Китая за один день."
                  value={tour.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={2}
                />
              </Field>

              <Field
                label="Полное описание"
                hint="раскрывается на странице тура"
              >
                <textarea
                  className={textareaClass}
                  placeholder="Развёрнутое описание — что увидит участник, какова история места, что сделает этот тур особенным..."
                  value={tour.fullDescription}
                  onChange={(e) => set("fullDescription", e.target.value)}
                  rows={4}
                />
              </Field>
            </SectionCard>

            {/* Section: Media */}
            <SectionCard title="Медиа" icon={<ImageIcon size={18} />}>
              <Field label="Изображение" hint="путь в папке /public">
                <div className="flex gap-3">
                  <input
                    className={inputClass}
                    placeholder="/beijing.png"
                    value={tour.image}
                    onChange={(e) => set("image", e.target.value)}
                  />
                  {tour.image && (
                    <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tour.image}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </div>
                  )}
                </div>
              </Field>

              <Field label="YouTube видео" hint="embed-ссылка (необязательно)">
                <input
                  className={inputClass}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  value={tour.video}
                  onChange={(e) => set("video", e.target.value)}
                />
                {tour.video && (
                  <p className="text-xs text-green-400/70 mt-1.5 flex items-center gap-1">
                    <Check size={12} /> Видео добавлено
                  </p>
                )}
              </Field>
            </SectionCard>

            {/* Section: Highlights */}
            <SectionCard
              title="Особенности (Highlights)"
              icon={<Tag size={18} />}
            >
              <p className="text-white/30 text-xs mb-4">
                До 3 ключевых точек — показываются на карточке тура
              </p>
              <div className="space-y-3">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <span className="text-accent-cta font-black text-sm w-6 shrink-0">
                      {i + 1}.
                    </span>
                    <input
                      className={inputClass}
                      placeholder="Пример: Великая стена"
                      value={h}
                      onChange={(e) => setHighlight(i, e.target.value)}
                    />
                    {tour.highlights.length > 1 && (
                      <button
                        onClick={() => removeHighlight(i)}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/30 flex items-center justify-center transition-all shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {tour.highlights.length < 5 && (
                <button
                  onClick={addHighlight}
                  className="mt-4 flex items-center gap-2 text-sm text-white/40 hover:text-accent-cta transition-colors"
                >
                  <Plus size={15} /> Добавить
                </button>
              )}
            </SectionCard>

            {/* Section: Locations */}
            <SectionCard title="Локации на карте" icon={<MapPin size={18} />}>
              <p className="text-white/30 text-xs mb-4">
                Координаты X/Y — в процентах от размера карты (0–100). Shanghai
                ≈ x:67 y:58
              </p>
              <div className="space-y-6">
                {tour.locations.map((loc, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white/5 border border-white/8 space-y-4"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black uppercase tracking-widest text-accent-cta/70">
                        Локация {i + 1}
                      </span>
                      {tour.locations.length > 1 && (
                        <button
                          onClick={() => removeLocation(i)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/30 flex items-center justify-center transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Название">
                        <input
                          className={inputClass}
                          placeholder="Пекин"
                          value={loc.name}
                          onChange={(e) =>
                            setLocation(i, "name", e.target.value)
                          }
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-2">
                        <Field label="X (%)">
                          <input
                            type="number"
                            className={inputClass}
                            min={0}
                            max={100}
                            value={loc.x}
                            onChange={(e) =>
                              setLocation(
                                i,
                                "x",
                                parseFloat(e.target.value) || 0
                              )
                            }
                          />
                        </Field>
                        <Field label="Y (%)">
                          <input
                            type="number"
                            className={inputClass}
                            min={0}
                            max={100}
                            value={loc.y}
                            onChange={(e) =>
                              setLocation(
                                i,
                                "y",
                                parseFloat(e.target.value) || 0
                              )
                            }
                          />
                        </Field>
                      </div>
                    </div>

                    <Field label="Описание локации">
                      <textarea
                        className={textareaClass}
                        placeholder="Краткое описание, которое появится в тултипе на карте..."
                        value={loc.description}
                        onChange={(e) =>
                          setLocation(i, "description", e.target.value)
                        }
                        rows={2}
                      />
                    </Field>
                  </div>
                ))}
              </div>
              <button
                onClick={addLocation}
                className="mt-4 flex items-center gap-2 text-sm text-white/40 hover:text-accent-cta transition-colors"
              >
                <Plus size={15} /> Добавить локацию
              </button>
            </SectionCard>

            {/* Section: Guide */}
            <SectionCard title="Гид экспедиции" icon={<User size={18} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Имя гида">
                  <input
                    className={inputClass}
                    placeholder="Лев Логачев"
                    value={tour.guideName}
                    onChange={(e) => set("guideName", e.target.value)}
                  />
                </Field>
                <Field label="Роль">
                  <input
                    className={inputClass}
                    placeholder="Авторский гид · Шанхай"
                    value={tour.guideRole}
                    onChange={(e) => set("guideRole", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Telegram (ссылка)">
                <input
                  className={inputClass}
                  placeholder="https://t.me/username"
                  value={tour.guideTelegram}
                  onChange={(e) => set("guideTelegram", e.target.value)}
                />
              </Field>
            </SectionCard>
          </div>

          {/* Preview Panel */}
          {preview && (
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-6">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30">
                  Предпросмотр
                </p>

                {/* Card Preview */}
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                  {/* Image area */}
                  <div className="aspect-video relative bg-white/5 overflow-hidden">
                    {tour.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={tour.image}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.style.opacity = "0")}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/10">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5">
                      <h2 className="text-3xl font-black text-white tracking-tight">
                        {tour.title || (
                          <span className="text-white/20">Название тура</span>
                        )}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-white/60 text-sm leading-relaxed">
                      {tour.description || (
                        <span className="italic text-white/20">
                          Короткое описание...
                        </span>
                      )}
                    </p>

                    {tour.highlights.filter(Boolean).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.filter(Boolean).map((h, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1.5 rounded-full bg-accent-cta/10 border border-accent-cta/20 text-accent-cta font-medium"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 border-t border-white/8 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-cta/20 flex items-center justify-center text-accent-cta text-xs font-black">
                        {tour.guideName.charAt(0) || "Г"}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">
                          {tour.guideName || "Имя гида"}
                        </p>
                        <p className="text-white/30 text-xs">
                          {tour.guideRole || "Роль гида"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code Preview */}
                <div className="rounded-3xl border border-white/8 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border-b border-white/8">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-white/30 text-xs font-mono">
                      tours.ts
                    </span>
                    <button
                      onClick={handleCopy}
                      className="ml-auto text-xs text-white/30 hover:text-accent-cta flex items-center gap-1 transition-colors"
                    >
                      {copied ? <Check size={11} /> : <Copy size={11} />}
                      {copied ? "Скопировано" : "Копировать"}
                    </button>
                  </div>
                  <pre className="p-5 text-xs text-green-400/70 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap bg-[#0a0c0f] max-h-80 overflow-y-auto">
                    {generateTsCode(tour, nextId)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
