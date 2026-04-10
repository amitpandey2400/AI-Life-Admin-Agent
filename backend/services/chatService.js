const { Configuration, OpenAIApi } = require("openai");
const logger = require("../utils/logger");

// If using the new SDK:
let openai;

try {
  // Try new SDK first (openai >= 4.0.0)
  const OpenAI = require("openai").default || require("openai");
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (e) {
  logger.warn("New OpenAI SDK not available, skipping initialization");
}

const generateChatResponse = async (userMessage) => {
  try {
    if (!openai && !process.env.OPENAI_API_KEY) {
      logger.warn("OpenAI API key not configured, returning mock response");
      return getMockResponse(userMessage);
    }

    const systemPrompt = `You are a helpful AI Life Admin Assistant. Your role is:
1. Help break down tasks into actionable steps
2. Explain things in simple Hinglish (mix of Hindi and English)
3. Provide structured responses

Always respond with JSON containing:
{
  "reply": "Your helpful response in Hinglish",
  "tasks": ["step1", "step2", "step3"]
}`;

    if (openai) {
      // New SDK
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const content = response.choices[0].message.content;
      return parseResponse(content);
    } else {
      // Fallback to mock response
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
