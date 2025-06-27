const axios = require('axios');
const AppError = require('../utils/errorHandler');
let requestCount = 0;

exports.getCourseRecommendations = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Check prompt
    if (!prompt) {
      return next(new AppError('Please provide a prompt', 400));
    }

    // Enforce request limit
    if (requestCount >= 250) {
      return next(new AppError('OpenAI API request limit reached', 429));
    }

    requestCount++;
    console.log(`API Request Count: ${requestCount}`);

    // ✅ Debug: Check if API key is being loaded correctly
    console.log("Using OpenAI Key:", process.env.CHATGPT_API_KEY ? "Exists ✅" : "Missing ❌");

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful course recommendation assistant for an online platform. Return a JSON array of objects like { "title": "...", "description": "..." }.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
        },
        timeout: 20000, // 20s timeout
      }
    );

    const text = response.data.choices[0].message.content;

    let recommendations;
    try {
      recommendations = JSON.parse(text);
    } catch (parseErr) {
      return next(new AppError('Failed to parse recommendations JSON', 500));
    }

    res.status(200).json({
      status: 'success',
      requestCount,
      data: { recommendations },
    });
  } catch (err) {
    if (err.response) {
      console.error('OpenAI API error:', err.response.status, err.response.data);
      if (err.response.status === 401) {
        err = new AppError('Invalid or expired OpenAI API key (401 Unauthorized)', 401);
      }
    } else {
      console.error('ChatGPT request error:', err.message);
    }
    next(err);
  }
};
