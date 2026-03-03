"use server";

import { revalidatePath } from "next/cache";
import {
  createGuide,
  deleteGuide,
  updateGuide,
  CreateGuideInput,
} from "@/lib/tours-repository";

export interface SaveGuideResult {
  success: boolean;
  guideId?: number;
  error?: string;
}

export async function saveGuideAction(
  input: CreateGuideInput
): Promise<SaveGuideResult> {
  try {
    const guide = await createGuide(input);
    revalidatePath("/admin/guides");
    revalidatePath("/admin/tours/create");
    revalidatePath("/tours");
    return { success: true, guideId: guide.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[saveGuideAction]", err);
    return { success: false, error: message };
  }
}

export async function updateGuideAction(
  id: number,
  input: Partial<CreateGuideInput>
): Promise<SaveGuideResult> {
  try {
    const guide = await updateGuide(id, input);
    revalidatePath("/admin/guides");
    revalidatePath("/admin/tours/create");
    revalidatePath("/tours");
    return { success: true, guideId: guide.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[updateGuideAction]", err);
    return { success: false, error: message };
  }
}

export async function deleteGuideAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteGuide(id);
    revalidatePath("/admin/guides");
    revalidatePath("/admin/tours/create");
    revalidatePath("/tours");
    return { success: true };
  } catch (err) {
    console.error("[deleteGuideAction]", err);
    return { success: false, error: "Ошибка при удалении" };
  }
}
