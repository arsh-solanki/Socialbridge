// server/routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createSession, getSession, endSession } = require('../controllers/sessionController');
const { submitFeedback }= require('../controllers/feedbackController');

// Public GET for Q&A (no protect)
router.get('/:id', getSession); // Loads sample data without login

// Protected POST/PATCH
router.post('/', protect, createSession);
router.patch('/:id/end', protect, endSession);
router.post('/:id/feedback', protect, submitFeedback);

module.exports = router;