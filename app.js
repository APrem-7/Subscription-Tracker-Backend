import express from "express";
import { PORT } from "./env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to your first ever handwritten backend get req");
});

app.listen(PORT, () => {
  console.log("Subscription Tracker API is running on PORT 3000  ");
});

export default app;
