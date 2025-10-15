// server/routes/mentorRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { isMentor } = require('../middleware/roleMiddleware');
const { getMentorProfile, updateMentorProfile, getMentorDashboardSessions, getAllMentors } = require('../controllers/mentorController');

// Public
router.get('/mentors', getAllMentors);
router.post('/register', async (req, res) => { // Public
  // ... (unchanged)
});

// Public GET for dashboard/profile (no protect)
router.get('/dashboard', getMentorDashboardSessions); // Loads sample sessions
router.get('/profile', getMentorProfile); // Loads sample profile

// Protected PUT/POST
router.use(protect);
router.use(isMentor);
router.put('/profile', updateMentorProfile);

module.exports = router;