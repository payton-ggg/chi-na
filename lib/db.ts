import { createClient } from "@libsql/client";

/** Singleton Turso/LibSQL client. Reused across all server-side calls. */
export const db = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_TOKEN!,
});
