const Progress = require('../models/Progress');

// @desc Get progress entries for logged‑in user (protected)
exports.getMyProgress = async (req, res) => {
  try {
    const entries = await Progress.find({ user: req.user.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @desc Add a new progress entry (protected)
exports.addProgress = async (req, res) => {
  try {
    const progress = new Progress({ ...req.body, user: req.user.userId });
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Update a progress entry (owner only)
exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!progress) return res.status(404).json({ msg: 'Entry not found' });
    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Delete a progress entry (owner only)
exports.deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!progress) return res.status(404).json({ msg: 'Entry not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
