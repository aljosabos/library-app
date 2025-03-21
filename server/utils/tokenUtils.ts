import jwt from "jsonwebtoken";

interface IUserPayload {
  userId: string;
}

export const createJWT = (payload: IUserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return token;
};

export const verifyJWT = (token: string) => {
  const decodedData = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as IUserPayload;

  return decodedData;
};
