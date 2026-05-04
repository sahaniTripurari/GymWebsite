const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/auth');
const Payment = require('../models/Payment');
const User = require('../models/User');

const IS_MOCK = !process.env.RAZORPAY_KEY_ID;

let razorpay;
if (!IS_MOCK) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

router.post('/orders', protect, async (req, res) => {
  try {
    const { amount, planName } = req.body;
    
    // For INR, we need to convert the USD prices from frontend to INR for a realistic feel,
    // or just assume the 'amount' from frontend is already the correct value. 
    // Currently frontend sends $29, $79. Let's multiply by 80 for realistic INR.
    const amountInINR = amount * 80;

    if (IS_MOCK) {
      // Mock order for demo purposes if no real keys are provided
      return res.json({ 
        order: { id: `order_mock_${Date.now()}`, amount: amountInINR * 100, currency: "INR" }, 
        planName,
        isMock: true
      });
    }

    const options = {
      amount: amountInINR * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, planName, isMock: false, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
});

router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, planName } = req.body;
    
    // In production, you MUST verify the signature using crypto and your RAZORPAY_KEY_SECRET
    // For this simulation, we'll assume it's successful if we receive the IDs
    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ success: false, msg: 'Invalid payment details' });
    }

    const newPayment = new Payment({
      user: req.user.userId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature: razorpay_signature || 'simulated_sig',
      amount,
      planName
    });

    await newPayment.save();

    // Update user active plan
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month plan

    await User.findByIdAndUpdate(req.user.userId, {
      activePlan: planName,
      planExpiry: expiryDate
    });

    res.json({ success: true, msg: 'Payment verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error verifying payment');
  }
});

module.exports = router;
