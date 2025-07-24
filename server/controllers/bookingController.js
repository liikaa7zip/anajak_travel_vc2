const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ message: 'Booking creation failed', error: error.message });
  }
};
