const Program = require('../models/Program');

// @desc Get all programs (public)
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @desc Create a program (admin)
exports.createProgram = async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Update a program (admin)
exports.updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!program) return res.status(404).json({ msg: 'Program not found' });
    res.json(program);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Delete a program (admin)
exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ msg: 'Program not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
