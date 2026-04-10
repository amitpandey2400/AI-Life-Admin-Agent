const Document = require("../models/Document");
const documentService = require("../services/documentService");
const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

// @desc    Upload and process document
// @route   POST /api/documents/upload
// @access  Private
const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    const { filename, path: filepath, mimetype } = req.file;

    logger.info("Processing document upload:", filename);

    // Process document
    const document = await documentService.processDocument(
      req.user.id,
      filename,
      filepath,
      mimetype
    );

    res.status(201).json({
      success: true,
      data: {
        id: document._id,
        filename: document.filename,
        summary: document.summary,
        important_points: document.importantPoints,
        deadlines: document.deadlines,
      },
    });
  } catch (error) {
    // Clean up file on error
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) logger.error("Error deleting file:", err);
      });
    }

    logger.error("Document upload error:", error.message);
    next(error);
  }
};

// @desc    Get user's documents
// @route   GET /api/documents
// @access  Private
const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    logger.error("Get documents error:", error.message);
    next(error);
  }
};

// @desc    Get single document
// @route   GET /api/documents/:id
// @access  Private
const getDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Check authorization
    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    logger.error("Get document error:", error.message);
    next(error);
  }
};

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Check authorization
    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Delete file
    fs.unlink(document.filepath, (err) => {
      if (err) logger.error("Error deleting file:", err);
    });

    await Document.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Document deleted",
    });
  } catch (error) {
    logger.error("Delete document error:", error.message);
    next(error);
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocument,
  deleteDocument,
};
