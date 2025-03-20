import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

import { BadRequestError, NotFoundError } from "../errors/customErrors";

/**
 * This validator returns array of:
 * 1) validateValues - array of middleware functions (every body('field') is a middleware function)
 * 2) Error checking middleware that has access to API request. This middleware calls validationResult() method and checks for any errors attached to the request(validateValues). If it finds some errrors, it joins them into single string and throws an error
 * @param validateValues - array of middlewares for every field. Every midleware is specific for some field. If it finds some error in the request field, it attaches the error on the request object itself.
 * @returns [validationMiddlewares, errorCheckingMiddleware]
 */
export const validator = (validateValues: ValidationChain[]) => {
  return [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        handleErrorsByType(errorMessages);
      }
      next();
    },
  ];
};

/**
 * Throws specific error based on the message.
 * @param errorMessages string[]
 */
const handleErrorsByType = (errorMessages: string[]) => {
  const errors = errorMessages.join(", ");
  if (errorMessages[0].startsWith("No job")) {
    throw new NotFoundError(errors);
  } else {
    throw new BadRequestError(errors);
  }
};
