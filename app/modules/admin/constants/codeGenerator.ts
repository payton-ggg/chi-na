import type { TourFormData } from "./types";

/** Generates a ready-to-paste TypeScript object literal for tours.ts */
export function generateTsCode(data: TourFormData, nextId: number): string {
  const slug =
    data.slug ||
    data.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const highlights = data.highlights.map((h) => h.value).filter(Boolean);
  const locations = data.locations.filter((l) => l.name.trim());

  const locationsCode = locations
    .map(
      (l) =>
        `      {\n        name: "${l.name}",\n        description: "${l.description}",\n        coordinates: { x: ${l.x}, y: ${l.y} },\n      }`
    )
    .join(",\n");

  const videoLine = data.video ? `\n    video: "${data.video}",` : "";

  return `  {
    id: ${nextId},
    slug: "${slug}",
    title: "${data.title}",
    description: "${data.description}",
    image: "${data.image}",${videoLine}
    highlights: [${highlights.map((h) => `"${h}"`).join(", ")}],
    fullDescription: "${data.fullDescription}",
    locations: [
${locationsCode}
    ],
    guide: {
      name: "${data.guideName}",
      role: "${data.guideRole}",
      telegram: "${data.guideTelegram}",
    },
  },`;
}
