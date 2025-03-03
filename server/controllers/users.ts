import { Request, Response } from "express";

export const getAllUsers = (req: Request, res: Response) => {
  res.send("all update");
};

export const getUser = (req: Request, res: Response) => {
  res.send("single user");
};

export const createUser = (req: Request, res: Response) => {
  res.send(req.body);
};

export const updateUser = (req: Request, res: Response) => {
  res.send("update user");
};

export const deleteUser = (req: Request, res: Response) => {
  res.send("delete user");
};
