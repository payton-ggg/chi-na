/**
 * seed.ts — run once to create the table and seed existing tours.
 * Usage: npx tsx scripts/seed.ts
 */

import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import { resolve } from "path";
import * as bcrypt from "bcryptjs";

dotenv.config({ path: resolve(process.cwd(), ".env") });

const db = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_TOKEN!,
});

const tours = [
  {
    slug: "shanghai",
    title: "Шанхай",
    description:
      "Французские концессии, Сад счастья, набережная Вайтань и паром по реке Хуанпу. Настоящий Шанхай за 5 или 7 часов.",
    full_description:
      "Индивидуальная экскурсия по Шанхаю с русскоязычным гидом. За 5 часов вы увидите Французские концессии, современные шанхайские трущобы, завод по обжарке кофе прямо в кофейне Старбакс, Сад счастья, Старый город Шанхая, набережную Вайтань и прокатитесь на пароме по реке Хуанпу. Программа на 7 часов включает также Храм нефритового Будды и 1000 Trees, M50.",
    image: "/shangai.png",
    video: "https://www.youtube.com/embed/UgJvucavxiE?si=3z3_mUn2WBnWAo0p",
    highlights: ["Набережная Вайтань", "Сад счастья", "Французские концессии"],
    locations: [
      {
        name: "Шанхай",
        description:
          "Динамичный мегаполис, сочетающий футуристические небоскребы района Пудун с исторической архитектурой набережной Вайтань. Французские концессии, Сад счастья и паром по реке Хуанпу — лишь часть того, что вас ждет.",
        coordinates: { x: 67, y: 58 },
      },
    ],
    guideName: "Лев Логачев",
  },
  {
    slug: "eastern-venice",
    title: "Восточная Венеция",
    description:
      "Однодневный тур в Чжуцзяцзяо: катание на лодочках по каналам, обед за крутящимся столом и народные костюмы.",
    full_description:
      "8-часовой тур из Шанхая в древний водный город Чжуцзяцзяо. В 11:00 встречаемся в отеле, в 12:30 прибываем на место. Прогулка вдоль узких улиц деревни, катание на лодочках по каналам, обед в китайском стиле за крутящимся столом с закусками. По желанию — переодевание в народные костюмы и фотосессия, посещение храма и галереи с древними реликвиями. В 19:00 возвращение в отель в Шанхае.",
    image: "/venice.jpg",
    video: "https://www.youtube.com/embed/WFowJSoNNHI?si=6cJFQEtxHHi3EgLR",
    highlights: ["Лодочки по каналам", "Народные костюмы", "Китайский обед"],
    locations: [
      {
        name: "Чжуцзяцзяо",
        description:
          "Древний город на воде в 50 км от Шанхая с 1700-летней историей. Узкие улочки, каналы, каменные мосты и традиционная архитектура эпохи Мин и Цин.",
        coordinates: { x: 83, y: 55 },
      },
    ],
    guideName: "Лев Логачев",
  },
  {
    slug: "hangzhou",
    title: "Ханчжоу",
    description:
      "9 часов: чай Лунцзин, Западное озеро ЮНЕСКО и древняя улица Хэфан. Скоростной поезд из Шанхая.",
    full_description:
      "Однодневный тур из Шанхая в Ханчжоу — город, вдохновлявший поэтов, императоров и философов. Скоростной поезд, прогулка по IT-кварталу Биньцзян, набережная реки Цяньтан, музей чая и плантации Лунцзин с дегустацией, прогулка вдоль Западного озера (объект ЮНЕСКО) и погружение в атмосферу старинной улицы Хэфан с шёлком, фарфором и рисовым вином.",
    image: "/hangzhou.png",
    video: null,
    highlights: ["Западное озеро", "Чай Лунцзин", "Улица Хэфан"],
    locations: [
      {
        name: "Ханчжоу",
        description:
          "Город Ханчжоу знаменит Западным озером — объектом наследия ЮНЕСКО, чайными плантациями Лунцзин и древней улицей Хэфан. Всего 1 час на скоростном поезде от Шанхая.",
        coordinates: { x: 82, y: 60 },
      },
    ],
    guideName: "Лев Логачев",
  },
];

const guides = [
  {
    name: "Лев Логачев",
    role: "Авторский гид · Шанхай",
    telegram: "https://t.me/Lihach57",
  },
  {
    name: "Местный гид",
    role: "Сопровождающий гид",
    telegram: null,
  },
];

async function main() {
  console.log("📦 Re-creating guides and tours tables...");
  await db.execute("DROP TABLE IF EXISTS tours");
  await db.execute("DROP TABLE IF EXISTS guides");

  await db.execute(`
    CREATE TABLE guides (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      name     TEXT    NOT NULL UNIQUE,
      role     TEXT    NOT NULL,
      avatar   TEXT,
      telegram TEXT
    )
  `);
  console.log("✅ Guides table ready.");

  await db.execute(`
    CREATE TABLE tours (
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
  console.log("✅ Tours table ready.");

  console.log("📦 Creating settings table...");
  await db.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      id       INTEGER PRIMARY KEY AUTOINCREMENT CHECK (id = 1),
      login    TEXT    NOT NULL,
      password TEXT    NOT NULL
    )
  `);
  console.log("✅ Settings table ready.");

  // Check if settings table is empty, if so, insert default credentials
  const settingsResult = await db.execute(
    "SELECT COUNT(*) as count FROM settings"
  );
  if (settingsResult.rows[0].count === 0) {
    console.log("⚙️ Inserting default admin credentials...");
    const defaultPasswordHash = await bcrypt.hash("admin", 10);
    await db.execute({
      sql: "INSERT INTO settings (id, login, password) VALUES (1, ?, ?)",
      args: ["admin", defaultPasswordHash],
    });
    console.log("✅ Default credentials inserted (admin/admin).");
  } else {
    console.log("ℹ️ Admin credentials already exist, skipping.");
  }

  for (const guide of guides) {
    try {
      await db.execute({
        sql: `INSERT OR IGNORE INTO guides (name, role, telegram) VALUES (?, ?, ?)`,
        args: [guide.name, guide.role, guide.telegram ?? null],
      });
      console.log(`✅ Seeded guide: ${guide.name}`);
    } catch (e) {
      console.error(`❌ Failed guide: ${guide.name}`, e);
    }
  }

  for (const tour of tours) {
    try {
      // Find the ID of the guide
      const guideResult = await db.execute({
        sql: "SELECT id FROM guides WHERE name = ? LIMIT 1",
        args: [tour.guideName],
      });
      const guideId =
        guideResult.rows.length > 0 ? (guideResult.rows[0].id as number) : null;

      await db.execute({
        sql: `
          INSERT OR IGNORE INTO tours
            (slug, title, description, full_description, image, video, highlights, locations, guide_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          tour.slug,
          tour.title,
          tour.description,
          tour.full_description,
          tour.image,
          tour.video ?? null,
          JSON.stringify(tour.highlights),
          JSON.stringify(tour.locations),
          guideId,
        ],
      });
      console.log(`✅ Seeded tour: ${tour.title}`);
    } catch (e) {
      console.error(`❌ Failed: ${tour.title}`, e);
    }
  }

  console.log("🎉 Seed complete!");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
