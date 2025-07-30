const { Location } = require('../models');

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};
