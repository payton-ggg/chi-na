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
  guide_id: number | null;
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
    guide: typeof row.guide === "string" ? JSON.parse(row.guide) : row.guide,
  };
}

export async function createToursTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS guides (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      name     TEXT    NOT NULL UNIQUE,
      role     TEXT    NOT NULL,
      avatar   TEXT,
      telegram TEXT
    )
  `);

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
      guide_id         INTEGER,
      FOREIGN KEY(guide_id) REFERENCES guides(id)
    )
  `);
}

// ─── Queries ─────────────────────────────────────────────────────────────────

const JOIN_GUIDES = `
  SELECT
    t.*,
    json_object('name', g.name, 'role', g.role, 'avatar', g.avatar, 'telegram', g.telegram) as guide
  FROM tours t
  LEFT JOIN guides g ON t.guide_id = g.id
`;

export async function getAllTours(): Promise<Tour[]> {
  const result = await db.execute(`${JOIN_GUIDES} ORDER BY t.id ASC`);
  return (result.rows as unknown as TourRow[]).map(rowToTour);
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const result = await db.execute({
    sql: `${JOIN_GUIDES} WHERE t.slug = ? LIMIT 1`,
    args: [slug],
  });
  if (result.rows.length === 0) return null;
  return rowToTour(result.rows[0] as unknown as TourRow);
}

export async function getTourById(id: number): Promise<Tour | null> {
  const result = await db.execute({
    sql: `${JOIN_GUIDES} WHERE t.id = ? LIMIT 1`,
    args: [id],
  });
  if (result.rows.length === 0) return null;
  return rowToTour(result.rows[0] as unknown as TourRow);
}

export async function getAllSlugs(): Promise<string[]> {
  const result = await db.execute("SELECT slug FROM tours");
  return (result.rows as unknown as { slug: string }[]).map((r) => r.slug);
}

export async function getAllGuides(): Promise<(Guide & { id: number })[]> {
  const result = await db.execute("SELECT * FROM guides ORDER BY id ASC");
  return result.rows as unknown as (Guide & { id: number })[];
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
  guide_id?: number;
}

export async function createTour(input: CreateTourInput): Promise<Tour> {
  const result = await db.execute({
    sql: `
      INSERT INTO tours (slug, title, description, full_description, image, video, highlights, locations, guide_id)
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
      input.guide_id ?? null,
    ],
  });
  const newId = (result.rows[0] as unknown as TourRow).id;
  return getTourById(newId) as Promise<Tour>;
}

export async function updateTour(
  id: number,
  input: Partial<CreateTourInput>
): Promise<Tour> {
  const sets = [];
  const args = [];

  if (input.slug !== undefined) {
    sets.push("slug = ?");
    args.push(input.slug);
  }
  if (input.title !== undefined) {
    sets.push("title = ?");
    args.push(input.title);
  }
  if (input.description !== undefined) {
    sets.push("description = ?");
    args.push(input.description);
  }
  if (input.fullDescription !== undefined) {
    sets.push("full_description = ?");
    args.push(input.fullDescription);
  }
  if (input.image !== undefined) {
    sets.push("image = ?");
    args.push(input.image);
  }
  if (input.video !== undefined) {
    sets.push("video = ?");
    args.push(input.video);
  }
  if (input.highlights !== undefined) {
    sets.push("highlights = ?");
    args.push(JSON.stringify(input.highlights));
  }
  if (input.locations !== undefined) {
    sets.push("locations = ?");
    args.push(JSON.stringify(input.locations));
  }
  if (input.guide_id !== undefined) {
    sets.push("guide_id = ?");
    args.push(input.guide_id);
  }

  if (sets.length === 0) return getTourById(id) as Promise<Tour>;

  args.push(id);
  await db.execute({
    sql: `UPDATE tours SET ${sets.join(", ")} WHERE id = ?`,
    args: args,
  });

  return getTourById(id) as Promise<Tour>;
}

export async function deleteTour(id: number): Promise<void> {
  await db.execute({ sql: "DELETE FROM tours WHERE id = ?", args: [id] });
}
