const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// Get all hotels with optional locationId filtering
router.get('/', hotelController.getAllHotels);

// Get a single hotel by ID
router.get('/:id', hotelController.getHotelById);

// Create a new hotel
router.post('/', hotelController.createHotel);

// Update a hotel
router.put('/:id', hotelController.updateHotel);

// Delete a hotel
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;
