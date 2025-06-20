const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourse);

// Protected routes (require login)
router.use(authController.protect);

// Student routes
router.post('/:id/enroll', courseController.enrollInCourse);
router.get('/me/enrolled', courseController.getEnrolledCourses);

// Instructor routes
router.use(authController.restrictTo('instructor'));
router.post('/', courseController.createCourse);
router.patch('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.get('/me/created', courseController.getInstructorCourses);

module.exports = router;
