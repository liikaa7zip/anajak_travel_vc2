// Enhanced Hotel Booking Routes
const express = require('express');
const router = express.Router();
const hotelBookingController = require('../controllers/hotelBookingController');


// Public routes (with optional authentication)
router.get('/', hotelBookingController.getAllBookings);
router.get('/stats', hotelBookingController.getBookingStats);
router.get('/:id', hotelBookingController.getBookingById);
router.post('/', hotelBookingController.createBooking);
router.put('/:id/status', hotelBookingController.updateBookingStatus);
router.delete('/:id', hotelBookingController.cancelBooking);
router.get('/user/:userId', hotelBookingController.getUserBookings);

module.exports = router;
