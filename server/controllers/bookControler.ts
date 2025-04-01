import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Book } from "../models/book";
import { ISearchBookParams } from "../types";
import { getBookSearchObj, generateMockBooks } from "../utils/booksUtils";

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
    let books;

    const hasBooks = (await Book.countDocuments()) > 0;

    if (!hasBooks) {
      const mockBooks = generateMockBooks();
      books = await Book.insertMany(mockBooks);
    } else {
      const { filter, search } = req.query;

      const searchObj = getBookSearchObj(filter, search);

      books = await Book.find(searchObj);
    }
    res.status(StatusCodes.OK).json({ books, count: books.length });
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
