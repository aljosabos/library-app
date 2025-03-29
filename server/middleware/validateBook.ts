import { body, param } from "express-validator";
import mongoose from "mongoose";

import { BadRequestError, NotFoundError } from "../errors/customErrors";
import { Book } from "../models/book";
import { bookGenres } from "../src/constants/bookConstants";

import { validator } from "./validator";

// Base validators

const titleValidator = body("title").trim().notEmpty();
const authorValidator = body("author").trim().notEmpty();
const genreValidator = body("genre").isIn(bookGenres);
const yearValidator = body("publishedYear")
  .trim()
  .notEmpty()
  .isNumeric()
  .isInt({ min: 1800, max: 2025 });

const descriptionValidator = body("description")
  .notEmpty()
  .isLength({ min: 50, max: 500 });

const isbnValidator = body("isbn").notEmpty().isLength({ min: 50, max: 500 });

// Create book validator (all required)
export const createBookValidator = validator([
  titleValidator.withMessage("Title is required"),
  authorValidator.withMessage("Author is required"),
  genreValidator.withMessage(`Genre must be one of: ${bookGenres.join(", ")}`),
  yearValidator.withMessage("Year must be a number between 1800 and 2025"),
  descriptionValidator.withMessage("Description must be 50-500 characters"),
  isbnValidator.withMessage("Invalid ISBN format"),
]);

// Update book validator (all optional)
export const updateBookValidator = validator([
  titleValidator.optional(),
  authorValidator.optional(),
  genreValidator.optional(),
  yearValidator.optional(),
  descriptionValidator.optional(),
  isbnValidator.optional(),
]);

/**
 * Validates a book ID parameter
 * 1. Checking if it's a valid MongoDB ObjectID
 * 2. Checks wheather a book with such ID exists
 */
export const validateBookIdParam = validator([
  param("id").custom(async (idParam) => {
    const isValidId = mongoose.Types.ObjectId.isValid(idParam);

    if (!isValidId) throw new BadRequestError(`Invalid MongoDB ${idParam}`);

    const book = await Book.findById(idParam);

    if (!book) throw new NotFoundError(`No book with id ${idParam}`);
  }),
]);
