const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ activePlan: { $ne: null } });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaysBookings = await Booking.countDocuments({ createdAt: { $gte: today } });
    
    // Calculate total revenue
    const payments = await Payment.find({ status: 'success' });
    const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

    const recentUsers = await User.find().sort({ joinedAt: -1 }).limit(5).select('name activePlan joinedAt email');

    res.json({
      totalRevenue,
      activeUsers,
      totalUsers,
      todaysBookings,
      recentUsers: recentUsers.map(u => ({
        id: u._id,
        name: u.name,
        plan: u.activePlan || 'None',
        joined: new Date(u.joinedAt).toLocaleDateString(),
        status: u.activePlan ? 'Active' : 'Inactive'
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
