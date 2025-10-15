// server/controllers/postController.js
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const Session = require('../models/Session');

const createPost = [
  // Validation middleware
  body('sessionId').notEmpty().withMessage('Session ID is required'),
  body('content').notEmpty().withMessage('Content is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { sessionId, content } = req.body;
      const author = req.user._id;
      const authorRole = req.user.role;

      // Create new Post
      const post = new Post({
        session: sessionId,
        author,
        authorRole,
        content
      });
      await post.save();

      // Update Session: add post and check if mentor response
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      session.posts.push(post._id);
      if (authorRole === 'Mentor') {
        session.status = 'Active';
      }
      await session.save();

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

module.exports = { createPost };