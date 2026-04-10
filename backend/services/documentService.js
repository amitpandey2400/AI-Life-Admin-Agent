const pdfParse = require("pdf-parse");
const fs = require("fs");
const logger = require("../utils/logger");
const Document = require("../models/Document");

const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } catch (error) {
    logger.error("PDF parsing error:", error.message);
    throw error;
  }
};

const processDocument = async (userId, filename, filepath, mimetype) => {
  try {
    let extractedText = "";

    // Extract text based on file type
    if (mimetype === "application/pdf") {
      extractedText = await extractTextFromPDF(filepath);
    } else if (
      mimetype === "text/plain" ||
      mimetype === "text/csv" ||
      mimetype === "application/json"
    ) {
      extractedText = fs.readFileSync(filepath, "utf-8");
    }

    // Generate summary and extract key info
    const summary = generateSummary(extractedText);
    const importantPoints = extractKeyPoints(extractedText);
    const deadlines = extractDeadlines(extractedText);

    // Create document record
    const document = await Document.create({
      userId,
      filename,
      filepath,
      mimetype,
      summary,
      importantPoints,
      deadlines,
      extractedText: extractedText.substring(0, 5000), // Store first 5000 chars
      processed: true,
    });

    logger.info("Document processed successfully:", filename);
    return document;
  } catch (error) {
    logger.error("Document processing error:", error.message);
    throw error;
  }
};

const generateSummary = (text) => {
  // Simple summary generation - takes first 500 chars as preview
  const summary = text.substring(0, 300).trim();
  return summary + (text.length > 300 ? "..." : "");
};

const extractKeyPoints = (text) => {
  const points = [];
  const lines = text.split("\n").slice(0, 10);

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.length > 10 && trimmed.length < 200) {
      points.push(trimmed);
    }
  });

  return points.slice(0, 5);
};

const extractDeadlines = (text) => {
  const deadlines = [];
  // Simple date pattern matching (YYYY-MM-DD or DD-MM-YYYY or DD/MM/YYYY)
  const datePatterns = [
    /\d{4}-\d{2}-\d{2}/g,
    /\d{2}\/\d{2}\/\d{4}/g,
    /\d{2}-\d{2}-\d{4}/g,
  ];

  datePatterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        try {
          const date = new Date(match);
          if (!isNaN(date.getTime()) && date > new Date()) {
            deadlines.push(date);
          }
        } catch (e) {
          // Skip invalid dates
        }
      });
    }
  });

  // Remove duplicates
  return [...new Set(deadlines.map((d) => d.toISOString()))].map(
    (d) => new Date(d)
  );
};

module.exports = {
  extractTextFromPDF,
  processDocument,
};
