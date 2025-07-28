const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /api/locations
router.get('/locations', async (req, res) => {
  try {
    const locations = await db.Location.findAll({
      attributes: ['id', 'name'], // return only id and name
      order: [['name', 'ASC']],    // optional: sort alphabetically
    });
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

module.exports = router;
