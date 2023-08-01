import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/UserModel";

const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, avatar } = req.body;
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "Email, username and password required" });
    }
    const userExists = await User.findOne({ email });
    const userExists2 = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (userExists2) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      avatar,
    });
    await user.save();
    return res.status(201).json({ message: "User created" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "60d",
    });
    return res.status(200).json({ token });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export { register, login };
