import express from "express";

import {
  updateProfile,
  getMe,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================= PROFILE ================= */

router.put(
  "/update-profile",
  authMiddleware,
  updateProfile
);

/* ================= CURRENT USER ================= */

router.get(
  "/me",
  authMiddleware,
  getMe
);

export default router;