import express from "express";
import {
  createNotification,
  getNotifications,
  deleteNotification,
  clearNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/", getNotifications);
router.delete("/:id", deleteNotification);
router.delete("/", clearNotifications);

export default router;