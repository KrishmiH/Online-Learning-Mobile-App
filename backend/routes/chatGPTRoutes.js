const express = require('express');
const chatGPTController = require('../controllers/chatGPTController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.post('/recommendations', chatGPTController.getCourseRecommendations);

module.exports = router;
