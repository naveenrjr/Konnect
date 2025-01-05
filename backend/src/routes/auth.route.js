import express from "express";
import {
  logout,
  signin,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protected.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", signin);

router.post("/logout", logout);

router.put("/update-profile", protectedRoute, updateProfile);

router.get("/check", protectedRoute, checkAuth);

export default router;
