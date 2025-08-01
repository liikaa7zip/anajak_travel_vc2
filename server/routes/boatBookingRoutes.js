const express = require('express');
const router = express.Router();
const boatBookingController = require('../controllers/boatBookingController');

router.post('/', boatBookingController.createBooking);
router.get('/', boatBookingController.getAllBookings);
router.get('/user/:userId', boatBookingController.getBookingsByUserId);
router.get('/:id', boatBookingController.getboatBookingById);
router.delete('/:id', boatBookingController.deleteboatBooking);
router.put('/:id/cancel',boatBookingController.cancelboatBooking);

module.exports = router;
