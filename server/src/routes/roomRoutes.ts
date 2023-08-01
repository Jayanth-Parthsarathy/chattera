import { Router } from "express";

import {
  createRoom,
  getMessages,
  getRooms,
  getUsers,
} from "../controllers/roomController";
import protect from "../middleware/authMiddleware";
const router = Router();

router.post("/create", protect, createRoom);
router.get("/", protect, getRooms);
router.get("/getusers/:roomId", protect, getUsers);
router.get("/getmessages/:roomId", protect, getMessages);
export default router;
