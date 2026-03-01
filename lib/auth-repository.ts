import { db } from "./db";

export interface AdminCredentials {
  login: string;
  passwordHash: string;
}

export async function getAdminCredentials(): Promise<AdminCredentials | null> {
  const result = await db.execute(
    "SELECT login, password as passwordHash FROM settings WHERE id = 1"
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    login: row.login as string,
    passwordHash: row.passwordHash as string,
  };
}

export async function updateAdminCredentials(
  login: string,
  passwordHash: string
): Promise<void> {
  await db.execute({
    sql: "UPDATE settings SET login = ?, password = ? WHERE id = 1",
    args: [login, passwordHash],
  });
}
