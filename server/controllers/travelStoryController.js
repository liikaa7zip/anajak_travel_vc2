const { TravelStory } = require('../models');

exports.getPublicStory = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await TravelStory.findOne({
      where: { id, is_public: true }
    });

    if (!story) return res.status(404).json({ error: 'Story not found or not public' });

    res.json(story);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch story' });
  }
};
