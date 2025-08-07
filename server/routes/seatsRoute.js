const express = require('express');
const router = express.Router();
const { Booking } = require('../models'); // Adjust path if needed

// Total seats on the vehicle, adjust to your real seats list
const TOTAL_SEATS = [
  'L1','L2','L3','L4','L5','L6','L7','L8','L9','L10','L11','L12',
  'M1',
  'R1','R2','R3','R4','R5','R6','R7','R8','R9','R10','R11','R12'
];

router.get('/', async (req, res) => {
  const { date, timeOfDay, carId } = req.query;

  if (!date || !timeOfDay || !carId) {
    return res.status(400).json({ message: 'Missing query parameters' });
  }

  try {
    // Find all confirmed bookings for given date, time, and car
    const bookings = await Booking.findAll({
      where: {
        date,
        timeOfDay,
        carId,
        status: 'confirmed'
      }
    });

    // Extract all booked seats from all bookings
    let bookedSeats = [];
    bookings.forEach(booking => {
      const seats = JSON.parse(booking.seatNumbers); // stored as JSON string
      bookedSeats = bookedSeats.concat(seats);
    });

    // Remove duplicates
    bookedSeats = [...new Set(bookedSeats)];

    // Create seat list with booked flag
    const seatsWithStatus = TOTAL_SEATS.map(seatNumber => ({
      number: seatNumber,
      booked: bookedSeats.includes(seatNumber)
    }));

    res.json(seatsWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
