const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  joinedAt: { type: Date, default: Date.now },
  activePlan: { type: String, default: null },
  planExpiry: { type: Date, default: null }
});

module.exports = mongoose.model('User', UserSchema);
