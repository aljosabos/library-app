import express from "express";
import { userRoutes } from "../routes/user";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "Server is sending test data" });
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is listening on the port ${port}...`);
});
