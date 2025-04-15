"use server";

import { IBook } from "@api/books/getAll";
import { getAuthCookie } from "utils/cookie";

export interface IUser {
  _id: string;
  email: string;
  isAdmin: boolean;
  books: IBook[];
}
export const getUser = async (id: string): Promise<IUser | undefined> => {
  const cookie = await getAuthCookie();

  try {
    const response = await fetch(`${process.env.BASE_URL}/users/${id}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
    });
    const { user } = await response.json();

    console.log(" GET USER", user);

    return user;
  } catch (err) {
    console.log(err);
  }
};
