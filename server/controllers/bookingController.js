const Booking = require('../models/booking');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);  // Send all bookings as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Booking creation failed', error: error.message });
  }
};