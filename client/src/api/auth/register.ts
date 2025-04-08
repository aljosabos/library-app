"use server";

export interface IRegisterData {
  email: string;
  password: string;
}

/**
 *
 * @param data - Register credentials submitted from the form.
 * @returns An object indicating whether the register was successful and any error message if applicable.
 */
export const registerUser = async (data: IRegisterData) => {
  const response = await fetch(`${process.env.BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

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
