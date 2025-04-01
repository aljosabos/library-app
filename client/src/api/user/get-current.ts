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
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
