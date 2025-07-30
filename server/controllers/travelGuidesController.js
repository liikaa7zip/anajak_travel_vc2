const TravelGuide = require('../models/TravelGuide');

exports.getAll = async (req, res) => {
  try {
    const guides = await TravelGuide.findAll({ order: [['id', 'DESC']] });
    res.json(guides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const guide = await TravelGuide.findByPk(req.params.id);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.json(guide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const g = await TravelGuide.create({ title, description, tags });
    res.status(201).json(g);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const guide = await TravelGuide.findByPk(req.params.id);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    const { title, description, tags } = req.body;
    await guide.update({ title, description, tags });
    res.json(guide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const guide = await TravelGuide.findByPk(req.params.id);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    await guide.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
