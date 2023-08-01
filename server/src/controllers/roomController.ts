import Room from "../models/RoomModel";
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
      userId,
      users: [userId],
    });
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

export { createRoom, getUsers, getRooms, getMessages };
