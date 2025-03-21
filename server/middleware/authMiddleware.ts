import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

import { UnauthenticatedError } from "../errors/customErrors";
import { verifyJWT } from "../utils/tokenUtils";

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

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  try {
    const { userId } = verifyJWT(token);
    req.user = { userId };
    next();
  } catch (err) {
    console.log(err);
    if (!token) throw new UnauthenticatedError("Authentication invalid");
  }
};
