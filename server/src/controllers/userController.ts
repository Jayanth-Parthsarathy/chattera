import { Response } from "express";
import User from "../models/UserModel";
import { AuthRequest } from "../types/AuthRequest";

const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export { getProfile };
