"use server";

import { getAuthCookie } from "utils/cookie";

export interface ICurrentUserResponse {
  _id: string;
  email: string;
  isAdmin: boolean;
}
export const getCurrentUser = async (): Promise<
  ICurrentUserResponse | undefined
> => {
  const cookie = await getAuthCookie();

  try {
    const response = await fetch(`${process.env.BASE_URL}/users/current`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
    });
    const { user } = await response.json();

    return user;
  } catch (err) {
    console.log(err);
  }
};
