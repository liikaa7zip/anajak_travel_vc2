const GalleryPhoto = require('../models/GalleryPhoto');

// GET all photos
exports.getAll = async (req, res) => {
  try {
    const photos = await GalleryPhoto.findAll({ order: [['id', 'DESC']] });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single photo by ID
exports.getById = async (req, res) => {
  try {
    const photo = await GalleryPhoto.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    res.json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new photo
exports.create = async (req, res) => {
  try {
    const { url, title, description } = req.body;
    const photo = await GalleryPhoto.create({ url, title, description });
    res.status(201).json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update a photo
exports.update = async (req, res) => {
  try {
    const photo = await GalleryPhoto.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });

    const { url, title, description } = req.body;
    await photo.update({ url, title, description });

    res.json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a photo
exports.delete = async (req, res) => {
  try {
    const photo = await GalleryPhoto.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });

    await photo.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
