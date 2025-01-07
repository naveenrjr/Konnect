import express from "express";
import { protectedRoute } from "../middleware/protected.middleware.js";
import {
  getMessages,
  sendMessage,
  getAllUsers,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectedRoute, getAllUsers);
router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
