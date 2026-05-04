const express = require('express');
const router = express.Router();
const { getMyProgress, addProgress, updateProgress, deleteProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

// Protected: get user's progress entries
router.get('/', protect, getMyProgress);

// Protected: add a new progress entry
router.post('/', protect, addProgress);

// Owner protected update/delete (owner check inside controller)
router.put('/:id', protect, updateProgress);
router.delete('/:id', protect, deleteProgress);

module.exports = router;
