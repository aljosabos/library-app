import { Router } from "express";

import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookControler";
import {
  createBookValidator,
  updateBookValidator,
  validateBookIdParam,
} from "../middleware/validateBook";

const router = Router();

router
  .route("/")
  .get(getAllBooks)
  .post(...createBookValidator, createBook);

router
  .route("/:id")
  .get(...validateBookIdParam, getBook)
  .patch(...validateBookIdParam, ...updateBookValidator, updateBook)
  .delete(...validateBookIdParam, deleteBook);

export { router as bookRoutes };
