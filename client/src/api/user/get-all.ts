"use server";

import { getAuthCookie } from "utils/cookie";

export interface IUser {
  _id: string;
  email: string;
  isAdmin: boolean;
}

export interface IGetAllUsersResponse {
  users: IUser[];
}
export const getAllUsers = async (): Promise<IUser[] | undefined> => {
  try {
    const cookie = await getAuthCookie();
    const response = await fetch(`${process.env.BASE_URL}/users`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
    });
    const { users } = await response.json();

    return users;
  } catch (err) {
    console.log(err);
  }
};
