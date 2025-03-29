import { Router } from "express";

import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookControler";

const router = Router();

router.route("/").get(getAllBooks).post(createBook);

router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);

export { router as bookRoutes };
