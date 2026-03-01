"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as bcrypt from "bcryptjs";
import {
  getAdminCredentials,
  updateAdminCredentials,
} from "@/lib/auth-repository";

const SESSION_COOKIE = "admin_session";
// Static salt just for session cookie signing to prevent easy spoofing
const SESSION_SECRET = process.env.BOT_TOKEN || "fallback-secret-123";

/**
 * Verifies credentials against DB and creates a session cookie if valid
 */
export async function loginAction(formData: FormData) {
  const login = formData.get("login") as string;
  const password = formData.get("password") as string;

  if (!login || !password) {
    return { success: false, error: "Введите логин и пароль" };
  }

  const credentials = await getAdminCredentials();

  if (!credentials) {
    return {
      success: false,
      error: "Система не настроена (нет администратора в БД)",
    };
  }

  if (login !== credentials.login) {
    return { success: false, error: "Неверный логин или пароль" };
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    credentials.passwordHash
  );
  if (!isPasswordValid) {
    return { success: false, error: "Неверный логин или пароль" };
  }

  // Create simple signed token using bot token as secret (since we don't have NEXTAUTH_SECRET)
  // In a real prod app, use jose/jwt or a dedicated secret.
  const token = await bcrypt.hash(login + SESSION_SECRET, 10);

  // Create session cookie expiring in 7 days
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true };
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function changeCredentialsAction(formData: FormData) {
  // Must be authenticated to change credentials
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);

  if (!sessionCookie) {
    return { success: false, error: "Нет доступа" };
  }

  const newLogin = formData.get("login") as string;
  const newPassword = formData.get("password") as string;

  if (!newLogin || !newPassword) {
    return { success: false, error: "Все поля обязательны" };
  }

  try {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await updateAdminCredentials(newLogin, passwordHash);

    // Invalidate old session to force relogin
    cookieStore.delete(SESSION_COOKIE);

    return { success: true };
  } catch (error) {
    console.error("Error changing credentials:", error);
    return { success: false, error: "Ошибка при сохранении" };
  }
}
