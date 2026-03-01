import { db } from "@/lib/db";
import type { Guide, LocationInfo, Tour } from "@/app/data/tours";

interface TourRow {
  id: number;
  slug: string;
  title: string;
  description: string;
  full_description: string | null;
  image: string;
  video: string | null;
  highlights: string;
  locations: string;
  guide: string;
}

function rowToTour(row: TourRow): Tour {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    fullDescription: row.full_description ?? undefined,
    image: row.image,
    video: row.video ?? undefined,
    highlights: JSON.parse(row.highlights) as string[],
    locations: JSON.parse(row.locations) as LocationInfo[],
    guide: JSON.parse(row.guide) as Guide,
  };
}

export async function createToursTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS tours (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      slug             TEXT    NOT NULL UNIQUE,
      title            TEXT    NOT NULL,
      description      TEXT    NOT NULL,
      full_description TEXT,
      image            TEXT    NOT NULL,
      video            TEXT,
      highlights       TEXT    NOT NULL DEFAULT '[]',
      locations        TEXT    NOT NULL DEFAULT '[]',
      guide            TEXT    NOT NULL DEFAULT '{}'
    )
  `);
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getAllTours(): Promise<Tour[]> {
  const result = await db.execute("SELECT * FROM tours ORDER BY id ASC");
  return (result.rows as unknown as TourRow[]).map(rowToTour);
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const result = await db.execute({
    sql: "SELECT * FROM tours WHERE slug = ? LIMIT 1",
    args: [slug],
  });
  if (result.rows.length === 0) return null;
  return rowToTour(result.rows[0] as unknown as TourRow);
}

export async function getTourById(id: number): Promise<Tour | null> {
  const result = await db.execute({
    sql: "SELECT * FROM tours WHERE id = ? LIMIT 1",
    args: [id],
  });
  if (result.rows.length === 0) return null;
  return rowToTour(result.rows[0] as unknown as TourRow);
}

export async function getAllSlugs(): Promise<string[]> {
  const result = await db.execute("SELECT slug FROM tours");
  return (result.rows as unknown as { slug: string }[]).map((r) => r.slug);
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export interface CreateTourInput {
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  video?: string;
  highlights: string[];
  locations: LocationInfo[];
  guide: Guide;
}

export async function createTour(input: CreateTourInput): Promise<Tour> {
  const result = await db.execute({
    sql: `
      INSERT INTO tours (slug, title, description, full_description, image, video, highlights, locations, guide)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `,
    args: [
      input.slug,
      input.title,
      input.description,
      input.fullDescription ?? null,
      input.image,
      input.video ?? null,
      JSON.stringify(input.highlights),
      JSON.stringify(input.locations),
      JSON.stringify(input.guide),
    ],
  });
  return rowToTour(result.rows[0] as unknown as TourRow);
}

export async function updateTour(
  id: number,
  input: Partial<CreateTourInput>
): Promise<Tour> {
  const result = await db.execute({
    sql: `
      UPDATE tours SET
        slug             = COALESCE(?, slug),
        title            = COALESCE(?, title),
        description      = COALESCE(?, description),
        full_description = COALESCE(?, full_description),
        image            = COALESCE(?, image),
        video            = COALESCE(?, video),
        highlights       = COALESCE(?, highlights),
        locations        = COALESCE(?, locations),
        guide            = COALESCE(?, guide)
      WHERE id = ?
      RETURNING *
    `,
    args: [
      input.slug ?? null,
      input.title ?? null,
      input.description ?? null,
      input.fullDescription ?? null,
      input.image ?? null,
      input.video ?? null,
      input.highlights ? JSON.stringify(input.highlights) : null,
      input.locations ? JSON.stringify(input.locations) : null,
      input.guide ? JSON.stringify(input.guide) : null,
      id,
    ],
  });
  return rowToTour(result.rows[0] as unknown as TourRow);
}

export async function deleteTour(id: number): Promise<void> {
  await db.execute({ sql: "DELETE FROM tours WHERE id = ?", args: [id] });
}
