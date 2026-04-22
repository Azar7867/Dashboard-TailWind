const express = require("express");
const {
  createNotification,
  getNotifications,
  deleteNotification,
  clearNotifications,
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/", createNotification);
router.get("/", getNotifications);
router.delete("/:id", deleteNotification);
router.delete("/", clearNotifications);

module.exports = router;