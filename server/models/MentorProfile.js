// server/models/MentorProfile.js
const mongoose = require('mongoose');

const mentorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio']
  },
  expertise: [{
    type: String
  }],
  isPremium: {
    type: Boolean,
    default: false
  },
  averageRating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MentorProfile', mentorProfileSchema);