export interface LocationDraft {
  name: string;
  description: string;
  x: number;
  y: number;
}

export interface TourFormData {
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  image: string;
  video: string;
  /** useFieldArray requires objects, not primitives */
  highlights: { value: string }[];
  locations: LocationDraft[];
  guideName: string;
  guideRole: string;
  guideTelegram: string;
}

export const defaultValues: TourFormData = {
  title: "",
  slug: "",
  description: "",
  fullDescription: "",
  image: "",
  video: "",
  highlights: [{ value: "" }],
  locations: [{ name: "", description: "", x: 70, y: 50 }],
  guideName: "Лев Логачев",
  guideRole: "Авторский гид · Шанхай",
  guideTelegram: "https://t.me/Lihach57",
};
