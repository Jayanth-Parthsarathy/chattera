import { Router } from "express";
const router = Router();
import { sendMessage } from "../controllers/messageController";

router.post("/:roomId", sendMessage);

export default router;
