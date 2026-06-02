import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

// 🔥 protected login
router.post("/login", authMiddleware, login);

export default router;