const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priceMonthly: { type: Number, required: true },
  priceYearly: { type: Number, required: true },
  description: { type: String },
  benefits: [{ type: String }],
  isBest: { type: Boolean, default: false },
});

module.exports = mongoose.model('Membership', MembershipSchema);
