import express from "express";
import {
  createCourse,
  getCourses,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createCourse);
router.get("/", protect, adminOnly, getCourses);

export default router;