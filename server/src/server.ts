import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Server is sending test data" });
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is listening on the port ${port}...`);
});
