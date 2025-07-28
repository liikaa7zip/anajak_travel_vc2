// routes/hotelBookingRoutes.js
const express = require('express');
const router = express.Router();
const hotelBookingController = require('../controllers/hotelBookingController');

router.get('/', hotelBookingController.getAllBookings);
router.get('/:id', hotelBookingController.getBookingById);
router.post('/', hotelBookingController.createBooking);   // POST /api/hotel-booking/
router.delete('/:id', hotelBookingController.cancelBooking);

module.exports = router;
