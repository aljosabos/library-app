import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

/**
 * This custom method removes password from the user object so its not returned in response
 * @returns user
 */
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = mongoose.model("User", UserSchema);
