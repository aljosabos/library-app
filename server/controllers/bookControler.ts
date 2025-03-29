import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Book } from "../models/book";
import { populateBooks } from "../utils/booksUtils";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    let books = await Book.find({});
    // if no books are found, populate the db with fake books
    if (books.length === 0) {
      const populatedBooks = populateBooks();
      books = await Book.insertMany(populatedBooks);
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
