const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { Booking } = require('../models');

router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.createBooking);
router.patch('/:id/cancel', bookingController.cancelBooking);
router.get('/booked-seats', bookingController.getBookedSeats);
router.get('/bookings/completed', bookingController.getCompletedBookings);
router.put('/:id/complete', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'completed';  // Make sure 'status' is a valid column!
    await booking.save();

    res.json({ message: 'Booking marked as completed', booking });
  } catch (error) {
    console.error('Error marking booking as completed:', error); // <-- Check this log
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;

