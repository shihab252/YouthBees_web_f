import express from "express";

import {
  createService,
  getServices,
  getServiceBySlug,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

const router = express.Router();

router.post(
  "/create",
  createService
);

router.get("/", getServices);

router.get(
  "/:slug",
  getServiceBySlug
);
router.put(
  "/:id",
  updateService
);

router.delete(
  "/:id",
  deleteService
);

export default router;