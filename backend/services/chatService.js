const logger = require("../utils/logger");
const { getAIResponse } = require("./aiService");

const generateChatResponse = async (userMessage) => {
  try {
    // Use the OpenAI service we created
    const reply = await getAIResponse(userMessage);
    
    return {
      reply: reply,
      tasks: []
    };
  } catch (error) {
    logger.error("Chat error:", error.message);
    
    // Fallback mock response
    return getMockResponse(userMessage);
  }
};

const getMockResponse = (userMessage) => {
  logger.warn("Using mock response (OpenAI not configured)");
  
  return {
    reply: `Thanks for your message: "${userMessage}". I'm learning how to respond better. Please set up OpenAI API key for full functionality.`,
    tasks: []
  };
};

module.exports = {
  generateChatResponse,
};
