// server/models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MentorProfile',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject']
  },
  menteeGoals: {
    type: String,
    required: [true, 'Please add mentee goals']
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Completed'],
    default: 'Pending'
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: {
      type: String
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);