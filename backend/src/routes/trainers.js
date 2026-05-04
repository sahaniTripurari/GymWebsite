const express = require('express');
const router = express.Router();
const { getTrainers, createTrainer, updateTrainer, deleteTrainer } = require('../controllers/trainerController');
const { protect, admin } = require('../middleware/auth');

// Public: get all trainers
router.get('/', getTrainers);

// Admin protected routes
router.post('/', protect, admin, createTrainer);
router.put('/:id', protect, admin, updateTrainer);
router.delete('/:id', protect, admin, deleteTrainer);

module.exports = router;
