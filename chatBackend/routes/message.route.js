import express from "express";
import { protectRotue } from "../middleware/auth.middleware.js";
import { getUserForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRotue, getUserForSidebar);
router.get("/:id",protectRotue, getMessages);

router.post("/send/:id", protectRotue, sendMessage);

export default router;