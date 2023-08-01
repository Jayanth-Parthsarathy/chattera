import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./utils/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import messageRoutes from "./routes/messageRoutes";
import http from "http";
import { Server } from "socket.io";
dotenv.config();
const port = process.env.PORT || 5000;
connectToDB();

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/room", roomRoutes);
io.on("connection", (socket) => {
  console.log("a user connected");
});
server.listen(port, () => {
  console.log("Server running on port " + port);
});
