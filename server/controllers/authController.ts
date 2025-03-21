import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { UnauthenticatedError } from "../errors/customErrors";
import { User } from "../models/user";
import { comparePasswords, hashPassword } from "../utils/passwordUtils";
import { createJWT } from "../utils/tokenUtils";

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

  const token = createJWT({ userId: user._id.toString() });

  const oneDay = 1000 * 60 * 60 * 24;

  // add cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};
