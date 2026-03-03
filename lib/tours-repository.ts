import { db } from "@/lib/db";
import type { Guide, LocationInfo, Tour } from "@/app/data/tours";

export interface GuideRow {
  id: number;
  name: string;
  role: string;
  avatar: string | null;
  telegram: string | null;
  price: string | null;
}

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
  guides: string;
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
    guides: JSON.parse(row.guides) as (Guide & { id: number })[],
  };
}

export async function createToursTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS guides (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      name     TEXT    NOT NULL UNIQUE,
      role     TEXT    NOT NULL,
      avatar   TEXT,
      telegram TEXT,
      price    TEXT
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

  await db.execute(`
    CREATE TABLE IF NOT EXISTS tour_guides (
      tour_id INTEGER,
      guide_id INTEGER,
      PRIMARY KEY (tour_id, guide_id),
      FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
      FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE CASCADE
    )
  `);
}

// ─── Queries ─────────────────────────────────────────────────────────────────

const JOIN_GUIDES = `
  SELECT
    t.*,
    COALESCE(
      (
        SELECT json_group_array(
          json_object(
            'id', g.id, 
            'name', g.name, 
            'role', g.role, 
            'avatar', g.avatar, 
            'telegram', g.telegram, 
            'price', g.price
          )
        )
        FROM tour_guides tg
        JOIN guides g ON tg.guide_id = g.id
        WHERE tg.tour_id = t.id
      ),
      '[]'
    ) as guides
  FROM tours t
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

export async function getGuideById(
  id: number
): Promise<(Guide & { id: number }) | null> {
  const result = await db.execute({
    sql: "SELECT * FROM guides WHERE id = ? LIMIT 1",
    args: [id],
  });
  if (result.rows.length === 0) return null;
  return result.rows[0] as unknown as Guide & { id: number };
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
  guide_ids?: number[];
}

export async function setTourGuides(tourId: number, guideIds: number[]) {
  // Sync tour_guides junction table
  await db.execute({
    sql: "DELETE FROM tour_guides WHERE tour_id = ?",
    args: [tourId],
  });
  for (const guideId of guideIds) {
    await db.execute({
      sql: "INSERT INTO tour_guides (tour_id, guide_id) VALUES (?, ?)",
      args: [tourId, guideId],
    });
  }
}

export async function createTour(input: CreateTourInput): Promise<Tour> {
  const result = await db.execute({
    sql: `
      INSERT INTO tours (slug, title, description, full_description, image, video, highlights, locations)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
    ],
  });
  const newId = (result.rows[0] as unknown as TourRow).id;

  if (input.guide_ids) {
    await setTourGuides(newId, input.guide_ids);
  }

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

  if (sets.length > 0) {
    args.push(id);
    await db.execute({
      sql: `UPDATE tours SET ${sets.join(", ")} WHERE id = ?`,
      args: args,
    });
  }

  if (input.guide_ids !== undefined) {
    await setTourGuides(id, input.guide_ids);
  }

  return getTourById(id) as Promise<Tour>;
}

export async function deleteTour(id: number): Promise<void> {
  await db.execute({ sql: "DELETE FROM tours WHERE id = ?", args: [id] });
  await db.execute({
    sql: "DELETE FROM tour_guides WHERE tour_id = ?",
    args: [id],
  });
}

export interface CreateGuideInput {
  name: string;
  role: string;
  avatar?: string;
  telegram?: string;
  price?: string;
}

export async function createGuide(
  input: CreateGuideInput
): Promise<Guide & { id: number }> {
  const result = await db.execute({
    sql: "INSERT INTO guides (name, role, avatar, telegram, price) VALUES (?, ?, ?, ?, ?) RETURNING *",
    args: [
      input.name,
      input.role,
      input.avatar ?? null,
      input.telegram ?? null,
      input.price ?? null,
    ],
  });
  return result.rows[0] as unknown as Guide & { id: number };
}

export async function updateGuide(
  id: number,
  input: Partial<CreateGuideInput>
): Promise<Guide & { id: number }> {
  const sets = [];
  const args = [];

  if (input.name !== undefined) {
    sets.push("name = ?");
    args.push(input.name);
  }
  if (input.role !== undefined) {
    sets.push("role = ?");
    args.push(input.role);
  }
  if (input.avatar !== undefined) {
    sets.push("avatar = ?");
    args.push(input.avatar);
  }
  if (input.telegram !== undefined) {
    sets.push("telegram = ?");
    args.push(input.telegram);
  }
  if (input.price !== undefined) {
    sets.push("price = ?");
    args.push(input.price);
  }

  if (sets.length === 0)
    return getGuideById(id) as Promise<Guide & { id: number }>;

  args.push(id);
  const result = await db.execute({
    sql: `UPDATE guides SET ${sets.join(", ")} WHERE id = ? RETURNING *`,
    args: args,
  });
  return result.rows[0] as unknown as Guide & { id: number };
}

export async function deleteGuide(id: number): Promise<void> {
  await db.execute({ sql: "DELETE FROM guides WHERE id = ?", args: [id] });
  await db.execute({
    sql: "DELETE FROM tour_guides WHERE guide_id = ?",
    args: [id],
  });
}
