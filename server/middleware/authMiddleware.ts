import { body } from "express-validator";

import { validator } from "./validator";

export const registerUserValidator = validator([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("Name must be between 3 and 10 characters long"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("Password must be between 3 and 10 characters long"),
]);
