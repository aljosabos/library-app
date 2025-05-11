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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/current`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
        },
      },
    );
    const data = await response.json();

    return data?.user;
  } catch (err) {
    console.log(err);
  }
};
