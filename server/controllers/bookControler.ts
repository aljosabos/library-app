import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Book } from "../models/book";
import { ISearchBookParams } from "../types";
import { getBooksSearchQuery, seedBooksIfEmpty } from "../utils/booksUtils";

/**
 * Retrieves books from the DB.
 * If no books are found, it populates the database with mock books and returns them.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getAllBooks = async (
  req: Request<unknown, unknown, unknown, ISearchBookParams>,
  res: Response
) => {
  try {
    const { filter, search, page = 1, limit = 10 } = req.query;
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);
    const skip = (parsedPage - 1) * parsedLimit;

    await seedBooksIfEmpty();

    // Build search query
    const searchQuery = getBooksSearchQuery(filter, search);

    const [books, totalBooks] = await Promise.all([
      Book.find(searchQuery).skip(skip).limit(parsedLimit),
      Book.countDocuments(searchQuery),
    ]);
    const numOfPages = Math.ceil(totalBooks / parsedLimit);

    res.status(StatusCodes.OK).json({
      books,
      currentPage: parsedPage,
      totalBooks,
      numOfPages,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

export const getBook = async (req: Request, res: Response) => {
  const book = await Book.findById({ _id: req.params.id });

  res.status(StatusCodes.OK).json({ book });
};

export const createBook = async (req: Request, res: Response) => {
  const book = await Book.create(req.body);

  res.status(StatusCodes.CREATED).json({ book });
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ book });
};

export const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.findOneAndDelete({ _id: req.params.id });

  res.status(StatusCodes.OK).json({ book });
};
