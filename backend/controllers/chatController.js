const chatService = require("../services/chatService");
const logger = require("../utils/logger");

// @desc    Send chat message and get AI response
// @route   POST /api/chat
// @access  Private
const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message",
      });
    }

    logger.info("Processing chat message from user:", req.user.id);

    // Generate response using chat service
    const response = await chatService.generateChatResponse(message);

    // Ensure response has required structure
    const formattedResponse = {
      reply: response.reply || "Sorry, I couldn't process that. Please try again.",
      tasks: response.tasks || [],
    };

    res.status(200).json({
      success: true,
      data: formattedResponse,
    });
  } catch (error) {
    logger.error("Chat error:", error.message);
    next(error);
  }
};

module.exports = {
  sendMessage,
};
