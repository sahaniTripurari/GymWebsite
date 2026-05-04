const Booking = require('../models/Booking');

// @desc Get all bookings for logged‑in user (protected)
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @desc Create a new booking (protected)
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, user: req.user.userId });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Update a booking (owner or admin)
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Delete a booking (owner or admin)
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
