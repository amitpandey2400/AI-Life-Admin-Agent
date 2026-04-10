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
      return getMockResponse(userMessage);
    }
  } catch (error) {
    logger.error("Chat service error:", error.message);
    return getMockResponse(userMessage);
  }
};

const parseResponse = (content) => {
  try {
    // Try to extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    logger.debug("Could not parse JSON from response");
  }

  // Return formatted response
  return {
    reply: content,
    tasks: [],
  };
};

const getMockResponse = (userMessage) => {
  // Mock responses for development/testing
  const mockResponses = {
    task: {
      reply: "Main karo samajh gaya! Aapke task ko maine break down kar diya. Follow karo in steps aur sab ho jayega! 💪",
      tasks: ["Task ko break down karo", "Priority set karo", "Deadlines decide karo", "Action lelo"],
    },
    help: {
      reply: "Main hoon aapka life admin assistant! Mujhe batao kya karna hai. Task banao, document upload karo, reminders set karo - sab kuch kar sakte ho! 🎯",
      tasks: ["Naya task create karo", "Document upload karo", "Reminder set karo"],
    },
    default: {
      reply: `Samajh gaya! "${userMessage}" ke liye main ideas de raha hoon...`,
      tasks: ["Step 1: Plan banao", "Step 2: Start karo", "Step 3: Complete karo"],
    },
  };

  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes("task") || lowerMessage.includes("todo")) {
    return mockResponses.task;
  } else if (lowerMessage.includes("help") || lowerMessage.includes("kya")) {
    return mockResponses.help;
  }

  return mockResponses.default;
};

module.exports = {
  generateChatResponse,
};
