const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A course must have a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A course must have a description'],
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A course must have an instructor'],
  },
  content: {
    type: String,
    required: [true, 'A course must have content'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
