"use server";

import { getCurrentUser } from "@/api/user/get-current";

export const getCurrentUserAction = async () => {
  const response = await getCurrentUser();
  return response;
};
