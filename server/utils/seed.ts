import { User } from "../models/user";

import { hashPassword } from "./passwordUtils";

export const seedUsers = async () => {
  const usersToSeed = [
    { email: "admin@admin.com", password: "admin", isAdmin: true },
    { email: "user@user.com", password: "user", isAdmin: false },
  ];

  for (const userData of usersToSeed) {
    const existingUser = await User.findOne({ email: userData.email });

    if (!existingUser) {
      const hashedPassword = await hashPassword(userData.password);
      await User.create({ ...userData, password: hashedPassword });
      console.log(`Created user: ${userData.email}`);
    }
  }
};
