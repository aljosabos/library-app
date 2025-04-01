"use server";

import { revalidatePath } from "next/cache";

import { getAllBooks } from "@/api/books/getAll";

interface IBookQuery {
  search?: string;
  filter: "title" | "author";
}

export const getAllBooksAction = async (query: IBookQuery) => {
  const response = await getAllBooks(query);
  revalidatePath(`${process.env.BASE_URL}/books`);
  return response;
};
