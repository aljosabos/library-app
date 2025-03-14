import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

import { BadRequestError } from "../errors/customErrors";

/**
 * 
 * @param validateValues - Array of rules for every field. 
 * @returns - In case of errors, it returns ValidationChain[] which is array of validation chain objects. Example of one ValidationChain would be:
 body("name").notEmpty().withMessage("name is required")

 Example of ValidationChain[] (array) would be: 
 [
  body("name").notEmpty().withMessage("name is required"),
  body("email").notEmpty().withMessage("email is required").isEmail(),
].
In case of 

 * 
 */
const validator = (validateValues: ValidationChain[]) => {
  return [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      console.log(errors);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages.join(", "));
      }
      next();
    },
  ];
};



export const testValidator = validator([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("Name must be between 3 and 10 characters long")
    .trim(),
]);
