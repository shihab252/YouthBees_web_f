import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import {
  getTeacherAnalytics,
} from "../controllers/teacher.controller.js";

import {
  getTeacherStudents,
} from "../controllers/teacherStudents.controller.js";

const router = express.Router();

/* ================= ANALYTICS ================= */

router.get(
  "/analytics",
  authMiddleware,
  getTeacherAnalytics
);

/* ================= STUDENTS ================= */

router.get(
  "/students",
  authMiddleware,
  getTeacherStudents
);

export default router;