import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDB from "./utils/db";
dotenv.config();
const port = process.env.PORT || 5000;
connectToDB();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
