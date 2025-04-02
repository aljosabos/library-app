"use server";

export interface ICurrentUserResponse {
  _id: string;
  email: string;
  isAdmin: boolean;
}
export const getCurrentUser = async (): Promise<
  ICurrentUserResponse | undefined
> => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/users/current`);
    const { user } = await response.json();

    return user;
  } catch (err) {
    console.log(err);
  }
};
