import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const comparePasswords = async (
  password: string,
  hashedPassword?: string,
) => {
  if (!hashedPassword) return false;
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};
