"use server";

import { revalidatePath } from "next/cache";

/**
 * Custom server action to revalidate a given path.
 * This function is used in client components since `revalidatePath()` cannot be called directly within them.
 *
 * @param path - The path that needs to be revalidated.
 */
export const revalidate = async (path: string) => {
  revalidatePath(path);
};
