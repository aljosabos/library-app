import z from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" })
    .max(50, { message: "Password cannot be longer than 50 characters" })
    .trim(),
});

export type TRegisterData = z.infer<typeof registerSchema>;
