const Itinerary = require('../models/itinerary');

// Create
exports.createItinerary = async (req, res) => {
  try {
    // Fix activities if sent as stringified JSON
    if (typeof req.body.activities === 'string') {
      try {
        req.body.activities = JSON.parse(req.body.activities);
      } catch (e) {
        req.body.activities = [];
      }
    }

    const itinerary = await Itinerary.create(req.body);
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all
exports.getAllItineraries = async (req, res) => {
  const itineraries = await Itinerary.findAll();
  res.json(itineraries);
};

// Read one
exports.getItinerary = async (req, res) => {
  const itinerary = await Itinerary.findByPk(req.params.id);
  if (!itinerary) return res.status(404).json({ error: 'Not found' });
  res.json(itinerary);
};

// Update
exports.updateItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.id);
    if (!itinerary) return res.status(404).json({ error: 'Not found' });

    // Fix activities if stringified
    if (typeof req.body.activities === 'string') {
      try {
        req.body.activities = JSON.parse(req.body.activities);
      } catch (e) {
        req.body.activities = [];
      }
    }

    await itinerary.update(req.body);
    res.json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
exports.deleteItinerary = async (req, res) => {
  const itinerary = await Itinerary.findByPk(req.params.id);
  if (!itinerary) return res.status(404).json({ error: 'Not found' });
  await itinerary.destroy();
  res.json({ message: 'Itinerary deleted' });
};
