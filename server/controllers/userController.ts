import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { User } from "../models/user";
import { handleReturnCurrentUser } from "../utils/userUtils";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).populate("books");
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

/**
 * Returns single user by its id
 * @param req Request
 * @param res Response
 */
export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById({ _id: req.params.id }).populate("books");

  res.status(StatusCodes.OK).json({ user });
};

/**
 * Returns currently logged in user or null (used for FE auth checks)
 * @param req Request
 * @param res Response
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(StatusCodes.OK).json({ user: null });
    return;
  }

  await handleReturnCurrentUser(token, res);
};

export const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  ).populate("books");

  res.status(StatusCodes.OK).json({ user: updatedUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });

  res.status(StatusCodes.OK).json({ user });
};

// keep this in case of need for updating just books
export const addBookToUser = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { books: bookId } },
      { new: true }
    ).populate("books");

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

// keep this in case of need for updating just bookss
export const removeBookFromUser = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { books: bookId } },
      { new: true }
    ).populate("books");

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};
