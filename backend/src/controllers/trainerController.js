const Trainer = require('../models/Trainer');

// @desc Get all trainers (public)
exports.getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @desc Create a trainer (admin)
exports.createTrainer = async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Update trainer (admin)
exports.updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainer) return res.status(404).json({ msg: 'Trainer not found' });
    res.json(trainer);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Delete trainer (admin)
exports.deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ msg: 'Trainer not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
