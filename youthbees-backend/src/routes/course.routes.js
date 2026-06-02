import express from "express";

import {
  createCourse,
  getMyCourses,
  updateCourse,
  getSingleCourse,
  getAllCourses,
} from "../controllers/course.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  purchaseCourse,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createCourse);

router.get("/my-courses", authMiddleware, getMyCourses);

router.put("/update/:id", authMiddleware, updateCourse);
router.get("/:id", getSingleCourse);
router.get("/", getAllCourses);
router.post(
  "/purchase",
  authMiddleware,
  purchaseCourse
);

export default router;