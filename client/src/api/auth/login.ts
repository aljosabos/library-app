"use client";

export interface ILoginData {
  email: string;
  password: string;
}

/**
 * Logs in the user by sending credentials to the login API.
 *
 * Note: This function must be used on the client side to allow the server to set cookies in the browser.
 * Server actions do not have access to the browser environment and cannot set cookies directly.
 *
 * The `credentials: 'include'` option ensures cookies are included in the request and any cookies set by the server are stored by the browser.
 *
 * @param data - Login credentials submitted from the form.
 * @returns An object indicating whether the login was successful and any error message if applicable.
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
