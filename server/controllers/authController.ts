import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { UnauthenticatedError } from "../errors/customErrors";
import { User } from "../models/user";
import { comparePasswords, hashPassword } from "../utils/passwordUtils";
import { createJWT } from "../utils/tokenUtils";

export const registerUser = async (req: Request, res: Response) => {
  const hashedPassword = await hashPassword(req.body.password);

  req.body.password = hashedPassword;

  const user = await User.create({ ...req.body, isAdmin: false });

  res.status(StatusCodes.CREATED).json({ user });
};

export const loginUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) throw new UnauthenticatedError("Invalid credentials");

  const isPasswordCorrect = await comparePasswords(
    req.body.password,
    user.password!
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError("Password is wrong");

  const token = createJWT({
    userId: user._id.toString(),
    isAdmin: user.isAdmin,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  // add cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ user });
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};
