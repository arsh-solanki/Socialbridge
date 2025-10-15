// server/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createPost } = require('../controllers/postController');

// Apply protection to all routes
router.use(protect);

router.post('/', createPost);

module.exports = router;