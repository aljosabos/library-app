import { body, param } from "express-validator";
import mongoose from "mongoose";

import { BadRequestError, NotFoundError } from "../errors/customErrors";
import { User } from "../models/user";

import { validator } from "./validator";

export const updateUserValidator = validator([
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("Name must be between 3 and 10 characters long"),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("Password must be between 3 and 10 characters long"),
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

    if (!user) throw new NotFoundError(`No book with id ${idParam}`);
  }),
]);
