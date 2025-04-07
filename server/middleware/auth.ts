import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

import { UnauthenticatedError } from "../errors/customErrors";
import { verifyJWT } from "../utils/tokenUtils";

import { validator } from "./validation/validator";

export const registerUserValidator = validator([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 3, max: 50 })
    .withMessage("Email must be between 3 and 50 characters long"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Password must be between 3 and 50 characters long"),
]);

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, isAdmin } = verifyJWT(token);
    req.user = { userId, isAdmin };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("authentication invalid");
  }
};
