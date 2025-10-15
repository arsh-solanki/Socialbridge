// server/controllers/feedbackController.js
const Session = require('../models/Session');
const MentorProfile = require('../models/MentorProfile');

const submitFeedback = async (req, res) => {
  try {
    const { sessionId, rating, comments } = req.body;

    // Save feedback to Session
    const session = await Session.findByIdAndUpdate(
      sessionId,
      { 
        feedback: { 
          rating, 
          comments 
        } 
      },
      { new: true }
    );
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Recalculate averageRating for mentor
    const completedSessions = await Session.find({ 
      mentor: session.mentor, 
      status: 'Completed',
      'feedback.rating': { $exists: true }
    });
    const totalRating = completedSessions.reduce((sum, s) => sum + (s.feedback.rating || 0), 0);
    const averageRating = completedSessions.length > 0 ? totalRating / completedSessions.length : 0;

    await MentorProfile.findOneAndUpdate(
      { _id: session.mentor },
      { averageRating: Math.round(averageRating * 10) / 10 }
    );

    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitFeedback };