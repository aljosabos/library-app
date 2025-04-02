import { Router } from "express";

import {
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUser,
  updateUser,
} from "../controllers/userController";
import { authenticateUser } from "../middleware/auth";
import {
  updateUserValidator,
  validateUserIdParam,
} from "../middleware/validation/validateUser";

const router = Router();

router.route("/").get(authenticateUser, getAllUsers);
router.route("/current").get(getCurrentUser);

router
  .route("/:id")
  .get(authenticateUser, ...validateUserIdParam, getUser)
  .patch(
    authenticateUser,
    ...validateUserIdParam,
    ...updateUserValidator,
    updateUser
  )
  .delete(authenticateUser, ...validateUserIdParam, deleteUser);

export { router as userRoutes };
