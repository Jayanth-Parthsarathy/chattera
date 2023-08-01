import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./utils/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import messageRoutes from "./routes/messageRoutes";
dotenv.config();
const port = process.env.PORT || 5000;
connectToDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/room", roomRoutes);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
