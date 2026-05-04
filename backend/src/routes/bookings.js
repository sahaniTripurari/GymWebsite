const express = require('express');
const router = express.Router();
const { getMyBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

// Protected: get user's bookings
router.get('/', protect, getMyBookings);

// Protected: create a booking
router.post('/', protect, createBooking);

// Owner (or admin) protected updates/deletes – using same protect middleware (owner check inside controller)
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
