const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/hotelController');

// Public routes - no auth middleware

router.get('/', hotelController.getAllHotels);

router.get('/:id', hotelController.getHotelById);

router.get('/:hotelId/rooms', hotelController.getRoomsByHotel);

module.exports = router;
