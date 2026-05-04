const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number }, // kg
  bmi: { type: Number },
  // Additional metrics can be added later (e.g., bodyFat, muscleMass)
});

module.exports = mongoose.model('Progress', ProgressSchema);
