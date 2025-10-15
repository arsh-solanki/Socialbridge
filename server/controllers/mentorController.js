// server/controllers/mentorController.js
const MentorProfile = require('../models/MentorProfile');
const User = require('../models/User');
const Session = require('../models/Session');

const getMentorProfile = async (req, res) => {
  try {
    const profile = await MentorProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMentorProfile = async (req, res) => {
  try {
    const { title, bio, expertise } = req.body;
    let profile = await MentorProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }
    profile.title = title || profile.title;
    profile.bio = bio || profile.bio;
    profile.expertise = expertise || profile.expertise;
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMentorDashboardSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.user.id })
      .populate('mentee', 'name')
      .populate('posts')
      .sort({ status: 1, updatedAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMentors = async (req, res) => {
  try {
    const mentors = await MentorProfile.find()
      .populate('userId', 'name email');

    // Hardcode temporary relevanceScore for each mentor
    const mentorsWithScore = mentors.map(mentor => ({
      ...mentor.toObject(),
      relevanceScore: 75
    }));

    res.json(mentorsWithScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMentorProfile,
  updateMentorProfile,
  getMentorDashboardSessions,
  getAllMentors
};

// 