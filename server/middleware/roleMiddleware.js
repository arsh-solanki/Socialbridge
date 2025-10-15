// server/middleware/roleMiddleware.js
const isMentor = (req, res, next) => {
  if (req.user && req.user.role === 'Mentor') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Mentor role required.' });
  }
};

module.exports = { isMentor };