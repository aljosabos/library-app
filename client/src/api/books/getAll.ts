"use server";

interface ISearchBookParams {
  search?: string;
  filter: "title" | "author";
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isbn: string;
  description: string;
}

export interface IGetAllBooksResponse {
  books: IBook[];
  count: number;
}
export const getAllBooks = async (
  params: ISearchBookParams,
): Promise<IGetAllBooksResponse | undefined> => {
  try {
    const queryParams = addQueryParams(params);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/books?${queryParams}`,
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

const addQueryParams = (params: ISearchBookParams) => {
  const queryParams = new URLSearchParams({
    ...(params.search && { search: params.search }),
    filter: params.filter,
  }).toString();

  return queryParams;
};
