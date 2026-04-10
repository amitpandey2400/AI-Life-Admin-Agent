const express = require("express");
const router = express.Router();
const {
  getReminders,
  getReminder,
  createReminder,
  updateReminder,
  deleteReminder,
} = require("../controllers/reminderController");
const { protect } = require("../middleware/auth");

// All reminder routes are protected
router.get("/", protect, getReminders);
router.post("/", protect, createReminder);
router.get("/:id", protect, getReminder);
router.put("/:id", protect, updateReminder);
router.delete("/:id", protect, deleteReminder);

module.exports = router;
