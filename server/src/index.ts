import express from "express";
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
const port = process.env.PORT! || 3000;
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
  socket.on("joinRoom", async (data) => {
    socket.join(data.room);
    const user = await User.findOne({ username: data.username });
    const payload = {
      userId: user?._id,
      username: user?.username,
    };
    socket.broadcast.to(data.room).emit("userJoined", payload);
    socket.on("typing", (obj) => {
      socket.broadcast.to(data.room).emit("typing", obj);
    });
    socket.on("stopTyping", (obj) => {
      socket.broadcast.to(data.room).emit("stopTyping", obj);
    });
    socket.on("send", (obj) => {
      socket.broadcast.to(data.room).emit("receive", obj);
    });
    socket.on("delete", (message) => {
      socket.broadcast.to(data.room).emit("delete", message);
    });
    socket.on("leave", (roomId) => {
      socket.broadcast.to(roomId).emit("userLeft", payload);
      socket.leave(roomId);
      socket.removeAllListeners("send");
      socket.removeAllListeners("typing");
      socket.removeAllListeners("stopTyping");
      socket.removeAllListeners("delete");
    });
  });
  io.on("disconnect", () => {});
});
server.listen(port, () => {
  console.log("Server running");
});
