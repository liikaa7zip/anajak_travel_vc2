const express = require('express');
const router = express.Router();
const Province = require('../models/province');

// Get all Provinces
router.get('/', async (req, res) => {
  try {
    const provinces = await Province.findAll();
    res.json(provinces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single Province
router.get('/:id', async (req, res) => {
  try {
    const province = await Province.findByPk(req.params.id);
    if (!province) return res.status(404).json({ error: 'Not found' });
    res.json(province);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new Province
router.post('/', async (req, res) => {
  try {
    const { name, imageUrl, description, location } = req.body;
    const newProvince = await Province.create({ name, imageUrl, description, location });
    res.status(201).json(newProvince);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;