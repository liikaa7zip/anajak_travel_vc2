const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /api/locations
router.get('/', async (req, res) => {
  try {
    const locations = await db.Location.findAll({
      attributes: ['id', 'name', 'country', 'image'], // Ensure image is selected!
      order: [['name', 'ASC']],
    });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});


module.exports = router;
