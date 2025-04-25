import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";

import { User } from "../models/user";
import { hashPassword } from "../utils/passwordUtils";
import {
  checkIsOldPasswordCorrect,
  getHashedPasswordFromDB,
  handleReturnCurrentUser,
} from "../utils/userUtils";

export interface IUser {
  isAdmin: boolean;
  books: Types.ObjectId[];
  email?: string | null | undefined;
  password?: string | null | undefined;
}

/**
 * Returns the list of all users. Must be authenticated as admin to get the data
 * @param req Request
 * @param res Response
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user?.isAdmin;
    if (!isAdmin) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Not authorized to view all users" });
    }
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
 * Public endpoint that returns currently logged in user (used for FE auth checks)
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

/**
 *
 * @param req Request
 * @param res Response
 * @returns Updates the user. This request can be performed by admin or by regular user.
 */
export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.userId);
  const isAdmin = user?.isAdmin;

  console.log("user", user);

  if (isAdmin) {
    console.log("update by admin");
    await handleUpdateByAdmin(req, res);
    return;
  } else {
    await handleUpdateByRegularUser(req, res, user);
  }
};

/**
 * This function handles update performed by admin. The admin can update any user as well as his password without providing the old password.
 * @param req Request
 * @param res Response
 */
const handleUpdateByAdmin = async (req: Request, res: Response) => {
  const { password } = req.body;

  if (password) {
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  ).populate("books");

  res.status(StatusCodes.OK).json({ user: updatedUser });
};

/**
 * This function handles update performed by regular user. Regular user can update only himself and must provide both old and new password
 * @param req Request
 * @param res Response
 */

// Todo: Refactor this function to has less complexity
// eslint-disable-next-line complexity
const handleUpdateByRegularUser = async (
  req: Request,
  res: Response,
  user: IUser | null
) => {
  const { oldPassword, password } = req.body;

  // If the user wants to change password, oldPassword must be provided and correct
  if (password) {
    if (!oldPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "You must provide your old password to set a new one",
      });
    }
    const oldHashedPassword = getHashedPasswordFromDB(user);

    const isOldPasswordCorrect = await checkIsOldPasswordCorrect(
      oldPassword,
      oldHashedPassword
    );

    if (!isOldPasswordCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Incorrect old password" });
    }

    // Hash and replace password
    const hashedNewPassword = await hashPassword(password);
    req.body.password = hashedNewPassword;
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user?.userId },
    req.body,
    { new: true }
  ).populate("books");

  res.status(StatusCodes.OK).json({ user: updatedUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });

  res.status(StatusCodes.OK).json({ user });
};

//////////////////////////////////////////////////////////////////////
// keep this in case of need for updating just books without the user
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

// keep this in case of need for updating just books without the user
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
