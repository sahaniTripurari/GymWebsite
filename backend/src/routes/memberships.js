const express = require('express');
const router = express.Router();
const { getMemberships, createMembership, updateMembership, deleteMembership } = require('../controllers/membershipController');
const { protect, admin } = require('../middleware/auth');

// Public: get all plans
router.get('/', getMemberships);

// Admin protected routes
router.post('/', protect, admin, createMembership);
router.put('/:id', protect, admin, updateMembership);
router.delete('/:id', protect, admin, deleteMembership);

module.exports = router;
