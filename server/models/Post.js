// server/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorRole: {
    type: String,
    enum: ['Mentor', 'Mentee'],
    required: true
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);