const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  uploadDocument,
  getDocuments,
  getDocument,
  deleteDocument,
} = require("../controllers/documentController");
const { protect } = require("../middleware/auth");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Accept PDF, text, CSV, JSON files
  const allowedMimes = [
    "application/pdf",
    "text/plain",
    "text/csv",
    "application/json",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, TXT, CSV, JSON allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

// All document routes are protected
router.post("/upload", protect, upload.single("document"), uploadDocument);
router.get("/", protect, getDocuments);
router.get("/:id", protect, getDocument);
router.delete("/:id", protect, deleteDocument);

module.exports = router;
