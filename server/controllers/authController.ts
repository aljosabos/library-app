import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { UnauthenticatedError } from "../errors/customErrors";
import { User } from "../models/user";
import { comparePasswords, hashPassword } from "../utils/passwordUtils";

export const registerUser = async (req: Request, res: Response) => {
  const hashedPassword = await hashPassword(req.body.password);

  req.body.password = hashedPassword;

  await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

export const loginUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ name: req.body.name });

  if (!user) throw new UnauthenticatedError("Invalid credentials");

  const isPasswordCorrect = await comparePasswords(
    req.body.password,
    user.password!
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError("Password is wrong");

  res.send("login");
};
