const Course = require('../models/Course');
const User = require('../models/User');
const AppError = require('../utils/errorHandler');

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('instructor');

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor');

    if (!course) {
      return next(new AppError('No course found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, content } = req.body;

    const newCourse = await Course.create({
      title,
      description,
      content,
      instructor: req.user.id,
    });

    res.status(201).json({
      status: 'success',
      data: {
        course: newCourse,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return next(new AppError('No course found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return next(new AppError('No course found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return next(new AppError('No course found with that ID', 404));
    }

    // Check if user is already enrolled
    if (course.studentsEnrolled.includes(req.user.id)) {
      return next(new AppError('You are already enrolled in this course', 400));
    }

    // Add student to course
    course.studentsEnrolled.push(req.user.id);
    await course.save();

    // Add course to user's enrolled courses
    const user = await User.findById(req.user.id);
    user.enrolledCourses.push(course._id);
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Successfully enrolled in course',
      data: {
        course,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getEnrolledCourses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('enrolledCourses');

    res.status(200).json({
      status: 'success',
      data: {
        courses: user.enrolledCourses,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getInstructorCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ instructor: req.user.id }).populate(
      'studentsEnrolled'
    );

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (err) {
    next(err);
  }
};
