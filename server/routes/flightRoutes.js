const express = require('express');
const router = express.Router();
const flightBookingController = require('../controllers/flightBookingController');

router.get('/user/:userId', flightBookingController.getFlightBookingsByUserId);
// Route: POST /api/flightbookings
router.post('/', flightBookingController.createFlightBooking);

// Route: GET /api/flightbookings
router.get('/', flightBookingController.getAllFlightBookings);

// Route: GET /api/flightbookings/:id
router.get('/:id', flightBookingController.getFlightBookingById);

// Route: DELETE /api/flightbookings/:id
router.delete('/:id', flightBookingController.deleteFlightBooking);
// Route: PUT /api/flightbookings/:id/cancel
router.put('/:id/cancel', flightBookingController.cancelFlightBooking);

module.exports = router;
