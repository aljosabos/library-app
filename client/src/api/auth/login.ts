export interface ILoginData {
  email: string;
  password: string;
}

/**
 * This function login the user. Must be converted to regular API function in order to create cookie in the browser (since server actions do not add cookie in the browser). Must use credentials: 'include'
 * @param data login data from the form
 * @returns
 */
export const loginUser = async (data: ILoginData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: result.error,
    };
  }

  return {
    success: true,
  };
};
