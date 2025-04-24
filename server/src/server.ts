import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";

import "../db/connect";
import { connectDB } from "../db/connect";
import { authRoutes } from "../routes/authRoutes";
import { bookRoutes } from "../routes/bookRoutes";
import { userRoutes } from "../routes/userRoutes";
import { CustomError } from "../types";
import { seedUsers } from "../utils/seed";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3015",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

// 404 Handler
app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Route does not exist");
});

// Global Error Handler
app.use((err: CustomError, req: Request, res: Response) => {
  console.log(err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const getErrorMessage = () => err.message || "Something went wrong";
  const msg = getErrorMessage();

  res.status(statusCode).json({ msg });
});

const start = async () => {
  try {
    await connectDB();
    await seedUsers();

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is listening on the port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
