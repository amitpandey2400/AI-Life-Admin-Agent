const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error("Error:", err.message);

  // Default error
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Server Error",
  };

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    error.statusCode = 400;
    error.message = "Invalid ID format";
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error.statusCode = 400;
    error.message = `Duplicate field value entered`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    error.statusCode = 400;
    error.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
  });
};

module.exports = errorHandler;
