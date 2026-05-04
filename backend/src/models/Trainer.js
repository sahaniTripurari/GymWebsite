const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  img: { type: String }, // URL to image
  bio: { type: String },
  specialization: [{ type: String }],
  experienceYears: { type: Number },
});

module.exports = mongoose.model('Trainer', TrainerSchema);
