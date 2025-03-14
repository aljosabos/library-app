import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { NotFoundError } from "../errors/customErrors";
import { User } from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });

  if (!user) throw new NotFoundError(`No user with id: ${req.params.id}`);

  res.status(StatusCodes.OK).json({ user });
};

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ user });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });

  if (!user) throw new NotFoundError(`No user with id: ${req.params.id}`);

  res.status(200).json({ user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });

  if (!user) throw new NotFoundError(`No user with id: ${req.params.id}`);

  res.status(StatusCodes.OK).json({ user });
};
