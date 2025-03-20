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
 * This middleware is used to validate the id parameter of the request.
 *
 */
export const validateIdParam = validator([
  param("id").custom(async (idParam) => {
    handleIdParamValidation(idParam);

    const job = await User.findById(idParam);

    if (!job) throw new NotFoundError(`No job with id ${idParam}`);
  }),
]);

const handleIdParamValidation = (id: string) => {
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) throw new BadRequestError(`Invalid MongoDB ${id}`);
};
