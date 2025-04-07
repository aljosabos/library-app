/**
 * Logs out the user by calling the logout API and clearing cookies on the server.
 *
 * Note: This function must be used in a client-side context (e.g. inside useEffect or event handlers),
 * as server actions do not have access to browser cookies.
 *
 * The `credentials: 'include'` option is required to ensure cookies (e.g., session tokens) are sent with the request.
 *
 * @returns An object indicating whether the logout was successful.
 */

export const logoutUser = async (): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        // also must include cookies
        credentials: "include",
      },
    );

    return { success: response.ok };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
