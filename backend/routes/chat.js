const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");
const { protect } = require("../middleware/auth");

// All chat routes are protected
router.post("/", protect, sendMessage);

module.exports = router;
