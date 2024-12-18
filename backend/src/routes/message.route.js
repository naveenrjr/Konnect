import express from "express";
import { protectedRoute } from "../middleware/protected.middleware.js";
import { getAllUsers } from "../controllers/message.controller.js";

const router = express.router();


router.get("/users",protectedRoute,getAllUsers)


export default router;