import { Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import Message from "../models/MessageModel";
import Room from "../models/RoomModel";

const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body;
    const { roomId } = req.params;
    const userId = req.userId;
    if (!text || !roomId) {
      return res.status(400).json({ message: "Invalid body" });
    }
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }
    const message = await Message.create({
      text,
      room: roomId,
      user: userId,
    });
    await Room.findByIdAndUpdate(roomId, {
      $push: { messages: message._id },
    });
    return res.status(201).json({ message });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { messageId } = req.params;
    const userId = req.userId;
    const message = await Message.findById(messageId).populate(
      "user",
      "-password",
    );
    if (!message) {
      return res.status(400).json({ message: "Message not found" });
    }
    const roomId = message.room;
    await Message.findByIdAndDelete(messageId);
    await Room.findOneAndUpdate(roomId, {
      $pull: { messages: messageId },
    });
    return res.status(200).json({ message: message });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export { sendMessage, deleteMessage };
