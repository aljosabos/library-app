import { cookies } from "next/headers";

export const getAuthCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const cookie = `token=${token}`;

  return cookie;
};
