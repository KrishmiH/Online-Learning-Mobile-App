const axios = require('axios');
const AppError = require('../utils/errorHandler');

let requestCount = 0;

exports.getCourseRecommendations = async (req, res, next) => {
  try {
    requestCount++;
    console.log(`API Request Count: ${requestCount}`);
    const { prompt } = req.body;
    console.log('Using OpenAI API key:', process.env.CHATGPT_API_KEY ? 'Exists' : 'Missing');

    if (!prompt) {
      return next(new AppError('Please provide a prompt', 400));
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful course recommendation assistant for an online learning platform. Recommend courses based on the user\'s career goals and interests. Return your response as a JSON array of course objects with title and description properties.',
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
      }
    );

    const recommendations = JSON.parse(
      response.data.choices[0].message.content
    );

    res.status(200).json({
      status: 'success',
      data: {
        recommendations,
      },
    });
  } catch (err) {
    console.error('ChatGPT error:', err.response ? err.response.data : err.message);
    next(err);
  }
};
