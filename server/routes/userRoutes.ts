import { Router } from "express";

import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController";
import {
  updateUserValidator,
  validateUserIdParam,
} from "../middleware/validateUser";

const router = Router();

router.route("/").get(getAllUsers);

router
  .route("/:id")
  .get(...validateUserIdParam, getUser)
  .patch(...updateUserValidator, ...validateUserIdParam, updateUser)
  .delete(...validateUserIdParam, deleteUser);

export { router as userRoutes };
