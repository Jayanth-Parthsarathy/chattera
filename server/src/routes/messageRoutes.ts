import { Router } from "express";
const router = Router();
import { deleteMessage, sendMessage } from "../controllers/messageController";
import protect from "../middleware/authMiddleware";

router.post("/:roomId", protect, sendMessage);
router.delete("/:messageId", protect, deleteMessage);

export default router;
