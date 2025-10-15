// server/controllers/sessionController.js (Fixed Error Handling)
const Session = require('../models/Session');
const Post = require('../models/Post');
const User = require('../models/User');

const createSession = async (req, res) => {
  try {
    const { mentorId, subject, menteeGoals } = req.body;
    const mentee = req.user.id;

    const session = await Session.create({
      mentee,
      mentor: mentorId,
      subject,
      menteeGoals,
      status: 'Pending'
    });

    // Create first post as mentee's initial content
    const initialPost = await Post.create({
      session: session._id,
      author: mentee,
      authorRole: 'Mentee',
      content: menteeGoals // Structured as initial question
    });

    session.posts.push(initialPost._id);
    await session.save();

    res.status(201).json({ sessionId: session._id, message: 'Session created successfully' });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ message: 'Failed to create session' });
  }
};

const getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('mentor')
      .populate('mentee', 'name')
      .populate('posts', 'author authorRole content timestamp')
      .populate('posts.author', 'name');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' }); // FIXED: 404, not 500
    }
    res.json(session);
  } catch (error) {
    console.error('Get session error:', error); // Log for debug
    res.status(500).json({ message: 'Internal server error' });
  }
};

const endSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { status: 'Completed' },
      { new: true }
    ).populate('mentor');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json({ message: 'Session ended successfully', session });
  } catch (error) {
    console.error('End session error:', error);
    res.status(500).json({ message: 'Failed to end session' });
  }
};

module.exports = {
  createSession,
  getSession,
  endSession
};