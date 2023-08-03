import { Router } from "express";
const router = Router();
import { sendMessage } from "../controllers/messageController";
import protect from "../middleware/authMiddleware";

router.post("/:roomId", protect, sendMessage);

export default router;
