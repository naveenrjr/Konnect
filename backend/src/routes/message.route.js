import express from "express";
import { protectedRoute } from "../middleware/protected.middleware.js";
import {
  getAllUsers,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectedRoute, getAllUsers);
router.get("/:id", protectedRoute, getMessages);
router.post("/:id", protectedRoute, sendMessage);

export default router;
