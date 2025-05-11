"use server";

interface ISearchBookParams {
  search?: string;
  searchBy: "title" | "author";
  page?: number;
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
  currentPage: number;
  totalBooks: number;
  numOfPages: number;
}
export const getAllBooks = async (
  params: ISearchBookParams,
): Promise<IGetAllBooksResponse | undefined> => {
  try {
    const queryParams = addQueryParams(params);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/books?${queryParams}`,
    );

    const data: IGetAllBooksResponse | undefined = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

const addQueryParams = (params: ISearchBookParams) => {
  const queryParams = new URLSearchParams({
    ...(params.search && { search: params.search }),
    searchBy: params.searchBy,
    page: String(params.page),
  }).toString();

  return queryParams;
};
