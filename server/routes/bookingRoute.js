const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.createBooking);
router.patch('/:id/cancel', bookingController.cancelBooking);
router.get('/booked-seats', bookingController.getBookedSeats);


module.exports = router;

