import Room from "../models/RoomModel";
import User from "../models/UserModel";
import { AuthRequest } from "../types/AuthRequest";
import { Request, Response } from "express";

const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Invalid body" });
    }
    const room = new Room({
      name,
      owner: userId,
      users: [userId],
    });
    const updateUser = await User.findByIdAndUpdate(userId, {
      $push: { rooms: room._id },
    });
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await room.save();
    return res.status(201).json({ room });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json({ rooms });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId).populate({
      path: "messages",
      populate: { path: "user", select: "username" },
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const messages = room.messages;
    return res.status(200).json({ messages });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId).populate("users", "username");
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const users = room.users;
    return res.status(200).json({ users });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const joinRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    if (!user || !room) {
      return res.status(404).json({ message: "User or room not found" });
    }
    if (room.users.includes(user._id)) {
      return res.status(200).json({ message: "User already in room" });
    }
    await Room.findByIdAndUpdate(roomId, {
      $push: { users: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { rooms: roomId },
    });
    return res.status(200).json({ message: "User joined room" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const leaveRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { rooms: roomId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let room = await Room.findById(roomId);
    if (room?.owner === userId) {
      return res.status(400).json({ message: "Owner cannot leave room" });
    }
    if (room?.users.includes(user._id) === false) {
      return res.status(200).json({ message: "User not in room" });
    }

    room = await Room.findByIdAndUpdate(roomId, {
      $pull: { users: userId },
    });
    if (!user || !room) {
      return res.status(404).json({ message: "User or room not found" });
    }
    return res.status(200).json({ message: "User left room" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
const getRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json({ room });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
export {
  createRoom,
  getUsers,
  getRooms,
  getMessages,
  joinRoom,
  leaveRoom,
  getRoom,
};
