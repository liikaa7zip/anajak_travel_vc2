// controllers/bookingController.js
const { Booking, User } = require('../models');

// Get all bookings (optional: filter by userId)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    res.json(bookings);
  } catch (error) {
  console.error('Sequelize Error:', error.message);
  console.error(error.stack);
  res.status(500).json({ error: 'Failed to fetch bookings', detail: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] }
      ]
    });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ message: 'Server error while fetching booking' });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      UserId, // required field
      depart,
      arrive,
      type,
      price,
      date,
      email,
    } = req.body;

    // Simple validation
    if (!UserId || !depart || !arrive || !type || !date || !email) {
      return res.status(400).json({ message: 'All fields including UserId are required' });
    }

    const newBooking = await Booking.create({
      UserId,
      depart,
      arrive,
      type,
      price,
      date,
      email,
    });

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ message: 'Booking creation failed', error: error.message });
  }
};

// Cancel a booking by ID
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};
