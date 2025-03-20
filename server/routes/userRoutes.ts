import { Router } from "express";

import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController";
import {
  updateUserValidator,
  validateIdParam,
} from "../middleware/validateUser";

const router = Router();

router.route("/").get(getAllUsers);

router
  .route("/:id")
  .get(...validateIdParam, getUser)
  .patch(...updateUserValidator, ...validateIdParam, updateUser)
  .delete(...validateIdParam, deleteUser);

export default router;
