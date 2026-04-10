const axios = require('axios');
const logger = require('../utils/logger');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Send a message to OpenAI and get a response
 * @param {string} userMessage - The user's message
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {Promise<string>} - AI response
 */
const getAIResponse = async (userMessage, conversationHistory = []) => {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Build messages array
    const messages = [
      {
        role: 'system',
        content: `You are an AI Life Admin Assistant. You help users with:
- Task management and organization
- Reminders and scheduling
- Document organization
- Productivity tips and time management
- Personal organization advice

Be friendly, professional, and concise. Help the user get organized and productive.`
      },
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Call OpenAI API
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: OPENAI_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    logger.info('✅ OpenAI response received successfully');
    
    return aiMessage;
  } catch (error) {
    logger.error('❌ OpenAI API Error:', error.response?.data || error.message);
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
};

module.exports = {
  getAIResponse,
};
