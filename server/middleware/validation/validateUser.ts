import { body, param } from "express-validator";
import mongoose from "mongoose";

import { BadRequestError, NotFoundError } from "../../errors/customErrors";
import { User } from "../../models/user";

import { validator } from "./validator";

export const updateUserValidator = validator([
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 3, max: 50 })
    .withMessage("Email must be between 3 and 50 characters long"),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("Password must be between 3 and 50 characters long"),
  body("newPassword")
    .optional()
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage("New password must be between 3 and 10 characters long"),
]);

/**
 * Validates a user ID parameter
 * 1. Checking if it's a valid MongoDB ObjectID
 * 2. Checks wheather a user with such ID exists
 */
export const validateUserIdParam = validator([
  param("id").custom(async (idParam) => {
    const isValidId = mongoose.Types.ObjectId.isValid(idParam);

    if (!isValidId) throw new BadRequestError(`Invalid MongoDB ${idParam}`);

    const user = await User.findById(idParam);

    if (!user) throw new NotFoundError(`No user with id ${idParam}`);
  }),
]);
