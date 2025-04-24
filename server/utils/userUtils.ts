import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUser } from "../controllers/userController";
import { User } from "../models/user";

import { comparePasswords } from "./passwordUtils";
import { verifyJWT } from "./tokenUtils";

/**
 * Checks authentication status and returns the current user if a valid JWT token exists.
 *
 * This endpoint serves as an auth status check for the frontend by:
 * 1. Verifying the HttpOnly cookie token (inaccessible to frontend JavaScript)
 * 2. Returning either:
 *    - The authenticated user (without sensitive fields like password)
 *    - null if no valid session exists
 *
 * Frontend usage:
 * - Call this endpoint on app load/login state changes
 * - Check response.user to determine auth state
 * - Handle null responses by showing guest UI
 *
 * Security:
 * - Relies on HttpOnly cookies for JWT storage (XSS protection)
 * - Automatically handles token expiration/revocation
 *
 * @param {string} token - JWT from HttpOnly cookie
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Sends either:
 *   - 200 OK with { user: UserDto } for authenticated sessions
 *   - 200 OK with { user: null } for invalid/missing tokens
 * @param token string;
 * @param res Response
 * @returns Promise<void>
 */
export const handleReturnCurrentUser = async (
  token: string,
  res: Response
): Promise<void> => {
  const payload = verifyJWT(token);

  if (!payload?.userId) {
    res.status(StatusCodes.OK).json({ user: null });
    return;
  }

  const user = await User.findById(payload.userId);

  if (!user) {
    res.status(StatusCodes.OK).json({ user: null });
    return;
  }

  res.status(StatusCodes.OK).json({ user });
};

export const checkIsOldPasswordCorrect = async (
  password: string,
  dbPassword?: string
) => {
  const isOldPasswordCorrect = await comparePasswords(password, dbPassword);

  return isOldPasswordCorrect;
};

/**
 * This function is used just to decrease complexity
 * @param user IUser | null
 * @returns boolean
 */
export const getHashedPasswordFromDB = (user: IUser | null) =>
  user?.password ?? undefined;
