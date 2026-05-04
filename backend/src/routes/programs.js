const express = require('express');
const router = express.Router();
const { getPrograms, createProgram, updateProgram, deleteProgram } = require('../controllers/programController');
const { protect, admin } = require('../middleware/auth');

// Public: get all programs
router.get('/', getPrograms);

// Admin protected routes
router.post('/', protect, admin, createProgram);
router.put('/:id', protect, admin, updateProgram);
router.delete('/:id', protect, admin, deleteProgram);

module.exports = router;
