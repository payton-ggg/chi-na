"use server";

import { revalidatePath } from "next/cache";
import {
  createTour,
  createToursTable,
  deleteTour,
  updateTour,
} from "@/lib/tours-repository";
import type { CreateTourInput } from "@/lib/tours-repository";

export interface SaveTourResult {
  success: boolean;
  tourId?: number;
  slug?: string;
  error?: string;
}

export async function saveTourAction(
  input: CreateTourInput
): Promise<SaveTourResult> {
  try {
    await createToursTable();

    const tour = await createTour(input);
    revalidatePath("/");
    revalidatePath("/tours");
    revalidatePath("/admin");
    revalidatePath(`/tours/${tour.slug}`);

    return { success: true, tourId: tour.id, slug: tour.slug };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (message.includes("UNIQUE constraint")) {
      return {
        success: false,
        error: `Slug "${input.slug}" уже существует. Выберите другой.`,
      };
    }

    console.error("[saveTourAction]", err);
    return { success: false, error: message };
  }
}

export async function updateTourAction(
  id: number,
  input: Partial<CreateTourInput>
): Promise<SaveTourResult> {
  try {
    const tour = await updateTour(id, input);
    revalidatePath("/");
    revalidatePath("/tours");
    revalidatePath("/admin");
    revalidatePath(`/tours/${tour.slug}`);

    return { success: true, tourId: tour.id, slug: tour.slug };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[updateTourAction]", err);
    return { success: false, error: message };
  }
}

export async function deleteTourAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteTour(id);
    revalidatePath("/");
    revalidatePath("/tours");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("[deleteTourAction]", err);
    return { success: false, error: "Ошибка при удалении" };
  }
}
