import express from "express";
import {
  createLecture,
  getMyLectures,
  getAllLectures,
} from "../controllers/lectureController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.get("/", protect, adminOnly, getAllLectures);
router.post("/", protect, adminOnly, createLecture);
router.get("/my", protect, getMyLectures);

export default router;