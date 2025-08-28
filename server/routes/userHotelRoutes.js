// routes/userHotelRoutes.js

'use strict';

const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/hotelController');
const bookingController = require('../controllers/bookingController');

// Get all rooms for a specific hotel (for users)
router.get('/hotels/:hotelId/rooms', hotelController.getRoomsByHotel);

// Create a new booking (for users)
router.post('/bookings', bookingController.createBooking);

module.exports = router;
