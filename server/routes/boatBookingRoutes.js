const express = require('express');
const router = express.Router();
const boatBookingController = require('../controllers/boatBookingController');
const { BoatBooking } = require('../models'); // adjust the path as needed


router.post('/', boatBookingController.createBooking);
router.get('/', boatBookingController.getAllBookings);
router.get('/user/:userId', boatBookingController.getBookingsByUserId);
router.get('/:id', boatBookingController.getboatBookingById);
router.delete('/:id', boatBookingController.deleteboatBooking);
router.put('/bookings/:id/cancel', boatBookingController.cancelBooking);
router.get('/bookings/completed', boatBookingController.getCompletedBoatBookings);
router.put('/:id/complete', async (req, res) => {
  try {
    const boatBooking = await BoatBooking.findByPk(req.params.id);

    if (!boatBooking) {
      return res.status(404).json({ message: 'Boat booking not found' });
    }

    // Only mark if not already completed
    if (boatBooking.status === 'completed') {
      return res.status(400).json({ message: 'Booking is already completed' });
    }

    boatBooking.status = 'completed';
    await boatBooking.save();

    res.json({ message: 'Boat booking marked as completed', boatBooking });
  } catch (error) {
    console.error('Error marking boat booking as completed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
