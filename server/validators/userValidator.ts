import { checkSchema } from "express-validator";

export const userValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Name must be between 3 and 10 characters long",
    },
    trim: true,
    escape: true,
  },
  password: {
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Password must be between 3 and 10 characters long",
    },
    trim: true,
    escape: true,
  },
});
