import mongoose from "mongoose";

import { bookGenres } from "../src/constants/bookConstants";

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: { type: String, enum: bookGenres },
  publishedYear: Number,
  isbn: String,
  description: String,
});

export const Book = mongoose.model("Book", BookSchema);
