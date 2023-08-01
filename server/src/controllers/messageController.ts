import { Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import Message from "../models/MessageModel";

const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body;
    const { roomId } = req.params;
    const userId = req.userId;
    if (!text || !roomId) {
      return res.status(400).json({ message: "Invalid body" });
    }
    const message = await Message.create({
      text,
      roomId,
      userId,
    });
    return res.status(201).json({ message });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export { sendMessage };
