import dotenv from "dotenv";
import express, { Request, Response } from "express";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";

import "../db/connect";
import { connectDB } from "../db/connect";
import { testValidator } from "../middleware/validationMiddleware";
import { userRoutes } from "../routes/user";
import { CustomError } from "../types";

const app = express();

app.use(express.json());
dotenv.config();

//routes
app.use("/users", userRoutes);

app.post("/test", ...testValidator, (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ message: `Hello ${name}` });
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Route does not exist");
});

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
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is listening on the port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
