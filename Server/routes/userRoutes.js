import express from "express";
import { getInstructors } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/instructors", protect, adminOnly, getInstructors);

export default router;