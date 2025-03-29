import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Book } from "../models/book";
import { populateBooks } from "../utils/booksUtils";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    let books = await Book.find({});
    // if no books find, populate the db with fake books
    if (books.length === 0) {
      const populatedBooks = populateBooks();
      books = await Book.insertMany(populatedBooks);
    }
    res.status(StatusCodes.OK).json({ books });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getBook = async (req: Request, res: Response) => {
  res.send("single books");
};

export const createBook = async (req: Request, res: Response) => {
  res.send("create book");
};

export const updateBook = async (req: Request, res: Response) => {
  res.send("update book");
};

export const deleteBook = async (req: Request, res: Response) => {
  res.send("delete book");
};
