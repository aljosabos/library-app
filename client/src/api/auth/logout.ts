/**
 * This function logout the user by clearing cookie. It must be converted to regular API function since the server actions do not have access to the browser and cookies. It must also include credentials: 'include'
 * @returns {success: boolean}
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
