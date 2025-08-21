const express = require('express');
const { getWeather, getAllProvincesWeather } = require('../controllers/weatherController');

const router = express.Router();

// ✅ Single province (with forecast)
router.get('/weather', getWeather);

// ✅ All provinces (current only)
router.get('/weather/all', getAllProvincesWeather);

module.exports = router;
