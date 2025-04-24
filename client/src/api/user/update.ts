"use server";

import { revalidatePath } from "next/cache";

import { IBook } from "@api/books/getAll";
import { getAuthCookie } from "utils/cookie";

export interface IUser {
  email: string;
  isAdmin: boolean;
  books?: IBook[];
}
export const updateUser = async (
  data: IUser & { password?: string; oldPassword?: string },
  id: string,
) => {
  const cookie = await getAuthCookie();

  const dataForUpdate = getSanitizedData(data);

  try {
    const response = await fetch(`${process.env.BASE_URL}/users/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(dataForUpdate),
    });

    const data = await response.json();

    console.log(data);

    // if (response.ok) {
    //   revalidatePath("/profile");
    // }

    if (!response.ok) {
      return {
        success: false,
        error: data.error,
      };
    }
    revalidatePath("/profile");

    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

const getSanitizedData = (
  data: IUser & { password?: string; oldPassword?: string },
) => {
  // const sanitizedBooks = data.books?.map((book) => book._id);

  const sanitizedData: Pick<IUser, "email" | "isAdmin"> & {
    password?: string;
    oldPassword?: string;
  } = {
    email: data.email,
    isAdmin: data.isAdmin,
  };

  if (data.password) {
    sanitizedData.password = data.password;
    sanitizedData.oldPassword = data.oldPassword;
  }

  addSanitazedBooksData(sanitizedData, data.books);

  return sanitizedData;
};

const addSanitazedBooksData = (
  sanitizedData: Pick<IUser, "email" | "isAdmin"> & {
    books?: string[];
    password?: string;
  },
  books?: IBook[],
) => {
  if (!books) return;
  const sanitizedBooks = books.map((book) => book._id);

  if (books.length) {
    sanitizedData.books = sanitizedBooks;
  }
};
