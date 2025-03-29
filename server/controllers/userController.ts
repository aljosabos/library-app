import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { User } from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById({ _id: req.params.id });

  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });

  res.status(StatusCodes.OK).json({ user });
};
