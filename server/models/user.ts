import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  books: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Book",
    },
  ],
});

/**
 * This custom method removes password from the user object so its not returned in response. Also removes books array if the user is admin (since admins do not borrow books from the library)
 * @returns user
 */
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  if (user.isAdmin) {
    delete user.books;
  }

  return user;
};

export const User = mongoose.model("User", UserSchema);
