export interface CustomError extends Error {
  statusCode?: number;
}

export interface ISearchBookParams {
  search?: string;
  searchBy: string;
  page: number;
  limit?: number;
}
