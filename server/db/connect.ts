import mongoose from "mongoose";

export const connectDB = () =>
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log("CONNECTED TO THE DB..."))
    .catch((err) => console.log(err));
