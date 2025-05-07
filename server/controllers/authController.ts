import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { User } from "../models/user";
import { comparePasswords, hashPassword } from "../utils/passwordUtils";
import { createJWT } from "../utils/tokenUtils";

export const registerUser = async (req: Request, res: Response) => {
  const email = req.body.email;

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "User with this email already exists" });
    return;
  }

  const hashedPassword = await hashPassword(req.body.password);

  req.body.password = hashedPassword;

  const user = await User.create({ ...req.body, isAdmin: false });

  res.status(StatusCodes.CREATED).json({ user });
};

export const loginUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid credentials" });
    return;
  }

  const isPasswordCorrect = await comparePasswords(
    req.body.password,
    user.password!
  );

  if (!isPasswordCorrect) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Password is wrong" });
    return;
  }

  const token = createJWT({
    userId: user._id.toString(),
    isAdmin: user.isAdmin,
  });

  const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  // add cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
    secure: process.env.NODE_ENV !== "development",
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
