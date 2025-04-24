import z from "zod";

export const profileDashboardUserSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    isAdmin: z.boolean(),
    oldPassword: z
      .string()
      .min(3, { message: "Old password must be at least 3 characters long" })
      .max(50, { message: "Old password cannot be longer than 50 characters" })
      .trim()
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(3, { message: "New password must be at least 3 characters long" })
      .max(50, { message: "New password cannot be longer than 50 characters" })
      .trim()
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) =>
      [data.oldPassword, data.password].every((el) => Boolean(el)) ||
      (!data.oldPassword && !data.password),

    {
      message: "Both old and new passwords must be provided to change password",
      path: ["password"], // show the error under the "password" field
    },
  );
