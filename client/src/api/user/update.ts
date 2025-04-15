"use server";

import { IBook } from "@api/books/getAll";
import { getAuthCookie } from "utils/cookie";

export interface IUser {
  _id: string;
  email: string;
  isAdmin: boolean;
  books: IBook[];
}
export const updateUser = async (
  data: IUser & { password?: string },
  id: string,
) => {
  const cookie = await getAuthCookie();

  const dataForUpdate = getSanitizedData(data);

  try {
    await fetch(`${process.env.BASE_URL}/users/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(dataForUpdate),
    });
  } catch (err) {
    console.log(err);
  }
};

const getSanitizedData = (data: IUser & { password?: string }) => {
  const sanitizedBooks = data.books.map((book) => book._id);

  const sanitizedData: Pick<IUser, "email" | "isAdmin"> & {
    books: string[];
    password?: string;
  } = {
    email: data.email,
    isAdmin: data.isAdmin,
    books: sanitizedBooks,
  };

  if (data.password) {
    sanitizedData.password = data.password;
  }

  return sanitizedData;
};
