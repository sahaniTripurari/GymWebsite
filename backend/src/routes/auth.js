const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login and return JWT
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Get current user details (Soft check to keep console clean)
router.get('/me', (req, res, next) => {
  const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.json(null);
  next();
}, protect, getMe);


module.exports = router;
