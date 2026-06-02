import express from "express";

import {
  getPendingTeachers,
  approveTeacher,
  suspendUser,
  getAllUsers,
} from "../controllers/admin.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { isAdmin } from "../middleware/isAdmin.js";
import { unsuspendUser } from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/pending-teachers",
  authMiddleware,
  isAdmin,
  getPendingTeachers
);

router.patch(
  "/approve/:id",
  authMiddleware,
  isAdmin,
  approveTeacher
);

router.patch(
  "/suspend/:id",
  authMiddleware,
  isAdmin,
  suspendUser
);

router.get(
  "/all-users",
  authMiddleware,
  isAdmin,
  getAllUsers
);
router.patch(
  "/unsuspend/:id",
  authMiddleware,
  isAdmin,
  unsuspendUser
);

export default router;