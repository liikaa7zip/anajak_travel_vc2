const FeaturedStory = require('../models/FeaturedStory');

exports.getAll = async (req, res) => {
  try {
    const stories = await FeaturedStory.findAll({ order: [['id', 'DESC']] });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const story = await FeaturedStory.findByPk(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found' });
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, excerpt, link } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newStory = await FeaturedStory.create({
      title,
      excerpt,
      link,
      image: imagePath,
    });

    res.status(201).json(newStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const story = await FeaturedStory.findByPk(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });

    const { title, excerpt, link } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : story.image; // keep old image if none uploaded

    await story.update({ title, excerpt, link, image: imagePath });
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const story = await FeaturedStory.findByPk(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found' });
    await story.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
