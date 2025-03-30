export interface CustomError extends Error {
  statusCode?: number;
}

export interface ISearchBookParams {
  search?: string;
  filter: string;
}
