const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  durationWeeks: { type: Number },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  // Could reference trainer or list of exercises later
});

module.exports = mongoose.model('Program', ProgramSchema);
