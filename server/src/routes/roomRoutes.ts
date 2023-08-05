import { Router } from "express";

import {
  createRoom,
  getMessages,
  getRooms,
  getUsers,
  joinRoom,
  leaveRoom,
  getRoom,
} from "../controllers/roomController";
import protect from "../middleware/authMiddleware";
const router = Router();

router.post("/create", protect, createRoom);
router.get("/:roomId", getRoom);
router.get("/", getRooms);
router.get("/getusers/:roomId", protect, getUsers);
router.get("/getmessages/:roomId", protect, getMessages);
router.post("/join/:roomId", protect, joinRoom);
router.post("/leave/:roomId", protect, leaveRoom);
export default router;
