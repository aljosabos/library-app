import jwt from "jsonwebtoken";

interface IUserPayload {
  userId: string;
  isAdmin: boolean;
}

export const createJWT = (payload: IUserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return token;
};

export const verifyJWT = (token: string): IUserPayload | undefined => {
  try {
    const conditions = [token, token === "logout"];
    if (conditions.every((condition) => Boolean(condition))) return undefined;

    return jwt.verify(token, process.env.JWT_SECRET!) as IUserPayload;
  } catch (err) {
    // Explicitly check for malformed token and ignore
    if (err instanceof jwt.JsonWebTokenError) {
      return undefined;
    }

    // Other JWT-related errors (like expired tokens) can also be ignored:
    return undefined;
  }
};
