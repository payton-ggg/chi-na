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
  /** useFieldArray requires objects, not bare primitives */
  highlights: { value: string }[];
  locations: LocationDraft[];
  guideIds: number[];
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
  guideIds: [],
};
