const Membership = require('../models/Membership');

// @desc Get all membership plans
// @route GET /api/memberships
exports.getMemberships = async (req, res) => {
  try {
    const plans = await Membership.find();
    res.json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @desc Create a new membership plan (admin)
// @route POST /api/memberships
exports.createMembership = async (req, res) => {
  try {
    const plan = new Membership(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Update a membership plan (admin)
// @route PUT /api/memberships/:id
exports.updateMembership = async (req, res) => {
  try {
    const plan = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ msg: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
};

// @desc Delete a membership plan (admin)
// @route DELETE /api/memberships/:id
exports.deleteMembership = async (req, res) => {
  try {
    const plan = await Membership.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ msg: 'Plan not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
