import express from "express";
import { upgradeMembership } from "../controllers/membership.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upgrade", authMiddleware, upgradeMembership);

export default router;