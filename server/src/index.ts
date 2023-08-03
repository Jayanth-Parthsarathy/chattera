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
import User from "./models/UserModel";
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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/room", roomRoutes);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joinRoom", async (data) => {
    socket.join(data.roomId);
    const user = await User.findOne({ username: data.username });
    const payload = {
      userId: user?._id,
      username: user?.username,
    };
    io.to(data.roomId).emit("userJoined", payload);
    socket.on("send", (data) => {
      const payload = {
        user: {
          username: data.username,
        },
        text: data.text,
      };
      socket.broadcast.to(data.roomId).emit("receive", payload);
    });
    socket.on("leave", () => {
      io.to(data.roomId).emit("userLeft", payload);
      socket.leave(data.roomId);
    });
  });
});
server.listen(port, () => {
  console.log("Server running on port " + port);
});
